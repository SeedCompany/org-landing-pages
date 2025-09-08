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
      <div className="grid grid-cols-3 font-lato text-sm tracking-wider font-bold max-tiny:grid-cols-2">
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
          <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900 sr-only">
            Amount
          </label>
          <div className="mt-2">
            <div
              className={`flex items-center rounded-md bg-white px-3 ${amountError ? 'text-red-900 outline-red-300 placeholder:text-red-300 focus-within:outline-red-600 col-start-1 row-start-1' : 'text-gray-500 outline-gray-300 placeholder:text-gray-400 focus-within:outline-indigo-600'} outline outline-1 -outline-offset-1  focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 `}
            >
              <div
                className={`shrink-0 select-none text-base ${amountError ? 'text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600 col-start-1 row-start-1' : 'text-gray-500 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600'} sm:text-sm/6`}
              >
                $
              </div>
              <input
                id="amount"
                name="amount"
                type="text"
                placeholder="0"
                value={currentAmount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                aria-describedby="price-currency"
                className={`block min-w-0 grow bg-white py-1.5 pl-1 pr-3 text-base placeholder:text-gray-400 ${amountError ? 'text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600 col-start-1 row-start-1' : 'text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600'} focus:outline focus:outline-0 sm:text-sm/6`}
              />
              {amountError && (
                <ExclamationCircleIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
                />
              )}
              <div
                id="price-currency"
                className={`shrink-0 select-none text-base ${amountError ? 'text-red-900' : 'text-gray-500'} sm:text-sm/6`}
              >
                USD
              </div>
            </div>
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
