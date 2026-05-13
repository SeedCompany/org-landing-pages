import { forwardRef, type ComponentProps } from 'react';
import { usStateCodes } from './us-state-codes';

export const StateSelect = forwardRef<HTMLSelectElement, ComponentProps<'select'>>(
  function StateSelect({ className = '', ...props }, ref) {
    return (
      <select
        ref={ref}
        aria-label="State"
        className={[
          'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500',
          className,
        ].join(' ')}
        {...props}
      >
        <option value="">State</option>
        {[...usStateCodes].map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    );
  },
);
