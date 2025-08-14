import type { CardProps } from './ProjectCards.tsx';
import { useState } from 'react';
import { ProgressBar } from './atoms/ProgressBar';

type FundingStatus = 'funded' | 'inProgress' | 'locked' | 'unknown';

const compareTotals = ({
  current,
  end,
  start,
}: {
  current: number;
  end: number;
  start: number;
}) => {
  // locked, inProgress, funded
  if (current < start) {
    return 'locked';
  } else if (current >= start && current < end) {
    return 'inProgress';
  } else if (current >= end) {
    return 'funded';
  } else {
    return 'unknown';
  }
};

const LockSection = ({
  fundingStatus,
  endAmount,
}: {
  fundingStatus: FundingStatus;
  endAmount: number;
}) => {
  switch (fundingStatus) {
    case 'locked':
      return (
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 donation-card-locked"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 donation-card-locked font-medium">{endAmount}</span>
        </div>
      );
    case 'inProgress':
      return (
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 donation-card-black"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 sus-green-text font-medium">{endAmount}</span>
        </div>
      );
    case 'funded':
      return (
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 sus-green-text"
          >
            <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
          </svg>
          <span className="ml-1 donation-card-black font-medium">{endAmount}</span>
        </div>
      );
    default:
      return (
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 donation-card-locked"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 donation-card-locked font-medium">{endAmount}</span>
        </div>
      );
  }
};

export const DonationCardComponent = ({ projectData }: { projectData: CardProps }) => {
  const [fundingStatus] = useState<FundingStatus>(
    compareTotals({
      current: projectData.currentAmount,
      end: projectData.endAmount,
      start: projectData.startAmount,
    }),
  );

  return (
    <div className="donation-card">
      <div className="donation-card-image-wrapper">
        <img
          className="donation-card-image"
          src="https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/eaffaaa131775759083460fbe8886c0d574ceee4-1080x809.jpg"
          alt=""
        />
        {/* TODO + Note on the below: somehow, even with the guardrails in place to assure the total is maximum 100% in both this file and the ProgressBar component,
        if the currentAmount is higher than the endAmount, the progress bar renders outside the alotted space*/}
        {fundingStatus === 'inProgress' && (
          <ProgressBar
            maxNumber={projectData.endAmount}
            currentNumber={projectData.currentAmount}
            // TODO - fix background images
            // backgroundType="image"
          >
            {(projectData.currentAmount / projectData.endAmount) * 100 > 100
              ? 100
              : `${Math.round((projectData.currentAmount / projectData.endAmount) * 100)}`}
            % FUNDED!
          </ProgressBar>
        )}
        {fundingStatus === 'funded' && (
          <ProgressBar maxNumber={100} currentNumber={100}>
            100% FUNDED!
          </ProgressBar>
        )}
      </div>
      <div className="donation-card-content">
        <h3 className="donation-card-subheading">{`${projectData.peopleGroups} People groups in ${projectData.region}`}</h3>
        <div className="flex justify-between gap-2">
          <h2 className="donation-card-heading">{projectData.projectHeader}</h2>
          <div className="flex items-center">
            <LockSection fundingStatus={fundingStatus} endAmount={projectData.endAmount} />
          </div>
        </div>
        <p className="donation-card-description">{projectData.projectDescription}</p>
        <ul className="donation-card-ul">
          {projectData.projectBullets.map((bullet, index) => (
            <li key={index} className="donation-card-li">
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
