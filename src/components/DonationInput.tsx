import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import type { ControllerRenderProps, FieldError } from 'react-hook-form';

export const DonationInput = ({
  error,
  label,
  type = 'text',
  required,
  placeholder,
  ...field
}: {
  error: FieldError | undefined;
  label: string;
  type?: 'text' | 'email';
  required?: boolean;
  placeholder: string;
} & ControllerRenderProps) => {
  return (
    <>
      {error ? (
        <div>
          <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
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
              aria-describedby="email-error"
              className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
            />
            <ExclamationCircleIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
            />
          </div>
          <p id="email-error" className="mt-2 text-sm text-red-600">
            {error.message}
          </p>
        </div>
      ) : (
        // <input
        //   type="text"
        //   placeholder={placeholder}
        //   required={required}
        //   className="bg-red-200 outline-red-500 text-red-500"
        // />
        // <input type="text" required={required} placeholder={placeholder} />
        <div>
          <label htmlFor={field.name} className="block text-sm/6 font-medium text-gray-900">
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
