import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { localStorage } from '../../../utils';
import { LoginService } from '../LoginService';
import { setAccessToken, getAccessToken } from '../../../utils/localStorage';

const useLogin = () => {
  const token = getAccessToken();

  const navigate = useNavigate();
  if (token) navigate('/');

  const { mutate: onLogin, isLoading } = useMutation(LoginService.create, {
    onSuccess: (res) => {
      const token = res.token;
      setAccessToken(token);
      localStorage.setAccessToken(token);
      location.replace('/');
    },
    onError: (res) => {
      alert(res.response.data.error)
    }
  });

  return {
    onLogin,
    isLoading
  };
};

export default useLogin;
