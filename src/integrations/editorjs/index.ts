import { EditorJSConverter } from 'editorjs-to-portabletext';
import type { Tagged } from 'type-fest';
import type { portableText } from '~/sanity';

export type EditorJSDoc = Tagged<{ blocks: Array<{ type: string; data: unknown }> }, 'EditorJS'>;

// not importing directly because I think we will do something different with that type soon.
type PortableText = Exclude<Parameters<typeof portableText.toHTML>[0], unknown[]> & {};
export const toPortableText = (doc: EditorJSDoc): PortableText[] => {
  const converter = new EditorJSConverter();
  return converter.convert(doc.blocks) as PortableText[];
};
