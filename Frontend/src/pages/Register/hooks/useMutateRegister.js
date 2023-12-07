import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { RegisterService, CheckDuplicateService } from '../RegisterService';
import { getAccessToken } from '../../../utils/localStorage';

const useRegister = () => {
  const token = getAccessToken();

  const navigate = useNavigate();
  if (token) navigate('/');

  const { mutate: onRegister, isLoading } = useMutation(
    RegisterService.create,
    {
      onSuccess: (data) => {
        navigate('/');
      }
    }
  );

  return {
    onRegister,
    isLoading
  };
};

export default useRegister;
