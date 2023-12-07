import Container from '@mui/material/Container';
import AppBar from '../../components/AppBar/AppBar';
import Navigation from '../../components/Navigation/Navigation';
import Board from './components/Board';

function _id() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ backgroundColor: 'secondary.main', display: 'flex', mt: 2 }}
    >
      <Board />
    </Container>
  );
}

export default _id;
