import { useQuery } from 'react-query';
import { ProfileService } from '../ProfileService';
import useLogoutHook from '../../Login/hooks/useMutateLogout';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../../utils/localStorage';

const useQueryProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    'get-Profile',
    ProfileService.get,
    {
      refetchOnWindowFocus: false
    }
  );
  if (isError) {
    setAccessToken(null);
    localStorage.clear();
    navigate('/login');
  }
  return {
    profile: data?.usr,
    isLoading,
    isError
  };
};

export default useQueryProfile;
