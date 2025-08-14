import React, { useEffect } from 'react';

interface ProgressBarProps {
  color?: string;
  currentNumber: number;
  maxNumber: number;
  fullWidth?: string;
  backgroundType?: 'image' | 'solid';
  children?: React.ReactNode;
}
export const ProgressBar = ({
  color,
  currentNumber,
  maxNumber,
  fullWidth,
  backgroundType = 'solid',
  children,
}: ProgressBarProps) => {
  const [progress, setProgress] = React.useState((currentNumber / maxNumber || 0) * 100);
  useEffect(() => {
    if (progress > 100) {
      setProgress(100);
    }
  }, [progress]);
  return (
    <div
      className={`w-[${fullWidth || '100%'}] rounded-xs h-10 mx-auto ${backgroundType === 'solid' ? 'bg-gray-200 dark:bg-gray-200' : `bg-[url(/images/progress-background.png)] bg-cover bg-center`}`}
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
