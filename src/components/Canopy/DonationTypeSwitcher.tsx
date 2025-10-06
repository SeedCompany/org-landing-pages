export const DonorTypeSwitcher = ({
  currentType,
  setDonorType,
}: {
  currentType: string;
  setDonorType: React.Dispatch<React.SetStateAction<'Individual' | 'Organization'>>;
}) => {
  return (
    <>
      <p className="px-2 font-lato">Give as:</p>
      <div className="grid grid-cols-2 gap-3 font-lato text-sm tracking-wider font-bold max-sm:text-xs max-xxs:grid-cols-1 max-xxs:gap-0">
        <button
          onClick={() => setDonorType('Individual')}
          className={`uppercase ${currentType === 'Individual' ? 'bg-canopySelected border-canopySelectedBorder border-[1px solid] text-canopyTextColor' : 'bg-canopyBase text-canopyTextColor'}   border rounded-sm m-2 px-2 py-3 min-w-32`}
        >
          Individual
        </button>
        <button
          onClick={() => setDonorType('Organization')}
          className={`uppercase ${currentType === 'Organization' ? 'bg-canopySelected border-canopySelectedBorder border-[1px solid] text-canopyTextColor' : 'bg-canopyBase text-canopyTextColor'}   border rounded-sm m-2 px-2 py-3 min-w-32`}
        >
          Organization
        </button>
      </div>
    </>
  );
};
