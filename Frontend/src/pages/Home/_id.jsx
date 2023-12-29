import Container from '@mui/material/Container';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';

function Home() {
  return (
    <Container
      sx={{
        backgroundColor: 'secondary.main',
        display: 'flex',
        mt: 2,
        justifyContent: 'space-between',
        columnGap: 5
      }}
    >
      <MainContent />
      <SideBar />
    </Container>
  );
}

export default Home;
