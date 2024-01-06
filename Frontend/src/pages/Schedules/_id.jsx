import { Container, Typography } from '@mui/material';
import Board from './components/Board';
import Title from '../../components/Title';
import schedulesSVG from '../../assets/schedules.svg';

function _id() {
  return (
    <>
      <Title title="SCHEDULE" icon={schedulesSVG} />
      <Container sx={{ backgroundColor: 'secondary.main', display: 'flex' }}>
        <Board />
      </Container>
    </>
  );
}

export default _id;
