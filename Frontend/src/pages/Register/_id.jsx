import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import loginSVG from '../../assets/login.png';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import useCheckDuplicate from './hooks/useCheckDuplicate';

function _id() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { onCheckDuplicate } = useCheckDuplicate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (email == '') {
      setEmailError(true);
    }
    if (password == '') {
      setPasswordError(true);
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
    }

    if (!emailError && !passwordError && !confirmPasswordError) {
      onCheckDuplicate({
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });
    }
  };
  return (
    <Container
      maxWidth={false}
      sx={{ height: '100%', backgroundColor: 'secondary.main' }}
    >
      <Container disableGutters maxWidth={false} sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            height: '670px',
            m: 4,
            borderRadius: '40px'
          }}
        >
          <Box
            sx={{
              width: '50%',
              backgroundColor: '#CEF8AC',
              height: '650px',
              m: 1,
              borderRadius: '40px',
              alignItems: 'center',
              backgroundImage: `url(${loginSVG})`,
              backgroundPosition: 'center',
              backgroundSize: '450px 470px',
              backgroundRepeat: 'no-repeat'
            }}
          ></Box>
          <Box
            sx={{
              width: '50%',
              mx: 5,
              my: 12.5,
              alignItems: 'center'
            }}
          >
            {/* Title */}
            <Box>
              <Typography
                sx={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#525252'
                }}
              >
                Sign Up New Account
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#525252' }}>
                Ready to nuture your garden
              </Typography>
            </Box>
            {/* Form */}
            <Box sx={{ mt: 5 }}>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  type="email"
                  sx={{ mb: 3 }}
                  fullWidth
                  value={email}
                  error={emailError}
                />
                <TextField
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  type="password"
                  value={password}
                  error={passwordError}
                  fullWidth
                  sx={{ mb: 5 }}
                />
                <TextField
                  label="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  error={confirmPasswordError}
                  fullWidth
                  sx={{ mb: 5 }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ height: '56px', fontSize: '18px', mb: 3 }}
                >
                  Sign up
                </Button>
              </form>
            </Box>
            {/* Register */}
            <Box sx={{ my: 8, textAlign: 'center' }}>
              <Typography
                display={'inline'}
                sx={{ fontSize: '16px', color: '#828282' }}
              >
                Already have an account?{' '}
              </Typography>
              <Typography
                display={'inline'}
                sx={{
                  fontSize: '16px',
                  color: 'primary.main',
                  textDecoration: 'none'
                }}
                component={Link}
                to={'/login'}
              >
                Login
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default _id;
