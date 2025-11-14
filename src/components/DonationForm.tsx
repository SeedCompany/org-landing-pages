import { type ReactNode, useEffect, useState } from 'react';
import { type Telemetry } from '~/graphql';
import { DonationForm as NewDonationForm } from '~/features/donate';
import { CampaignEndedModal } from './atoms/CampaignEndedModal.tsx';
import { styled } from 'styled-system/jsx';
import { Button } from '~/common/ui/index.ts';

export type DonateProps = {
  hideInvestorType?: 'Individual' | 'Organization';
  enableRecurring?: boolean;
  campaignTotals?: boolean;
  campaignEnded?: boolean;
  presetAmounts?: { recurring: number[]; oneTime: number[] };
  telemetry?: Telemetry;
};

/**
 * @deprecated Use {@link import('~/features/donate').DonationForm} instead.
 */
export const DonationForm = ({
  formProps,
  campaignProgress,
  disableDialog,
}: {
  formProps: DonateProps;
  campaignProgress?: ReactNode;
  disableDialog?: boolean;
}) => {
  const { campaignEnded = false } = formProps;

  const [showEndModal, setShowEndModal] = useState(false);

  // Only run on the client because the dialog uses a portal which doesn't support SSR
  useEffect(() => void (campaignEnded && setShowEndModal(true)), []);

  return (
    <styled.div css={{ m: '4' }}>
      {!disableDialog && (
        <CampaignEndedModal
          campaignProgress={campaignProgress}
          open={showEndModal}
          onClose={() => setShowEndModal(false)}
        />
      )}
      {campaignEnded ? (
        <>
          {formProps.campaignTotals && campaignProgress}
          <Button disabled size="xl" css={{ width: 'full', mt: '3' }}>
            Campaign Ended 10/18
          </Button>
        </>
      ) : (
        <NewDonationForm
          cadence={formProps.enableRecurring ? undefined : { options: 'OneTime' }}
          presetAmounts={
            formProps.presetAmounts
              ? {
                  OneTime: formProps.presetAmounts.oneTime,
                  Monthly: formProps.presetAmounts.recurring,
                }
              : undefined
          }
          investor={{
            hide: formProps.hideInvestorType ? ['type'] : [],
          }}
          telemetry={formProps.telemetry}
          before={
            <styled.div
              css={{
                display: 'none',
                '[data-scope=donate-form][data-step=intro] &': { display: 'block' },
              }}
            >
              {formProps.campaignTotals && campaignProgress}
            </styled.div>
          }
        />
      )}
    </styled.div>
  );
};
