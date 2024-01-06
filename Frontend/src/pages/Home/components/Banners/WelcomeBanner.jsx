import Box from '@mui/material/Box';
import welcomeSVG from '../../../../assets/welcome.svg';
import Typography from '@mui/material/Typography';
import welcomePNG from '../../../../assets/welcome.png';

function WelcomeBanner() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '227px',
        backgroundColor: '#CEF8AC',
        borderRadius: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box sx={{ px: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* <Lottie options={WelcomeIcon} height={150} width={250} /> */}
          <img src={welcomePNG} alt="welcome" height={150} width={250} />
        </Box>
        <Typography
          display="inline"
          sx={{ fontSize: '20px', fontWeight: '500', color: '#B56F3C' }}
        >
          We are ready to{' '}
        </Typography>
        <Typography
          display="inline"
          sx={{ fontSize: '20px', fontWeight: '500', color: '#5AC605' }}
        >
          GREEN
        </Typography>
        <Typography
          display="inline"
          sx={{ fontSize: '20px', fontWeight: '500', color: '#B56F3C' }}
        >
          {' '}
          your garden!
        </Typography>
      </Box>
      <Box mr={5}>
        <img height={200} src={welcomeSVG} />
      </Box>
    </Box>
  );
}

export default WelcomeBanner;
