import { type Lens } from '@hookform/lenses';
import { z } from 'zod/v4/mini';
import type { InvestorType } from '~/graphql';
import { Button, ButtonGroup, Input, ToggleGroup } from '~/common/ui';
import { Controller, Field } from '~/common/form';
import type { createInvestor } from './investor.schema';
import { AddressFields } from '~/features/address';

type InvestorShape = z.infer<typeof createInvestor>;

export const InvestorFields = ({
  lens,
  hide,
}: {
  lens: Lens<InvestorShape>;
  hide?: Array<keyof InvestorShape>;
}) => (
  <>
    {!hide?.includes('type') && (
      <Controller
        {...lens.focus('type').interop()}
        render={({ field: { value, onChange, ...field } }) => {
          return (
            <ToggleGroup.Root
              variant="outline"
              {...field}
              value={value ? [value] : []}
              onValueChange={({ value }) => onChange(value.at(0) ?? null)}
            >
              <ButtonGroup
                variant="plain"
                css={{
                  width: 'full',
                  '--group-gap': 'spacing.1',
                  '& button': {
                    flexGrow: '1',
                  },
                }}
              >
                <ToggleGroup.Item value={'Individual' satisfies InvestorType} asChild>
                  <Button>Individual</Button>
                </ToggleGroup.Item>
                <ToggleGroup.Item value={'Organization' satisfies InvestorType} asChild>
                  <Button>Organization</Button>
                </ToggleGroup.Item>
              </ButtonGroup>
            </ToggleGroup.Root>
          );
        }}
      />
    )}

    {!hide?.includes('email') && (
      <Controller
        {...lens.focus('email').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="Email"
              autoComplete="email"
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('firstName') && (
      <Controller
        {...lens.focus('firstName').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="First Name"
              autoComplete="given-name"
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('lastName') && (
      <Controller
        {...lens.focus('lastName').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="Last Name"
              autoComplete="family-name"
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('phone') && (
      <Controller
        {...lens.focus('phone').interop()}
        render={(props) => (
          <Field {...props}>
            <Input
              placeholder="Phone"
              autoComplete="tel-national"
              {...props.field}
              value={props.field.value ?? ''}
            />
          </Field>
        )}
      />
    )}

    {!hide?.includes('mailingAddress') && (
      <AddressFields
        lens={lens.focus('mailingAddress')}
        // we say "mailing" but I don't think we're actually that specific.
        // I think this could be used for billing purposes too.
        // Whether we actually mail something with this address is questionable too.
        type={undefined}
        hide={['country']}
      />
    )}
  </>
);
