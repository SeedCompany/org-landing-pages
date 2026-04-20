import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Group, type GroupProps } from './group.tsx';
import { Loader } from './loader.tsx';

export type ButtonVariant = 'solid' | 'outline' | 'plain' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonVariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorPalette?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  solid:
    'bg-scForest text-white border border-transparent hover:bg-scForestHover disabled:opacity-50',
  outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50',
  plain:
    'bg-transparent text-gray-700 border border-transparent hover:bg-gray-100 disabled:opacity-50 data-[selected]:bg-scForestTint data-[selected]:text-gray-900',
  ghost:
    'bg-transparent text-gray-700 border border-transparent hover:bg-gray-100 disabled:opacity-50',
};

const sizeClass: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs rounded',
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-5 py-2.5 text-base rounded-md',
  xl: 'px-6 py-3 text-base rounded-md',
};

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: ReactNode;
  spinner?: ReactNode;
  spinnerPlacement?: 'start' | 'end';
}

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'children'>,
    ButtonVariantProps,
    ButtonLoadingProps {
  asChild?: boolean;
  children?: ReactNode;
  css?: unknown;
}

const ButtonPropsContext = createContext<ButtonVariantProps>({});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const ctx = useContext(ButtonPropsContext);
  const {
    variant = ctx.variant ?? 'solid',
    size = ctx.size ?? 'md',
    colorPalette: _colorPalette,
    loading,
    loadingText,
    spinner,
    spinnerPlacement,
    asChild,
    children,
    css: _css,
    className = '',
    disabled,
    ...rest
  } = props;

  const classes = [
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-scForest disabled:cursor-not-allowed',
    variantClass[variant],
    sizeClass[size],
    className,
  ].join(' ');

  const content = loading ? (
    <Loader spinner={spinner} text={loadingText} spinnerPlacement={spinnerPlacement}>
      {children}
    </Loader>
  ) : (
    children
  );

  if (asChild && isValidElement(children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child = Children.only(children) as React.ReactElement<any>;
    return cloneElement(child, {
      ...rest,
      className: classes,
      disabled: loading || disabled,
      'data-loading': loading ? '' : undefined,
    });
  }

  return (
    <button
      type="button"
      ref={ref}
      {...rest}
      disabled={loading || disabled}
      data-loading={loading ? '' : undefined}
      className={classes}
    >
      {content}
    </button>
  );
});

export interface ButtonGroupProps extends GroupProps, ButtonVariantProps {}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { variant, size, colorPalette, ...props },
  ref,
) {
  return (
    <ButtonPropsContext.Provider value={{ variant, size, colorPalette }}>
      <Group ref={ref} {...props} />
    </ButtonPropsContext.Provider>
  );
});
