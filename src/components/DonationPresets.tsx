import React, { useEffect } from 'react';

const AmountButton = ({
  amount,
  click,
  current,
}: {
  amount: number | string;
  click: () => void;
  current?: boolean;
}) => {
  return (
    <button
      onClick={click}
      className={`${current ? 'bg-white text-emerald-950 hover:text-emerald-900' : 'bg-emerald-950 text-white  active:border-emerald-500 hover:text-emerald-100 active:text-emerald-200'} border-emerald-950  border rounded-sm m-1 sm:m-2 px-1 sm:px-2 py-3 min-w-0 sm:min-w-24 md:min-w-32 text-sm sm:text-base`}
    >
      {typeof amount === 'string' ? `${amount}` : `$${amount.toLocaleString()}`}
    </button>
  );
};

export const DonationPresets = ({
  presetAmounts,
  setAmount,
  recurring,
  currentAmount,
}: {
  presetAmounts: { recurring: number[]; oneTime: number[] } | null | undefined;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  recurring: boolean;
  currentAmount: number;
}) => {
  const defaultAmounts = [25, 50, 100, 250, 500];
  const [amountPresets, setAmountPresets] = React.useState<number[]>(
    presetAmounts ? (recurring ? presetAmounts.recurring : presetAmounts.oneTime) : defaultAmounts,
  );
  const [otherAmount, setOtherAmount] = React.useState<boolean>(false);
  useEffect(() => {
    setAmountPresets(
      presetAmounts
        ? recurring
          ? presetAmounts.recurring
          : presetAmounts.oneTime
        : defaultAmounts,
    );
  }, [recurring, presetAmounts]);
  return (
    <div className="grid grid-cols-3 gap-2">
      {amountPresets.map((amount) => (
        <AmountButton
          key={amount}
          click={() => {
            setAmount(amount);
            setOtherAmount(false);
          }}
          amount={amount}
          current={currentAmount === amount}
        />
      ))}
      <AmountButton
        click={() => {
          setOtherAmount(true);
          setAmount(1);
        }}
        current={otherAmount}
        amount="Other"
      />
      {otherAmount && (
        <div className="px-2">
          <label
            htmlFor="amount"
            className="block text-sm/6 font-medium text-gray-900 whitespace-nowrap"
          >
            Donation Amount
          </label>
          <div className="my-2">
            <input
              id="amount"
              type="text"
              required
              placeholder="Amount"
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      )}
    </div>
  );
};
