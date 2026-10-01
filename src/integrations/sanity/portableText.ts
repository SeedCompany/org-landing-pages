import {
  type PortableTextHtmlComponents as Components,
  escapeHTML,
  toHTML as portableTextToHTML,
} from '@portabletext/to-html';
import type { PortableTextBlock, PortableTextSpan as TextSpan } from '@portabletext/types';
import type { SetOptional } from 'type-fest';

// GROQ type gen makes children optional for some reason, and types markDefs as
// `null` (rather than omitting it) for blocks with no possible annotations.
type TextBlock = Omit<SetOptional<PortableTextBlock, 'children'>, 'markDefs'> & {
  markDefs?: PortableTextBlock['markDefs'] | null;
};

export const toPlain = (blocks: TextBlock[]) =>
  blocks
    .flatMap((block) => (block._type === 'block' ? (block.children ?? []) : []))
    .flatMap((node) => (node._type === 'span' ? (node as TextSpan).text : []))
    .join('\n');

export const toHTML = (portableText: TextBlock | TextBlock[] | null) =>
  portableText == null ? '' : portableTextToHTML(portableText, { components });

function isPropertyInValue<K extends PropertyKey>(
  prop: K,
  value: unknown,
): value is Record<K, string> {
  return value !== null && typeof value === 'object' && prop in value;
}

const components = {
  block: {
    normal: ({ children }) => `<p>${children}</p>`,
    h1: ({ children }) => `${children}`,
    h2: ({ children }) => `<h2>${children}</h2>`,
    h3: ({ children }) => `<h3>${children}</h3>`,
    // Fallback for unrecognized block styles
    default: ({ children, value }) => {
      console.warn(`Unrecognized block style: ${value.style}`);
      return `<div>${children}</div>`;
    },
  },
  list: {
    bullet: ({ children }) => `<ul>${children}</ul>`,
  },
  listItem: {
    bullet: ({ children }) => `<li>${children}</li>`,
  },
  marks: {
    textColor: ({ value, children }) =>
      `<span style="color: ${isPropertyInValue('value', value) ? value.value : 'inherit'};">${children}</span>`,
    strong: ({ children }) => `<strong>${children}</strong>`,
    em: ({ children }) => `<em>${children}</em>`,
    link: ({ value, children }) => {
      const unsafeUri = isPropertyInValue('href', value) ? value.href : '';
      const looksSafe = /^(http|https|mailto|my-custom-proto):/i.test(unsafeUri);
      return looksSafe
        ? `<a href="${escapeHTML(unsafeUri)}" target="${isPropertyInValue('target', value) ? value.target : '_blank'}">${children}</a>`
        : children;
    },
  },
} satisfies Partial<Components>;
