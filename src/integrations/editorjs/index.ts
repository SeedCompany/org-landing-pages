import type { Tagged } from 'type-fest';

export type EditorJSDoc = Tagged<{ blocks: Array<{ type: string; data: unknown }> }, 'EditorJS'>;
