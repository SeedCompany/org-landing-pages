export const DonationInput = ({
  error,
  required,
  placeholder,
}: {
  error: boolean;
  required: boolean;
  placeholder: string;
}) => {
  return (
    <>
      {error ? (
        <input
          type="text"
          placeholder={placeholder}
          required={required}
          className="bg-red-200 outline-red-500 text-red-500"
        />
      ) : (
        <input type="text" required={required} placeholder={placeholder} />
      )}
    </>
  );
};
