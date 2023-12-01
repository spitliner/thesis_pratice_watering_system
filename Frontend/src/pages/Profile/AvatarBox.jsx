import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function AvatarBox() {
  return (
    <Box
      sx={{
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        my: 15
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box />
        <Box>
          <Avatar
            sx={{ width: 125, height: 125, border: '3px solid #7A40F2', mb: 3 }}
            src="https://i.pinimg.com/736x/57/3f/f1/573ff1a3bea0c77246affaf18bb39b48.jpg"
          />
        </Box>
        <Box />
      </Box>
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: 500,
          color: 'black',
          textAlign: 'center'
        }}
      >
        {' '}
        Kate Kfhd{' '}
      </Typography>
      <Typography
        sx={{ fontSize: '15px', color: '#979797', textAlign: 'center', mb: 3 }}
      >
        {' '}
        Front-end{' '}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box />
        <Box>
          <Button
            variant="contained"
            sx={{ width: '200px', fontSize: '15px', mb: 3 }}
          >
            {' '}
            Upload new avatar{' '}
          </Button>
        </Box>
        <Box />
      </Box>
      <Typography
        sx={{ fontSize: '12px', color: '#979797', textAlign: 'center', mb: 3 }}
      >
        {' '}
        I’m responsible for the Front-end tasks{' '}
      </Typography>
    </Box>
  );
}

export default AvatarBox;
