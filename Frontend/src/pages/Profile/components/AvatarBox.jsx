import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  GetAvatarByUserId,
  UploadAvatarByUserId
} from '../../../common/firebaseService';
import { useEffect, useState } from 'react';
import useQueryProfile from '../hooks/useQueryProfile';
import { styled } from '@mui/material';

const Input = styled('input')({
  display: 'none'
});

function AvatarBox(props) {
  const { profile } = props;
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    handleGetAvatar();
  }, [profile]);

  const handleGetAvatar = async () => {
    const userId = profile?.id;
    const url = await GetAvatarByUserId(userId).catch(
      () =>
        'https://i.pinimg.com/736x/57/3f/f1/573ff1a3bea0c77246affaf18bb39b48.jpg'
    );
    setAvatarUrl(url);
  };

  const handleUpload = (e) => {
    const image = e.target.files[0];
    const url = URL.createObjectURL(image);
    UploadAvatarByUserId(profile?.id, image);
    setAvatarUrl(url);
  };

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
            src={avatarUrl}
          />
        </Box>
        <Box />
      </Box>
      {/* <Typography
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
      </Typography> */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box />
        <Box>
          <label htmlFor="avatar">
            <Button
              component="label"
              variant="contained"
              sx={{ width: '200px', fontSize: '15px', mb: 3 }}
            >
              Upload new avatar
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e)}
              />
            </Button>
          </label>
        </Box>
        <Box />
      </Box>
      {/* <Typography
        sx={{ fontSize: '12px', color: '#979797', textAlign: 'center', mb: 3 }}
      >
        {' '}
        I’m responsible for the Front-end tasks{' '}
      </Typography> */}
    </Box>
  );
}

export default AvatarBox;
