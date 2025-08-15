import { toHTML as portableTextToHTML } from '@portabletext/to-html';

export function toPlainText(blocks = []) {
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child) => child.text || '').join('');
    })
    .join('\n');
}

const components = {
  block: {
    normal: ({ children }) => `<p class="mb-4">${children}</p>`,
    h1: ({ children }) => `${children}`,
    h2: ({ children }) => `<h2 class="text-3xl mb-4">${children}</h2>`,
    h3: ({ children }) => `<h3 class="text-2xl mb-4 font-bold">${children}</h3>`,
    // Fallback for unrecognized block styles
    default: ({ children, value }) => {
      console.warn(`Unrecognized block style: ${value.style}`);
      return `<div>${children}</div>`;
    },
  },
  list: {
    bullet: ({ children }) => `<ul class="list-disc pl-5>${children}</ul>`,
  },
  listItem: {
    bullet: ({ children }) => `<li class="mb-2">${children}</li>`,
  },
  marks: {
    textColor: ({ value, children }) => {
      return `<span style="color: ${value.value};">${children}</span>`;
    },
    strong: ({ children }) => `<strong class="font-bold">${children}</strong>`,
    em: ({ children }) => `<em>${children}</em>`,
    link: ({ mark, children }) => `<a href="${mark.href}">${children}</a>`,
  },
};

export const toHTML = (portableText) => {
  return portableTextToHTML(portableText, { components });
};
