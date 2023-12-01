import Box from '@mui/material/Box';
import schedulesSVG from '../../../assets/schedules.svg';
import Typography from '@mui/material/Typography';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

function SchedulesBanner() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100px',
        backgroundColor: '#8AEA8E',
        borderRadius: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          mx: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <CalendarTodayOutlinedIcon sx={{ color: 'white' }} />
        <Typography sx={{ fontSize: '20px', color: 'white' }}>
          Schedules
        </Typography>
      </Box>
      <Box>
        <img height={100} src={schedulesSVG} />
      </Box>
    </Box>
  );
}

export default SchedulesBanner;
