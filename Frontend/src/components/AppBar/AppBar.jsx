import Box from '@mui/material/Box';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import DropdownMenu from './DropdownMenu';
import { Container } from '@mui/material';

function AppBar() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}
    >
      {/* Left */}
      <Box
        sx={{
          alignItems: 'center',
          gap: 0,
          display: { xs: 'none', md: 'flex' }
        }}
      >
        <TextField
          id="search"
          label="Search"
          type="search"
          size="small"
          sx={{
            backgroundColor: 'secondary.dark',
            width: 690,
            borderRadius: '10px'
          }}
          InputProps={{
            style: {
              borderRadius: '10px'
            }
          }}
        />
      </Box>
      {/* Right */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <SettingsOutlinedIcon />
        <Tooltip title="Notification">
          <Badge color="primary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <DropdownMenu />
      </Box>
    </Container>
  );
}

export default AppBar;
