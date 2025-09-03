import React from 'react';

export const RecurringDonationSwitcher = ({
  currentType,
  setDonationType,
}: {
  currentType: string;
  setDonationType: React.Dispatch<React.SetStateAction<'OneTime' | 'Monthly'>>;
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 font-lato text-sm tracking-wider font-bold max-sm:text-xs max-xxs:grid-cols-1 max-xxs:gap-0">
      <button
        onClick={() => setDonationType('OneTime')}
        className={`uppercase ${currentType === 'OneTime' ? 'bg-white text-watermarkDarkBlue hover:text-emerald-900' : 'bg-watermarkDarkBlue text-white  active:border-emerald-500 hover:text-emerald-100 active:text-emerald-200'} border-watermarkDarkBlue  border rounded-sm m-2 px-2 py-3 min-w-32`}
      >
        One Time Donation
      </button>
      <button
        onClick={() => setDonationType('Monthly')}
        className={`uppercase ${currentType === 'Monthly' ? 'bg-white text-watermarkDarkBlue hover:text-emerald-900' : 'bg-watermarkDarkBlue text-white  active:border-emerald-500 hover:text-emerald-100 active:text-emerald-200'} border-watermarkDarkBlue  border rounded-sm m-2 px-2 py-3 min-w-32`}
      >
        Monthly Donation
      </button>
    </div>
  );
};
