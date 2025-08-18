import {
  type PortableTextHtmlComponents as Components,
  toHTML as portableTextToHTML,
} from '@portabletext/to-html';
import type {
  PortableTextBlock as PortableTextBlock,
  PortableTextSpan as TextSpan,
} from '@portabletext/types';
import type { SetOptional } from 'type-fest';

// GROQ type gen makes children optional for some reason
type TextBlock = SetOptional<PortableTextBlock, 'children'>;

export const toPlainText = (blocks: TextBlock[]) =>
  blocks
    .flatMap((block) => (block._type === 'block' ? (block.children ?? []) : []))
    .flatMap((node) => (node._type === 'span' ? (node as TextSpan).text : []))
    .join('\n');

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- fixme
    textColor: ({ value, children }) => `<span style="color: ${value.value};">${children}</span>`,
    strong: ({ children }) => `<strong>${children}</strong>`,
    em: ({ children }) => `<em>${children}</em>`,
    // @ts-expect-error fixme
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    link: ({ mark, children }) => `<a href="${mark.href}">${children}</a>`,
  },
} satisfies Partial<Components>;

export const toHTML = (portableText: TextBlock | TextBlock[]) =>
  portableTextToHTML(portableText, { components });
