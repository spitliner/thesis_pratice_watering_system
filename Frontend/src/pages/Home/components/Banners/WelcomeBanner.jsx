import Box from '@mui/material/Box';
import welcomeSVG from '../../../../assets/welcome.svg';
import Typography from '@mui/material/Typography';

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
      <Box sx={{ mx: 4 }}>
        <Typography
          sx={{ fontSize: '30px', fontWeight: 'bold', color: '#B56F3C' }}
        >
          Hello, Kate!
        </Typography>
        <Typography
          display="inline"
          sx={{ fontSize: '20px', fontWeight: '500', color: '#B56F3C' }}
        >
          Welcome Home! We are ready to{' '}
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
      <Box>
        <img height={227} src={welcomeSVG} />
      </Box>
    </Box>
  );
}

export default WelcomeBanner;
