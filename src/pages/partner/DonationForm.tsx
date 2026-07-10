import { type ReactNode, useEffect, useState } from 'react';
import { type Telemetry } from '~/graphql';
import { DonationForm as NewDonationForm } from '~/features/donate';
import { CampaignEndedModal } from './CampaignEndedModal.tsx';
import { Button } from '~/common/ui';

export type DonateProps = {
  /** Which giver types the form allows. 'both' shows the Individual/Organization toggle. */
  giverType?: 'both' | 'individual' | 'organization';
  enableRecurring?: boolean;
  campaignTotals?: boolean;
  forceDisabled?: boolean;
  campaignEndDate?: string;
  campaignStartDate?: string;
  logoUrl?: string;
  logoAlt?: string;
  /** false hides the "give by check" option; { memo } shows it with an optional memo line. */
  giveByMail?: false | { memo?: string };
  presetAmounts?: { recurring: number[]; oneTime: number[] };
  telemetry?: Telemetry;
};

// Parses a YYYY-MM-DD date string as local midnight to avoid UTC timezone shift
const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year!, month! - 1, day);
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

export const DonationForm = ({
  formProps,
  campaignProgress,
  disableDialog,
}: {
  formProps: DonateProps;
  campaignProgress?: ReactNode;
  disableDialog?: boolean;
}) => {
  const { forceDisabled = false, campaignEndDate, campaignStartDate, logoUrl, logoAlt } = formProps;

  const now = new Date();
  const startDate = campaignStartDate ? parseLocalDate(campaignStartDate) : null;
  const endDate = campaignEndDate ? parseLocalDate(campaignEndDate) : null;

  const hasNotStarted = startDate ? now < startDate : false;
  const hasEnded = endDate ? now >= endDate : false;
  const isDisabled = forceDisabled || hasNotStarted || hasEnded;

  const ctaLabel =
    hasNotStarted && startDate
      ? `Giving Starts ${formatDate(startDate)}`
      : hasEnded && endDate
        ? `Campaign Ended ${formatDate(endDate)}`
        : 'Giving Unavailable';

  const [showEndModal, setShowEndModal] = useState(false);

  // Modal only appears after the campaign has truly ended
  useEffect(() => void (hasEnded && setShowEndModal(true)), []);

  return (
    <div className="m-4">
      {!disableDialog && (
        <CampaignEndedModal
          campaignProgress={campaignProgress}
          open={showEndModal}
          onClose={() => setShowEndModal(false)}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
        />
      )}
      {isDisabled ? (
        <>
          {formProps.campaignTotals && campaignProgress}
          <Button
            disabled
            size="xl"
            className="w-full mt-3 bg-scBlack text-scNatural border-transparent hover:bg-scBlack disabled:bg-scGranite disabled:opacity-60"
          >
            {ctaLabel}
          </Button>
        </>
      ) : (
        <>
          {formProps.campaignTotals && campaignProgress}
          <NewDonationForm
            cadence={formProps.enableRecurring ? undefined : { options: 'OneTime' }}
            amount={{
              presets: formProps.presetAmounts
                ? {
                    OneTime: formProps.presetAmounts.oneTime,
                    Monthly: formProps.presetAmounts.recurring,
                  }
                : undefined,
            }}
            investor={
              formProps.giverType === 'individual'
                ? { defaults: { type: 'Individual' }, hide: ['type'] }
                : formProps.giverType === 'organization'
                  ? { defaults: { type: 'Organization' }, hide: ['type'] }
                  : undefined // 'both' (or unset): show the Individual/Organization toggle
            }
            giveByMail={formProps.giveByMail}
            telemetry={formProps.telemetry}
          />
        </>
      )}
    </div>
  );
};
