import { Stack, type StackProps, styled, VStack } from 'styled-system/jsx';
import type { JsxStyleProps } from 'styled-system/types';
import { Button, CloseButton, Dialog, Icon, Link } from '~/common/ui';
import { Portal } from '@ark-ui/react';
import { MailIcon as LetterIcon } from 'lucide-react';

interface GiveByCheckProps extends JsxStyleProps {
  memo?: string;
}

export const GiveByCheck = ({ memo, css: cssProp }: GiveByCheckProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button variant="plain" size="xs" css={cssProp}>
        Want to give by check?
      </Button>
    </Dialog.Trigger>

    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header asChild>
            <VStack>
              <MailIcon />
              <Dialog.Title>Give by Check</Dialog.Title>
            </VStack>
          </Dialog.Header>

          <Dialog.Body asChild>
            <GiveByCheckBody memo={memo} />
          </Dialog.Body>

          <Dialog.CloseTrigger asChild>
            <CloseButton />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);

const GiveByCheckBody = ({ memo, ...rest }: { memo?: string } & StackProps) => (
  <Stack gap="3" {...rest}>
    <p>
      Please make your check payable to <i>Seed Company</i> and send to the following address:
    </p>
    <styled.p css={{ px: '2', textStyle: 'body3' }}>
      Seed Company
      <br />
      ATTN: Finance
      <br />
      220 Westway Place
      <br />
      Suite 100
      <br />
      Arlington, TX 76018
      {memo && (
        <>
          <br />
          <br />
          Memo: {memo}
        </>
      )}
    </styled.p>
    <p>
      You may call us at <Link href="tel:+1(817)557-2121">(817) 557-2121</Link> or email at{' '}
      <Link href="mailto:info@tsco.org">info@tsco.org</Link> for further information.
    </p>
  </Stack>
);

const MailIcon = () => (
  <styled.div
    css={{
      colorPalette: 'primary',
      color: 'colorPalette.solid.bg',
      bg: 'colorPalette.subtle.bg',
      rounded: 'full',
      p: '3',
    }}
  >
    <Icon size="xl">
      <LetterIcon />
    </Icon>
  </styled.div>
);
