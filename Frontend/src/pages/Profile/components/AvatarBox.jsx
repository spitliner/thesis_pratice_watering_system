import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {
  GetAvatarByUserId,
  UploadAvatarByUserId
} from '../../../common/firebaseService';
import { useEffect, useState } from 'react';
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
        my: 5
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box />
        <Box>
          <Avatar
            sx={{ width: 150, height: 150, border: '3px solid #7A40F2', mb: 3 }}
            src={avatarUrl}
          />
        </Box>
        <Box />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box />
        <Box>
          <label htmlFor="avatar">
            <Button
              component="label"
              variant="contained"
              sx={{ width: '200px', fontSize: '15px', mb: 5 }}
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
    </Box>
  );
}

export default AvatarBox;
