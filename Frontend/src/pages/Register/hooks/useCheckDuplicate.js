import { useMutation } from 'react-query';
import { CheckDuplicateService } from '../RegisterService';
import useRegister from './useMutateRegister';

const useCheckAndRegister = () => {
  const { onRegister } = useRegister();
  const { mutate: onCheckAndRegister, isLoading } = useMutation(
    CheckDuplicateService.create,
    {
      onSuccess: (data, variables) => {
        if (!data.result) {
          onRegister(variables);
        }
      }
    }
  );
  return {
    onCheckAndRegister,
    isLoading
  };
};

export default useCheckAndRegister;
