import type { ComponentProps } from 'react';
import { Button, CloseButton, Dialog, Icon, Link } from '~/common/ui';
import { MailIcon as LetterIcon } from 'lucide-react';

interface GiveByCheckProps {
  memo?: string;
  className?: string;
}

export const GiveByCheck = ({ memo, className }: GiveByCheckProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button variant="plain" size="xs" className={className}>
        Want to give by check?
      </Button>
    </Dialog.Trigger>

    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <div className="flex flex-col items-center gap-2 p-6 pb-0">
          <MailIconCircle />
          <Dialog.Title>Give by Check</Dialog.Title>
        </div>

        <div className="px-6 py-4">
          <GiveByCheckBody memo={memo} />
        </div>

        <Dialog.CloseTrigger asChild>
          <CloseButton className="absolute top-3 right-3" />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
);

const GiveByCheckBody = ({ memo }: { memo?: string } & ComponentProps<'div'>) => (
  <div className="flex flex-col gap-3">
    <p>
      Please make your check payable to <i>Seed Company</i> and send to the following address:
    </p>
    <p className="px-2 text-sm">
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
    </p>
    <p>
      You may call us at <Link href="tel:+1(817)557-2121">(817) 557-2121</Link> or email at{' '}
      <Link href="mailto:info@tsco.org">info@tsco.org</Link> for further information.
    </p>
  </div>
);

const MailIconCircle = () => (
  <div className="rounded-full bg-[#b7de002e] p-3 text-scForest">
    <Icon size="xl">
      <LetterIcon />
    </Icon>
  </div>
);
