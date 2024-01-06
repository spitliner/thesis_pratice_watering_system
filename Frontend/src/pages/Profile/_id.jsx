import Container from '@mui/material/Container';
import AvatarBox from './components/AvatarBox';
import EditBox from './components/EditBox';
import useQueryOnlineProfile from './hooks/useQueryProfile';
import SuspenseLoader from '../../components/SuspenseLoader';
import Title from '../../components/Title';
import welcomeSVG from '../../assets/welcome.svg';
function _id() {
  const { profile, isLoading } = useQueryOnlineProfile();

  if (isLoading) return <SuspenseLoader />;

  return (
    <>
      <Title title="PROFILE" icon={welcomeSVG} />
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
