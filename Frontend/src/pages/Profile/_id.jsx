import Container from '@mui/material/Container';
import AvatarBox from './components/AvatarBox';
import EditBox from './components/EditBox';
import useQueryOnlineProfile from './hooks/useQueryProfile';
import SuspenseLoader from '../../components/SuspenseLoader';
import Title from '../../components/Title';
import profilePNG from '../../assets/profile.png';

function _id() {
  const { profile, isLoading } = useQueryOnlineProfile();

  if (isLoading) return <SuspenseLoader />;

  return (
    <>
      <Title title="PROFILE" icon={profilePNG} />
      <Container
        disableGutters
        sx={{ backgroundColor: 'secondary.main', display: 'flex', mt: 8 }}
      >
        <AvatarBox profile={profile} />
        <EditBox profile={profile} />
      </Container>
    </>
  );
}

export default _id;
