export type FundingStatus = 'funded' | 'inProgress' | 'locked' | 'unknown';

export const LockSection = ({
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
          <span className="ml-1 donation-card-locked font-medium">${endAmount}</span>
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
          <span className="ml-1 sus-green-text font-medium">${endAmount}</span>
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
          <span className="ml-1 donation-card-black font-medium">${endAmount}</span>
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
          <span className="ml-1 donation-card-locked font-medium">${endAmount}</span>
        </div>
      );
  }
};
