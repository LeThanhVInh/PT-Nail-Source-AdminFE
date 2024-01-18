import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { AppBar, Box, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Divider } from '@mui/material';
import {
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  ColorLens as ColorLensIcon,
} from '@mui/icons-material';

import SwitchMode from '../Switch/SwitchMode';
import { useDispatch, useSelector } from 'react-redux';
import { changeMainTheme } from '../../features/appSetting/appSettingSlice';

import useAuth from '../../custom-hooks/useAuth';
import config from '../../router/config';

const listThemeOverlay = [
  {
    id: 1,
    name: 'Purple',
    classTitle: 'light-theme',
    color: 'rgba(49, 46, 129, 1)',
  },
  {
    id: 2,
    name: 'Red',
    classTitle: 'red-theme',
    color: 'rgb(229, 57, 53)',
  },
  {
    id: 3,
    name: 'Green',
    classTitle: 'green-theme',
    color: 'rgb(67, 160, 71)',
  },
  {
    id: 4,
    name: 'Blue',
    classTitle: 'blue-theme',
    color: 'rgb(26, 115, 232)',
  },
  {
    id: 5,
    name: 'Orange',
    classTitle: 'orange-theme',
    color: 'rgb(251, 140, 0)',
  },
  {
    id: 6,
    name: 'Pink',
    classTitle: 'pink-theme',
    color: 'rgb(216, 27, 96)',
  },
];

function Header() {
  const dispatch = useDispatch();
  const mainTheme = useSelector((state) => state.appSetting.mainTheme);
  const switchMode = useSelector((state) => state.appSetting.isDarkModeOn);

  const [anchorEl, setAnchorEl] = useState(null);
  const [themeOverlay, setThemeOverlay] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { currentUser } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isMenuThemeOpen = Boolean(themeOverlay);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const bodyRoot = document.getElementById('body-root');

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeMenuOpen = (event) => {
    setThemeOverlay(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setThemeOverlay(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChangeTheme = (item) => {
    bodyRoot.className = '';
    bodyRoot.classList.add(`${item.classTitle}`);
    dispatch(changeMainTheme(`${item.classTitle}`));
  };

  useEffect(() => {
    if (switchMode === true) {
      bodyRoot.classList.remove(`${mainTheme}`);
    } else {
      bodyRoot.classList.add(`${mainTheme}`);
    }
  }, [mainTheme]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        bodyRoot.className = '';
        dispatch(changeMainTheme(`${listThemeOverlay[0].classTitle}`));
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const menuId = 'primary-search-account-menu';
  const menuThemeId = 'theme-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => navigate(config.routes.account)}>My Account</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const renderMenuTheme = (
    <Menu
      anchorEl={themeOverlay}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuThemeId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuThemeOpen}
      onClose={handleMenuClose}
    >
      {listThemeOverlay.map((item) => (
        <MenuItem onClick={() => handleChangeTheme(item)} sx={{ color: `${item.color}` }} key={('theme', `${item.id}`)}>
          <ColorLensIcon sx={{ color: `${item.color}`, marginRight: '5px' }} />
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem sx={{ justifyContent: 'center' }}>
        <SwitchMode />
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails">
          <Badge badgeContent={4} color="error">
            <MailIcon sx={{ color: 'var(--btn-edit)' }} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon sx={{ color: 'var(--btn-edit)' }} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleThemeMenuOpen}>
        <IconButton
          size="large"
          // edge="end"
          aria-label="theme change"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          <ColorLensIcon sx={{ color: 'var(--btn-primary-theme)' }} />
        </IconButton>
        <p>Theme</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, padding: '0 15px' }}>
      <AppBar
        position="static"
        elevation={0}
        color="inherit"
        sx={{ backgroundColor: 'var(--bg-white-item)', borderRadius: '10px' }}
      >
        <Toolbar sx={{}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: 'var(--text-color)',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            PT Nail Source
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            <SwitchMode />
            <IconButton size="large" aria-label="show 4 new mails">
              <Badge badgeContent={4} color="error">
                <MailIcon sx={{ color: 'var(--btn-edit)' }} />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon sx={{ color: 'var(--btn-edit)' }} />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="theme change"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleThemeMenuOpen}
              color="inherit"
              sx={{ marginRight: 0 }}
            >
              <ColorLensIcon sx={{ color: 'var(--btn-primary-theme)' }} />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ color: 'var(--btn-edit)' }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{ color: 'var(--btn-edit)' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMenuTheme}
      <Divider sx={{ paddingX: '20px' }} />
    </Box>
  );
}

export default Header;
