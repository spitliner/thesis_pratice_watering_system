import Container from '@mui/material/Container';
import AvatarBox from './components/AvatarBox';
import EditBox from './components/EditBox';
import useQueryOnlineProfile from './hooks/useQueryProfile';
import SuspenseLoader from '../../components/SuspenseLoader';

function _id() {
  const { profile, isLoading } = useQueryOnlineProfile();
  if (isLoading) return <SuspenseLoader />;
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ backgroundColor: 'secondary.main', display: 'flex', mt: 2 }}
    >
      <AvatarBox profile={profile} />
      <EditBox profile={profile} />
    </Container>
  );
}

export default _id;
