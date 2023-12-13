import { Container, Typography } from '@mui/material';
import AppBar from '../../components/AppBar/AppBar';
import Navigation from '../../components/Navigation/Navigation';
import Board from './components/Board';

function _id() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight={700}>
        SCHEDULE
      </Typography>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ backgroundColor: 'secondary.main', display: 'flex' }}
      >
        <Board />
      </Container>
    </Container>
  );
}

export default _id;
