import { useMutation, useQueryClient } from 'react-query';
import { LoginService } from '../LoginService';

const useMutateProfile = () => {
  const queryClient = useQueryClient();
  const { mutate: onSaveData, isLoading } = useMutation(LoginService.create, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('get-Profile');
    }
  });

  return {
    onSaveData,
    isLoading
  };
};

export default useMutateProfile;
