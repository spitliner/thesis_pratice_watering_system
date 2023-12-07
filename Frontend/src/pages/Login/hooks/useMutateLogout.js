import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../../utils/localStorage';

const useLogoutHook = () => {
  const navigate = useNavigate();
  const logout = () => {
    setAccessToken(null);
    localStorage.clear();
    navigate('/login');
  };
  return logout;
};

export default useLogoutHook;
