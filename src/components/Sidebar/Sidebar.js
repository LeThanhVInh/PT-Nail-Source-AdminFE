import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

import { privateRoutes, publicRoutes } from '../../router/routes';

import {
  Box,
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  ListItem,
} from '@mui/material';

import {
  MoveToInbox as InboxIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  PaymentOutlined as PaymentOutlinedIcon,
  Store as StoreIcon,
  Archive as ArchiveIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

import './Sidebar.scss';

const ListItemIconCustom = styled(ListItemIcon)({
  minWidth: '35px',
  color: 'var(--white-color)',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const ListItemButtonCustom = styled(ListItemButton)({
  ':hover': {
    backgroundColor: 'transparent',
  },
});

function Sidebar() {
  const [open, setOpen] = useState(true);

  const [isListChildActive, setIsListChildActive] = useState(false);
  const [isListParentActive, setIsListParentActive] = useState('');

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isListChildActive === true) {
      setIsListParentActive('active');
    } else {
      setIsListParentActive('');
    }
  }, [isListChildActive]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'var(--primary-color)',
          mt: '15px',
        }}
      >
        <List
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ background: 'transparent', color: 'var(--white-color)' }}
            >
              Logo
            </ListSubheader>
          }
        >
          <div className="divider">
            <Divider sx={{ borderColor: 'var(--divider-primary)' }} />
          </div>

          <NavLink
            to={publicRoutes.Home.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{
                  borderBottomLeftRadius: 999,
                  borderTopLeftRadius: 999,
                }}
              >
                <ListItemIconCustom>
                  <HomeIcon />
                </ListItemIconCustom>
                <ListItemText primary="Dashboard" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <NavLink
            to={publicRoutes.Products.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <ArchiveIcon />
                </ListItemIconCustom>
                <ListItemText primary="Products" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <NavLink
            to={publicRoutes.Stores.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <StoreIcon />
                </ListItemIconCustom>
                <ListItemText primary="Stores" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <NavLink
            to={publicRoutes.Categories.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <CategoryIcon />
                </ListItemIconCustom>
                <ListItemText primary="Categories" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <NavLink
            to={publicRoutes.POSDevices.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <CategoryIcon />
                </ListItemIconCustom>
                <ListItemText primary="POS Devices" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <NavLink
            to={publicRoutes.Discounts.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <CategoryIcon />
                </ListItemIconCustom>
                <ListItemText primary="Discounts" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <ListItemButtonCustom
            onClick={handleClick}
            disableRipple
            disableTouchRipple
            sx={{
              color: 'var(--white-color)',
              borderRadius: '999px',
            }}
          >
            <ListItemIconCustom>
              <InboxIcon />
            </ListItemIconCustom>
            <ListItemText primary="E-Commerce" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonCustom>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                backgroundColor: 'var(--primary-dark)',
                borderRadius: '10px',
              }}
              className={`category-list-parent ${isListParentActive}`}
            >
              <NavLink
                to={publicRoutes.ProductEdit.path}
                className="category-list-item-child"
                onClick={() => setIsListChildActive(true)}
              >
                <ListItem disablePadding>
                  <ListItemButtonCustom sx={{ pl: 4 }}>
                    <ListItemIconCustom>
                      <StarBorder />
                    </ListItemIconCustom>
                    <ListItemText primary="Product Edit" />
                  </ListItemButtonCustom>
                </ListItem>
              </NavLink>

              <NavLink to="/5" className="category-list-item-child" onClick={() => setIsListChildActive(true)}>
                <ListItem disablePadding>
                  <ListItemButtonCustom sx={{ pl: 4 }}>
                    <ListItemIconCustom>
                      <StarBorder />
                    </ListItemIconCustom>
                    <ListItemText primary="Starred 2" />
                  </ListItemButtonCustom>
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <NavLink
            to={publicRoutes.Post.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <DescriptionIcon />
                </ListItemIconCustom>
                <ListItemText primary="Post" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <NavLink
            to={publicRoutes.PointOfSale.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <PaymentOutlinedIcon />
                </ListItemIconCustom>
                <ListItemText primary="Point Of Sale" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <NavLink
            to={publicRoutes.Calendar.path}
            className="category-list-item"
            // onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <CalendarMonthOutlinedIcon />
                </ListItemIconCustom>
                <ListItemText primary="Calendar" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>

          <NavLink
            to={privateRoutes.Lock.path}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButtonCustom
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <LockOutlinedIcon />
                </ListItemIconCustom>
                <ListItemText primary="Lock" />
              </ListItemButtonCustom>
            </ListItem>
          </NavLink>
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
