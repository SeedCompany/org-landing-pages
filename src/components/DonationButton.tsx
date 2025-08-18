interface DonationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const DonationButton = ({
  buttonType = 'primary',
  children,
  className = '',
  ...rest
}: DonationButtonProps) => {
  return (
    <button
      className={`${className} h-14 donation-button m-2 rounded-sm px-3.5 py-2.5 text-sm font-semibold  ${buttonType === 'primary' ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600' : 'border-black border hover:text-gray-800 hover:border-gray-800 hover:bg-emerald-50'}`}
      {...rest}
    >
      {children}
    </button>
  );
};
