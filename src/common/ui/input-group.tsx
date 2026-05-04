import { cloneElement, forwardRef, isValidElement, type ReactElement, type ReactNode } from 'react';
import { InputElement } from './input-element.tsx';

export interface InputGroupProps {
  startElement?: ReactNode;
  endElement?: ReactNode;
  startAddon?: ReactNode;
  endAddon?: ReactNode;
  children: ReactElement;
  className?: string;
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(
  { startElement, endElement, startAddon, endAddon, children, className = '' },
  ref,
) {
  const hasStart = Boolean(startElement || startAddon);
  const hasEnd = Boolean(endElement || endAddon);

  const child = isValidElement(children) ? children : null;
  const inputWithPadding = child
    ? cloneElement(child as ReactElement<{ className?: string }>, {
        className: [
          (child.props as { className?: string }).className ?? '',
          hasStart ? 'pl-10' : '',
          hasEnd ? 'pr-10' : '',
        ]
          .filter(Boolean)
          .join(' '),
      })
    : children;

  return (
    <div ref={ref} className={`relative flex items-center w-full ${className}`}>
      {startAddon && (
        <div className="shrink-0 inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md text-sm text-gray-500">
          {startAddon}
        </div>
      )}
      <div className="relative flex-1">
        {startElement && (
          <InputElement placement="start" className="pointer-events-none">
            {startElement}
          </InputElement>
        )}
        {inputWithPadding}
        {endElement && (
          <InputElement placement="end" className="pointer-events-none">
            {endElement}
          </InputElement>
        )}
      </div>
      {endAddon && (
        <div className="shrink-0 inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md text-sm text-gray-500">
          {endAddon}
        </div>
      )}
    </div>
  );
});
