import { z } from 'zod/v4/mini';
import { type Lens } from '@hookform/lenses';
import { Controller, Field } from '~/common/form';
import { Input } from '~/common/ui';
import type { address } from './address.schema';

export const AddressFields = ({
  lens,
  type,
  hide,
}: {
  lens: Lens<z.infer<typeof address>>;
  type?: 'billing' | 'shipping';
  hide?: Array<keyof z.infer<typeof address>>;
}) => (
  <>
    {!hide?.includes('line1') && (
      <Controller
        {...lens.focus('line1').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="Address Line 1"
              autoComplete={`${type ?? ''} address-line1`}
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('line2') && (
      <Controller
        {...lens.focus('line2').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="Address Line 2"
              autoComplete={`${type ?? ''} address-line2`}
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('city') && (
      <Controller
        {...lens.focus('city').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="City"
              autoComplete={`${type ?? ''} address-level2`}
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('state') && (
      <Controller
        {...lens.focus('state').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="State"
              autoComplete={`${type ?? ''} address-level1`}
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('zip') && (
      <Controller
        {...lens.focus('zip').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="Zip Code"
              autoComplete={`${type ?? ''} postal-code`}
              {...props.field}
              value={props.field.value ?? ''}
              inputMode="decimal"
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('country') && (
      <Controller
        {...lens.focus('country').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="Country Code"
              autoComplete={`${type ?? ''} country`}
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}
  </>
);
