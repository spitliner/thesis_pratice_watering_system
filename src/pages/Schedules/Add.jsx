import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

function Add() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission logic here
  }

  return (
    <Box
      sx={{
        backgroundColor: '#c8e6c9',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#fff', // Màu nền form
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label="Device"
              variant="outlined"
              fullWidth
              select
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }} // Shrink label to top
            >
              <MenuItem value="DV01">DV01</MenuItem>
              <MenuItem value="DV02">DV02</MenuItem>
              <MenuItem value="DV03">DV03</MenuItem>
              <MenuItem value="DV04">DV04</MenuItem>
              <MenuItem value="DV05">DV05</MenuItem>
            </TextField>

            <TextField
              type="datetime-local"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Client"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Amount of Water"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#aed581',
                  width: '45%',
                  mt: 2
                }}
              >
                Add
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                sx={{
                  width: '45%',
                  mt: 2
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  )
}

export default Add
