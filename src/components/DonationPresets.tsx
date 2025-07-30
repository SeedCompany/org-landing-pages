import React from 'react';

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
      className={`${current ? 'bg-white text-emerald-950 hover:text-emerald-900' : 'bg-emerald-950 text-white  active:border-emerald-500 hover:text-emerald-100 active:text-emerald-200'} border-emerald-950  border rounded-sm m-2 px-2 py-3 min-w-32`}
    >
      {typeof amount === 'string' ? `${amount}` : `$${amount.toLocaleString()}`}
    </button>
  );
};

export const DonationPresets = ({
  presetAmounts,
  setAmount,
  showForm,
  currentAmount,
}: {
  presetAmounts: number[] | null | undefined;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  showForm: React.Dispatch<React.SetStateAction<'hidden' | 'value' | 'form'>>;
  currentAmount: number;
}) => {
  const defaultAmounts = [25, 50, 100, 250, 500];
  return (
    <div className="grid grid-cols-3 gap-2">
      {presetAmounts
        ? presetAmounts.map((amount) => (
            <AmountButton
              key={amount}
              click={() => {
                console.log(amount);
                setAmount(amount);
                showForm('value');
              }}
              amount={amount}
              current={currentAmount === amount}
            />
          ))
        : defaultAmounts.map((amount) => (
            <AmountButton
              key={amount}
              click={() => {
                console.log(amount);
                setAmount(amount);
                showForm('value');
              }}
              current={currentAmount === amount}
              amount={amount}
            />
          ))}
      <AmountButton
        click={() => {
          showForm('form');
        }}
        amount="Other"
      />
    </div>
  );
};
