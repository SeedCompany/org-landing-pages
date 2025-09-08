import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

export const DonationInput = ({
  error,
  label,
  type = 'text',
  hidden,
  required,
  placeholder,
  ...field
}: {
  error: FieldError | undefined;
  label: string;
  type?: 'text' | 'email';
  hidden?: boolean;
  required?: boolean;
  placeholder: string;
} & ControllerRenderProps) => {
  return (
    <>
      {error ? (
        <div className="m-2">
          <label
            htmlFor={field.name}
            className="block text-sm/6 font-medium text-gray-900 short:sr-only"
          >
            {label}
          </label>
          <div className="mt-2 grid grid-cols-1">
            <input
              id={field.name}
              {...field}
              type={type}
              required={required}
              placeholder={placeholder}
              aria-invalid="true"
              aria-describedby={`${field.name}-error`}
              className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
            />
            <ExclamationCircleIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
            />
          </div>
          <p id={`${field.name}-error`} className="mt-2 text-sm text-red-600">
            {error.message}
          </p>
        </div>
      ) : (
        <div className={`m-2 ${hidden ? 'hidden' : ''}`}>
          <label
            htmlFor={field.name}
            className="block text-sm/6 font-medium text-gray-900 short:sr-only"
          >
            {label}
          </label>
          <div className="mt-2">
            <input
              id={field.name}
              {...field}
              type={type}
              required={required}
              placeholder={placeholder}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      )}
    </>
  );
};
