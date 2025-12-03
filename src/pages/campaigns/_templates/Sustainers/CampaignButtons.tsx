import React from 'react';

interface CampaignButtonsProps {
  primaryCtaLink: string;
  primaryCtaText: string;
  secondaryCtaLink: string;
  secondaryCtaText: string;
}

const CampaignButtons: React.FC<CampaignButtonsProps> = ({
  primaryCtaLink,
  primaryCtaText,
  secondaryCtaLink,
  secondaryCtaText,
}) => {
  return (
    <div className="flex flex-col gap-2 min-[400px]:flex-row mx-auto lg:mx-0">
      <a
        href={primaryCtaLink}
        className="mt-8 px-6 py-2 bg-white sus-button-secondary-bg sus-button-secondary-hover border-2"
      >
        {primaryCtaText}
      </a>
      <a
        href={secondaryCtaLink}
        className="mt-8 px-6 py-2 border-white text-white hover:bg-white/20"
      >
        {secondaryCtaText}
      </a>
    </div>
  );
};

export default CampaignButtons;
