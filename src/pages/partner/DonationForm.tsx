import { type ComponentProps, type ReactNode, useEffect, useState } from 'react';
import { type Telemetry } from '~/graphql';
import { DonationForm as NewDonationForm } from '~/features/donate';
import { CampaignEndedModal } from './CampaignEndedModal.tsx';
import { Button } from '~/common/ui';

export type InvestorType = 'both' | 'individual' | 'organization';

// Maps the selected investor type to the underlying form's `investor` prop.
// 'both' is undefined so the Individual/Organization toggle is shown.
const INVESTOR_CONFIG: Record<InvestorType, ComponentProps<typeof NewDonationForm>['investor']> = {
  both: undefined,
  individual: { defaults: { type: 'Individual' }, hide: ['type'] },
  organization: { defaults: { type: 'Organization' }, hide: ['type'] },
};

export type DonationType = 'oneTime' | 'monthly' | 'both';

// Maps the selected donation type to the underlying form's `cadence` prop.
// A single option hides the cadence toggle; 'both' shows One-time / Monthly.
const CADENCE_CONFIG: Record<DonationType, ComponentProps<typeof NewDonationForm>['cadence']> = {
  oneTime: { options: 'OneTime' },
  monthly: { options: 'Monthly' },
  both: { options: ['OneTime', 'Monthly'] },
};

export type DonateProps = {
  /** Which investor types the form allows. 'both' shows the Individual/Organization toggle. */
  investorType?: InvestorType;
  /** Which donation cadences the form allows. 'both' shows the One-time / Monthly toggle. */
  donationType?: DonationType;
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
            cadence={CADENCE_CONFIG[formProps.donationType ?? 'oneTime']}
            amount={{
              presets: formProps.presetAmounts
                ? {
                    OneTime: formProps.presetAmounts.oneTime,
                    Monthly: formProps.presetAmounts.recurring,
                  }
                : undefined,
            }}
            investor={INVESTOR_CONFIG[formProps.investorType ?? 'both']}
            giveByMail={formProps.giveByMail}
            telemetry={formProps.telemetry}
          />
        </>
      )}
    </div>
  );
};
