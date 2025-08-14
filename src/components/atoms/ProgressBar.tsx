import React, { useEffect } from 'react';

interface ProgressBarProps {
  color?: string;
  currentNumber: number;
  maxNumber: number;
  fullWidth?: string;
  // backgroundType?: 'image' | 'solid';
  children?: React.ReactNode;
}
export const ProgressBar = ({
  color,
  currentNumber,
  maxNumber,
  fullWidth,
  // backgroundType = 'solid',
  children,
}: ProgressBarProps) => {
  const progress = Math.min((currentNumber / maxNumber || 0) * 100, 100);
  return (
    // TODO - fix background image stuff - no time to re-factor all the components right now to use the janky Astro files
    // <div
    //   className={`w-[${fullWidth || '100%'}] rounded-xs h-10 mx-auto ${backgroundType === 'solid' ? 'bg-gray-200 dark:bg-gray-200' : `bg-[url(/images/progress-background.png)] bg-cover bg-center`}`}
    // >
    <div
      className={`w-[${fullWidth || '100%'}] rounded-xs h-10 mx-auto 'bg-gray-200 dark:bg-gray-200'}`}
    >
      <div
        className={`h-10 rounded-xs ${color || 'bg-watermarkGreen'}`}
        style={{
          width: `${progress}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
