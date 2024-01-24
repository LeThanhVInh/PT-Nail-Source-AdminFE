import { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Divider,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  InputBase,
} from '@mui/material';
import {
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';

import SwitchMode from '../Switch/SwitchMode';

//#region const

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  // width: '60%',
  flexGrow: '1',
  '& .MuiBox-root': {
    maxWidth: '500px',
    minWidth: '140px',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: 'var(--btn-edit)',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'var(--btn-edit)',
  '& .MuiInputBase-input': {
    backgroundColor: 'var(--input-color)',
    borderRadius: '999px',
    padding: theme.spacing(1, 1, 1, 0),
    maxWidth: '50%',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '50ch',
    },
  },
}));
//#endregion

function HeaderPOS() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  ////////////////////Select
  const [openSelection, setOpenSelection] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  //#region function
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenSelection(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenSelection(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
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
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
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
  //#endregion

  return (
    <Box sx={{ paddingLeft: '15px', paddingRight: 0, height: 64 }}>
      <AppBar
        position="static"
        elevation={0}
        color="inherit"
        sx={{ backgroundColor: 'var(--bg-white-item)', borderRadius: '10px' }}
      >
        <Toolbar>
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

          <Search>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '10px',
                borderRadius: '30px',
                overflow: 'hidden',
                boxShadow: '0px 0px 5px var(--grey-shadow)',
                backgroundColor: 'var(--input-color)',
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                sx={{ width: '100%' }}
              />
            </Box>
          </Search>

          <Box sx={{ marginRight: '20px' }}>
            <SwitchMode />
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="split button"
              color="warning"
              onClick={() => setOpenSelection((prevOpen) => !prevOpen)}
            >
              <Button color="warning" onClick={() => { }}>
                {options[selectedIndex]}
              </Button>
              <Button
                size="small"
                color="warning"
                aria-controls={openSelection ? 'split-button-menu' : undefined}
                aria-expanded={openSelection ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={() => { }}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              open={openSelection}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              sx={{
                zIndex: 1,
              }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu" autoFocusItem>
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            disabled={index === 2}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Divider sx={{ paddingX: '20px' }} />
    </Box>
  );
}

export default HeaderPOS;
