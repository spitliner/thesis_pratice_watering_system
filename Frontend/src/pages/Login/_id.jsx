import Container from '@mui/material/Container'
import Navigation from '../../components/Navigation/Navigation'
import Box from '@mui/material/Box'
import loginSVG from '../../assets/login.png'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'

function _id() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()

    setEmailError(false)
    setPasswordError(false)

    if (email == '') {
      setEmailError(true)
    }
    if (password == '') {
      setPasswordError(true)
    }

    if (email && password) {
      console.log(email, password);
    }
    if (!emailError && passwordError) {
      navigate("/");
    }
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: 'max-height', backgroundColor: 'secondary.main', px: 1, py: 1, display: 'flex' }}>
      {/* Navigation */}
      <Navigation />
      <Container maxWidth={false} sx={{ height: '100%', backgroundColor: 'secondary.main' }}>
        <Container disableGutters maxWidth={false} sx={{ display: 'flex' }}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            height: '670px',
            m: 4,
            borderRadius: '40px'
          }}>
            <Box sx={{
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
            }}>
            </Box>
            <Box sx={{
              width: '50%',
              mx: 5,
              my: 12.5,
              alignItems: 'center'
            }}>
              {/* Title */}
              <Box>
                <Typography sx={{ fontSize: '36px', fontWeight: 'bold', color: '#525252' }}>Login to your Account</Typography>
                <Typography sx={{ fontSize: '16px', color: '#525252' }}>Ready to nuture your garden</Typography>
              </Box>
              {/* Form */}
              <Box sx={{ mt: 5 }}>
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{ mb: 5 }}
                  />
                  <Button variant="contained" type="submit" fullWidth sx={{ height: '56px', fontSize: '18px', mb: 3 }}>Login</Button>

                </form>
              </Box>
              {/* Register */}
              <Box sx={{ my: 8, textAlign: 'center' }}>
                <Typography display={ 'inline'} sx={{ fontSize: '16px', color: '#828282' }}>Not Registered Yet? </Typography>
                <Typography display={ 'inline'} sx={{ fontSize: '16px', color: 'primary.main', textDecoration: "none"}} component={Link} to={'/register'}>Create an account</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Container>
    </Container>
  )
}

export default _id