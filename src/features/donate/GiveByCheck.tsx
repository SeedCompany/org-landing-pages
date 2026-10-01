import { Fragment, type ComponentProps } from 'react';
import { Button, CloseButton, Dialog, Icon, Link } from '~/common/ui';
import { MailIcon as LetterIcon } from 'lucide-react';

const DEFAULT_ORG_NAME = 'Seed Company';
const DEFAULT_MAILING_ADDRESS = 'ATTN: Finance\n220 Westway Place\nSuite 100\nArlington, TX 76018';
const DEFAULT_PHONE = '(817) 557-2121';
const DEFAULT_EMAIL = 'info@tsco.org';

interface GiveByCheckProps {
  memo?: string;
  orgName?: string | null;
  mailingAddress?: string | null;
  phone?: string | null;
  email?: string | null;
  className?: string;
}

export const GiveByCheck = ({
  memo,
  orgName,
  mailingAddress,
  phone,
  email,
  className,
}: GiveByCheckProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button variant="plain" size="xs" className={className}>
        Want to give by check?
      </Button>
    </Dialog.Trigger>

    <Dialog.Positioner>
      <Dialog.Content>
        <div className="flex flex-col items-center gap-2 p-6 pb-0">
          <MailIconCircle />
          <Dialog.Title>Give by Check</Dialog.Title>
        </div>

        <div className="px-6 py-4">
          <GiveByCheckBody
            memo={memo}
            orgName={orgName}
            mailingAddress={mailingAddress}
            phone={phone}
            email={email}
          />
        </div>

        <Dialog.CloseTrigger asChild>
          <CloseButton className="absolute top-3 right-3" />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
);

const GiveByCheckBody = ({
  memo,
  orgName: orgNameProp,
  mailingAddress: mailingAddressProp,
  phone: phoneProp,
  email: emailProp,
}: {
  memo?: string;
  orgName?: string | null;
  mailingAddress?: string | null;
  phone?: string | null;
  email?: string | null;
} & ComponentProps<'div'>) => {
  // Sanity returns `null` (not `undefined`) for unset optional fields, so fall back with
  // `??` rather than relying on default parameter values, which only apply to `undefined`.
  const orgName = orgNameProp ?? DEFAULT_ORG_NAME;
  const mailingAddress = mailingAddressProp ?? DEFAULT_MAILING_ADDRESS;
  const phone = phoneProp ?? DEFAULT_PHONE;
  const email = emailProp ?? DEFAULT_EMAIL;
  const addressLines = mailingAddress.split('\n');
  const phoneHref = `tel:+1${phone.replace(/\D/g, '')}`;
  return (
    <div className="flex flex-col gap-3">
      <p>
        Please make your check payable to <i>{orgName}</i> and send to the following address:
      </p>
      <p className="px-2 text-sm">
        {orgName}
        <br />
        {addressLines.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < addressLines.length - 1 && <br />}
          </Fragment>
        ))}
        {memo && (
          <>
            <br />
            <br />
            Check Memo: {memo}
          </>
        )}
      </p>
      <p>
        You may call us at <Link href={phoneHref}>{phone}</Link> or email at{' '}
        <Link href={`mailto:${email}`}>{email}</Link> for further information.
      </p>
    </div>
  );
};

const MailIconCircle = () => (
  <div className="rounded-full bg-[#b7de002e] p-3 text-scForest">
    <Icon size="xl">
      <LetterIcon />
    </Icon>
  </div>
);
