import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { RegisterService } from '../RegisterService';
import { getAccessToken } from '../../../utils/localStorage';

const useRegister = () => {
  const token = getAccessToken();

  const navigate = useNavigate();
  if (token) navigate('/');

  const { mutate: onRegister, isLoading } = useMutation(
    RegisterService.create,
    {
      onSuccess: () => {
        navigate('/login');
      }
    }
  );

  return {
    onRegister,
    isLoading
  };
};

export default useRegister;
