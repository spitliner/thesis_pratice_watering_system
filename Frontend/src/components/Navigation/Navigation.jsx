import { Box, Button } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import useLogoutHook from '../../pages/Login/hooks/useMutateLogout';

function Navigation() {
  const Logout = useLogoutHook();
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        backgroundColor: 'primary.main',
        width: '118px',
        height: '720px',
        alignItems: 'center',
        borderRadius: '25px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Button component={Link} to="/">
          <HomeRoundedIcon
            sx={{ fontSize: '35px', color: 'white', mt: 6, cursor: 'pointer' }}
          />
        </Button>
        <Button component={Link} to="/schedules">
          <CalendarMonthRoundedIcon
            sx={{ fontSize: '35px', color: 'white', mt: 8, cursor: 'pointer' }}
          />
        </Button>
        <Button component={Link} to="/device">
          <MonitorWeightRoundedIcon
            sx={{ fontSize: '35px', color: 'white', mt: 4, cursor: 'pointer' }}
          />
        </Button>
        <Button component={Link} to="/report">
          <CheckBoxRoundedIcon
            sx={{ fontSize: '35px', color: 'white', mt: 4, cursor: 'pointer' }}
          />
        </Button>
      </Box>
      <Button onClick={Logout}>
        <LogoutIcon
          sx={{ fontSize: '35px', color: 'white', mb: 4, cursor: 'pointer' }}
        />
      </Button>
    </Box>
  );
}

export default Navigation;
