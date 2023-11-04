import Box from '@mui/material/Box'
import Welcome from './Banners/WelcomeBanner'
import SensorInfo from './SensorInfo'

function MainContent() {
  return (
    <Box sx={{
      width: '630px',
      height: 'calc(100vh - 32px - 35px)',
      justifyContent: 'center',
      alignItems: 'center',
      mr: 3
    }}>
      <Welcome />
      <SensorInfo />
    </Box>
  )
}

export default MainContent