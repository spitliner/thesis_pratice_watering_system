import Box from '@mui/material/Box';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import DropdownMenu from './DropdownMenu';

function AppBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '35px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2
      }}
    >
      {/* Left */}
      <Box
        sx={{
          alignItems: 'center',
          gap: 2,
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
            width: '630px',
            borderRadius: '15px'
          }}
          InputProps={{
            style: {
              borderRadius: '15px'
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
    </Box>
  );
}

export default AppBar;
