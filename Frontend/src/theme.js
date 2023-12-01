import { createTheme } from '@mui/material/styles';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#7A40F2'
    },
    secondary: {
      main: '#F9F9F9',
      light: '#F5F5F5',
      dark: '#EDEEF4'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});

export default theme;
