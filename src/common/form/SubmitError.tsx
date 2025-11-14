import { useFormContext } from 'react-hook-form';
import { Alert } from '../ui';

export const SubmitError = () => {
  const {
    formState: { errors },
  } = useFormContext();
  if (!errors.root) return null;
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>{errors.root.message}</Alert.Content>
    </Alert.Root>
  );
};
