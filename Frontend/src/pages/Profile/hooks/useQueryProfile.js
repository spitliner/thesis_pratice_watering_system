import { useQuery } from 'react-query';
import { ProfileService } from '../ProfileService';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../../utils/localStorage';

const useQueryProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useQuery(
    'get-Profile',
    ProfileService.get,
    {
      refetchOnWindowFocus: false,
      retry: 1
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
    isError,
    isSuccess
  };
};

export default useQueryProfile;
