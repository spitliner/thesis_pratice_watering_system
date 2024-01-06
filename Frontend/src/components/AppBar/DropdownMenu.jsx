import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useLogoutHook from '../../pages/Login/hooks/useMutateLogout';
import { GetAvatarByUserId } from '../../common/firebaseService';
import useQueryProfile from '../../pages/Profile/hooks/useQueryProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar as updateAvatar } from '../../pages/Profile/avatarSlice';

function DropdownMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = React.useState(
    'https://i.pinimg.com/736x/57/3f/f1/573ff1a3bea0c77246affaf18bb39b48.jpg'
  );
  const { profile, isSuccess } = useQueryProfile();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = useLogoutHook();
  const dispatch = useDispatch();
  const avatarUrl = useSelector((state) => state.avatar.url);
  useEffect(() => {
    async function getAvatar() {
      if (profile) {
        const avatar = await GetAvatarByUserId(profile?.id);
        setAvatar(avatar);
        dispatch(updateAvatar(avatar));
        console.log(avatar);
      }
    }
    getAvatar();
  }, [profile]);

  useEffect(() => {
    setAvatar(avatarUrl);
  }, [avatarUrl]);

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        <Avatar sx={{ width: 32, height: 32 }} src={avatar}></Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default DropdownMenu;
