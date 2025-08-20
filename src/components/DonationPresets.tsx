import React, { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';

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
      className={`${current ? 'bg-white text-emerald-950 hover:text-emerald-900' : 'bg-emerald-950 text-white  active:border-emerald-500 hover:text-emerald-100 active:text-emerald-200'} border-emerald-950  border rounded-sm m-2 px-2 py-3 min-w-0`}
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
  amountError,
}: {
  presetAmounts: { recurring: number[]; oneTime: number[] } | null | undefined;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  recurring: boolean;
  currentAmount: number;
  amountError: string | null;
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
    <>
      <div className="grid grid-cols-3">
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
      </div>
      {otherAmount && (
        <div className="px-2 w-full">
          <label
            htmlFor="amount"
            className="block text-sm/6 font-medium text-gray-900 whitespace-nowrap"
          >
            Donation Amount
          </label>
          <div className="mt-2 grid grid-cols-1 w-full">
            <input
              id="amount"
              type="text"
              required
              value={currentAmount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base ${amountError ? 'text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600 col-start-1 row-start-1' : 'text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600'} outline outline-1 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2  sm:text-sm/6`}
            />
            {amountError && (
              <ExclamationCircleIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
              />
            )}
          </div>
          {amountError && (
            <p id={`amount-error`} className="mt-2 text-sm text-red-600">
              {amountError}
            </p>
          )}
        </div>
      )}
    </>
  );
};
