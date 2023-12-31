import { Container, Box } from '@mui/material';
import Navigation from '../components/Navigation/Navigation';
import AppBar from '../components/AppBar/AppBar';
import { Outlet } from 'react-router-dom';

function BaseLayout({ children }) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: '100%',
        backgroundColor: 'secondary.main',
        px: 1,
        py: 1,
        display: 'flex'
      }}
    >
      <Navigation />
      <Container
        // maxWidth={true}
        disableGutters
        sx={{
          height: '100%',
          backgroundColor: 'secondary.main',
          py: 1
        }}
      >
        <AppBar />
        {children || <Outlet />}
      </Container>
    </Container>
  );
}

export default BaseLayout;
