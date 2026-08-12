export type ResolvedVideo = { kind: 'iframe'; src: string } | { kind: 'file'; src: string } | null;

const YOUTUBE = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/;
const VIMEO_PLAYER = /player\.vimeo\.com\/video\/\d+/;
const VIMEO_NUMERIC = /vimeo\.com\/(?:[^/]+\/)*?(\d+)(?:\/(\w+))?/;
const VIDEO_FILE = /\.(mp4|webm|ogg|ogv|mov|m4v)(?:[?#]|$)/i;

/**
 * Turn an editor-provided video URL into something we can actually render.
 * - YouTube / Vimeo → an iframe embed URL
 * - Vimeo "vanity" URLs (no numeric id) → resolved via Vimeo's oEmbed API
 * - Direct video files (.mp4, etc.) → a native <video> source
 */
export async function resolveVideoEmbed(raw: string | null | undefined): Promise<ResolvedVideo> {
  const url = raw?.trim();
  if (!url) return null;

  const youtube = url.match(YOUTUBE);
  if (youtube) {
    return { kind: 'iframe', src: `https://www.youtube.com/embed/${youtube[1]}` };
  }

  if (VIMEO_PLAYER.test(url)) {
    return { kind: 'iframe', src: url };
  }

  const vimeoNumeric = url.match(VIMEO_NUMERIC);
  if (vimeoNumeric) {
    const [, id, hash] = vimeoNumeric;
    return {
      kind: 'iframe',
      src: `https://player.vimeo.com/video/${id}${hash ? `?h=${hash}` : ''}`,
    };
  }

  // Vimeo vanity/custom URL with no numeric id — resolve the real id via oEmbed.
  if (/vimeo\.com\//i.test(url)) {
    try {
      const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const data = (await res.json()) as { video_id?: number | string };
        if (data?.video_id) {
          return { kind: 'iframe', src: `https://player.vimeo.com/video/${data.video_id}` };
        }
      }
    } catch {
      // Network/resolution failed — fall through to the file handling below.
    }
  }

  if (VIDEO_FILE.test(url)) {
    return { kind: 'file', src: url };
  }

  // Unknown format — best effort as a direct file source.
  return { kind: 'file', src: url };
}
