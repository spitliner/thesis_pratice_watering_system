import Container from '@mui/material/Container';
import AppBar from '../../components/AppBar/AppBar';
import Navigation from '../../components/Navigation/Navigation';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';

function Home() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: 'secondary.main',
        display: 'flex',
        mt: 2
      }}
    >
      <MainContent />
      <SideBar />
    </Container>
  );
}

export default Home;
