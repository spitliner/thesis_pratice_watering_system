import { Box, Button } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import useLogoutHook from '../../pages/Login/hooks/useMutateLogout';
import { useEffect, useState } from 'react';

const tabList = [
  {
    name: 'home',
    icon: <HomeRoundedIcon sx={{ fontSize: '35px' }} />
  },
  {
    name: 'device',
    icon: <MonitorWeightRoundedIcon sx={{ fontSize: '35px' }} />
  },
  {
    name: 'schedules',
    icon: <CalendarMonthRoundedIcon sx={{ fontSize: '35px' }} />
  },
  {
    name: 'report',
    icon: <CheckBoxRoundedIcon sx={{ fontSize: '35px' }} />
  }
];

function Navigation() {
  const Logout = useLogoutHook();
  const [selectedTab, setSelectedTab] = useState('');
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const selectedTabStyle = (tabName) => {
    return {
      height: 70,
      borderRadius: 10,
      bgcolor: selectedTab === tabName ? '#E0F4FF' : 'primary.main',
      color: selectedTab === tabName ? 'primary.main' : 'white',
      '&:hover': {
        bgcolor: '#96EFFF'
      }
    };
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/') {
      setSelectedTab('home');
    } else {
      const site = pathname.substring(pathname.lastIndexOf('/') + 1);
      setSelectedTab(site);
    }
  }, [window.location.pathname]);

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
        justifyContent: 'space-between',
        py: 4
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 4
        }}
      >
        {tabList.map((tab) => (
          <Button
            key={tab.name}
            component={Link}
            to={tab.name === 'home' ? '/' : `/${tab.name}`}
            sx={selectedTabStyle(tab.name)}
            onClick={() => {
              handleTabClick(tab.name);
            }}
          >
            {tab.icon}
          </Button>
        ))}
      </Box>
      <Button onClick={Logout} sx={selectedTabStyle('logout')}>
        <LogoutIcon
          sx={{ fontSize: '35px', color: 'white', cursor: 'pointer' }}
        />
      </Button>
    </Box>
  );
}

export default Navigation;
