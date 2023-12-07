import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useProfile from '../hooks/useMutateProfile';

function EditBox(props) {
  const { profile } = props;
  const { onSaveProfile } = useProfile();
  const [email, setEmail] = useState(profile.email);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [changePassStatus, setChangePassStatus] = useState(false)

  const handleSubmit = () => {
    onSaveProfile({ email: profile.email, password: currentPassword, newEmail: email, newPassword: newPassword })
  }

  return (
    <Box
      sx={{
        width: '55%',
        alignItems: 'center',
        justifyContent: 'center',
        my: 8
      }}
    >
      <React.Fragment>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
            alignItems: 'center'
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              ACCOUNT INFO
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color='success'
              sx={{ marginRight: '10px' }}
              onClick={() => setChangePassStatus(!changePassStatus)}
            >
              {!changePassStatus ? 'CHANGE PASSWORD' : 'CHANGE EMAIL'}
            </Button>
            <Button variant="contained" sx={{ width: '70px' }} onClick={handleSubmit}>
              SAVE
            </Button>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ my: 1 }}>
          {!changePassStatus && <Grid item xs={12}>
            <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '14px' }}>
              NEW EMAIL
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>}
          <Grid item xs={12}>
            <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '14px' }}>
              {changePassStatus ? 'CURRENT PASSWORD' : 'PASSWORD'}
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={currentPassword}
              type='password'
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Grid>
          {changePassStatus && <Grid item xs={12}>
            <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '14px' }}>
              NEW PASSWORD
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={newPassword}
              type='password'
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>}
        </Grid>
      </React.Fragment>
    </Box>
  );
}

export default EditBox;
