import Box from '@mui/material/Box'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import LogoutIcon from '@mui/icons-material/Logout'

function Navigation() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '118px',
      // height: '100%',
      height: '730px',
      alignItems: 'center',
      borderRadius: '25px',
      textAlign: 'center'
    }}>
      <Box><HomeRoundedIcon sx={{ fontSize: '35px', color: 'white', mt: 6, cursor: 'pointer' }}/></Box>
      <Box><CalendarMonthRoundedIcon sx={{ fontSize: '35px', color: 'white', mt: 8, cursor: 'pointer' }}/></Box>
      <Box><MonitorWeightRoundedIcon sx={{ fontSize: '35px', color: 'white', mt: 4, cursor: 'pointer' }}/></Box>
      <Box><CheckBoxRoundedIcon sx={{ fontSize: '35px', color: 'white', mt: 4, cursor: 'pointer' }}/></Box>
      <Box><LogoutIcon sx={{ fontSize: '35px', color: 'white', mt: 37, cursor: 'pointer' }}/></Box>
    </Box>
  )
}

export default Navigation