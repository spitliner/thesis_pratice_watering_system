import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

function EditBox() {
  return (
    <Box sx={{
      width: '55%',
      alignItems: 'center',
      justifyContent: 'center',
      my: 8
    }}>
      <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>BASIC INFO</Typography>
          </Box>
          <Box>
            <Button variant="outlined" sx={{ marginRight: '10px', width: '70px' }}>
              CANCEL
            </Button>
            <Button variant="contained" sx={{ width: '70px' }}>
              SAVE
            </Button>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ my: 1 }}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '14px' }}> FIRST NAME </Typography>
            <TextField label="First name" variant="outlined" size="small" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '14px' }}> LAST NAME </Typography>
            <TextField label="Last name" variant="outlined" size="small" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '14px' }}> TITLE </Typography>
            <TextField label="Title" variant="outlined" size="small" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '14px' }}> EMAIL </Typography>
            <TextField label="Email" variant="outlined" size="small" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 1, mb: 3, fontWeight: 'bold' }}> ABOUT ME </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField sx={{ mt: 1 }} fullWidth placeholder="I’m responsible for the Front-end tasks" />
          </Grid>
        </Grid>
      </React.Fragment>
    </Box>
  )
}

export default EditBox