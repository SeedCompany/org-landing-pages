import { set, useFormValue, type StringInputProps } from 'sanity';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  generateButton: {
    alignSelf: 'flex-start',
    border: '1px solid #ccc',
    borderRadius: '3px',
    padding: '6px 10px',
    fontSize: '0.8em',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
  },
  generateButtonDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  missingSourceHint: {
    fontSize: '0.8em',
    color: '#666',
  },
} as const;

interface GeneratedFieldOptions {
  /** Path, from the document root, to the field the value is built from. */
  sourcePath: string[];
  buttonText: string;
  /** Shown instead of an enabled button while the source field is empty. */
  missingSourceHint: string;
  buildValue: (sourceValue: string) => string;
}

/**
 * Creates a studio input that puts a "generate" button under the default editor.
 *
 * Covers defaults that `initialValue` cannot produce: `initialValue` runs when the
 * document is created, before the source field holds anything.
 *
 * @example A value copied straight from another field
 * ```ts
 * createGeneratedFieldInput({
 *   sourcePath: ['pageTitle'],
 *   buttonText: 'Generate from page title',
 *   missingSourceHint: 'Add a Page Title to use this.',
 *   buildValue: (pageTitle) => pageTitle,
 * });
 * ```
 *
 * @example A value built into a sentence
 * ```ts
 * createGeneratedFieldInput({
 *   sourcePath: ['campaignName'],
 *   buttonText: 'Generate from campaign name',
 *   missingSourceHint: 'Add a Campaign Name to use this.',
 *   buildValue: (campaignName) => `See how ${campaignName} is partnering with us.`,
 * });
 * ```
 */
export function createGeneratedFieldInput(options: GeneratedFieldOptions) {
  const { sourcePath, buttonText, missingSourceHint, buildValue } = options;

  return function GeneratedFieldInput(props: StringInputProps) {
    const { onChange, readOnly, renderDefault } = props;

    const rawSourceValue = useFormValue(sourcePath);
    const sourceValue = typeof rawSourceValue === 'string' ? rawSourceValue.trim() : '';
    const canGenerate = sourceValue.length > 0 && !readOnly;

    const handleGenerate = () => {
      if (!canGenerate) return;
      onChange(set(buildValue(sourceValue)));
    };

    return (
      <div style={styles.container}>
        {renderDefault(props)}
        <button
          type="button"
          style={{
            ...styles.generateButton,
            ...(canGenerate ? {} : styles.generateButtonDisabled),
          }}
          disabled={!canGenerate}
          onClick={handleGenerate}
        >
          {buttonText}
        </button>
        {sourceValue.length === 0 && (
          <div style={styles.missingSourceHint}>{missingSourceHint}</div>
        )}
      </div>
    );
  };
}
