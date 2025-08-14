import { ProgressBar } from './atoms/ProgressBar.tsx';

export const CampaignGivingInfo = () => {
  return (
    <div className="px-2">
      <div className="grid grid-cols-2">
        <span className="text-2xl font-bold mb-4">Total Raised</span>
        <span className="text-xl mb-4 text-right">$105,000</span>
      </div>
      <ProgressBar currentNumber={105000} maxNumber={2000000} backgroundType="image" />
      <div className="grid grid-cols-2">
        <span className="text-2xl font-bold mb-4">Projects Unlocked</span>
        <span className="text-xl mb-4 text-right">2</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="text-2xl font-bold mb-4">People Impacted</span>
        <span className="text-xl mb-4 text-right">27</span>
      </div>
    </div>
  );
};
