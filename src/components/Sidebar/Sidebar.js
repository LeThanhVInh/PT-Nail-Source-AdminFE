import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

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

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import * as MuiIcon from '@mui/icons-material';

import { useSelector } from 'react-redux';

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
  let initialState = {};
  const [open, setOpen] = useState(initialState);
  const [isListChildActive, setIsListChildActive] = useState(false);
  const [isListParentActive, setIsListParentActive] = useState('');

  const [route, setRoute] = useState([]);
  const userData = useSelector((state) => state.userSetting.authUserData);
  let renderMenu = {};

  useEffect(() => {
    if (userData) {
      const checkRoute = userData?.AllowedScreens;
      setRoute(checkRoute);
    }
  }, []);

  useEffect(() => {
    if (isListChildActive === true) {
      setIsListParentActive('active');
    } else {
      setIsListParentActive('');
    }
  }, [isListChildActive]);

  const handleClick = (itemName) => {
    setOpen((o) => ({ ...initialState, [itemName]: !o[itemName] }));
  };

  if (route) {
    renderMenu = route
      .filter((item) => item.ScreenCategoryName !== 'Hidden' && item.ScreenCategoryName !== 'Separation') // loại bỏ các đối tượng có ScreenCategoryName là 'Hidden'
      .reduce((acc, cur) => {
        let found = acc.find((item) => item.name === cur.ScreenCategoryName);

        if (found) {
          found.subMenu.push(cur);
        } else {
          acc.push({
            name: cur.ScreenCategoryName,
            IconName: cur.ScreenCategoryIconName,
            subMenu: [cur],
          });
        }
        return acc;
      }, []);

    let separationItems = route.filter((item) => item.ScreenCategoryName === 'Separation');

    if (separationItems.length > 0 && renderMenu) {
      renderMenu = [...renderMenu, ...separationItems];
    }

    initialState = Object.fromEntries(renderMenu.map((i) => [i.name, false]));
  }

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
              sx={{ background: 'var(--primary-color)', color: 'var(--white-color)' }}
            >
              Logo
            </ListSubheader>
          }
        >
          <div className="divider">
            <Divider sx={{ borderColor: 'var(--divider-primary)' }} />
          </div>

          {/* https://codesandbox.io/p/devbox/react18-2-typescript-derived-nested-state-1mh49t?file=%2Fsrc%2FApp.tsx%3A60%2C13-70%2C28 */}

          {renderMenu.map((item) => {
            const IconHeader = MuiIcon[item.IconName ?? 'Store'];
            if (item.subMenu) {
              return (
                <div key={'sidebar ' + item.name}>
                  <ListItemButtonCustom
                    onClick={() => handleClick(item.name)}
                    disableRipple
                    disableTouchRipple
                    sx={{
                      color: 'var(--white-color)',
                      borderRadius: '999px',
                      padding: '8px 8px',
                    }}
                  >
                    <ListItemIconCustom>
                      <IconHeader sx={{ fontSize: '25px' }} />
                    </ListItemIconCustom>
                    <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '14px' }} />
                    {open[item.name] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButtonCustom>

                  <Collapse in={open[item.name]} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        backgroundColor: 'var(--primary-dark)',
                        borderRadius: '10px',
                      }}
                      className={`category-list-parent ${isListParentActive}`}
                    >
                      {item.subMenu.map((item, index) => {
                        const ChildIcon = MuiIcon[item.IconName];
                        return (
                          <div key={item.Id}>
                            <NavLink to={item.RouteLink} className="category-list-item-child">
                              <ListItem disablePadding>
                                <ListItemButtonCustom sx={{ pl: 4 }} disableRipple disableTouchRipple>
                                  <ListItemIconCustom>
                                    <ChildIcon />
                                  </ListItemIconCustom>
                                  <ListItemText primary={item.Name} />
                                </ListItemButtonCustom>
                              </ListItem>
                            </NavLink>
                          </div>
                        );
                      })}
                    </List>
                  </Collapse>
                </div>
              );
              // list items without a submenu
            } else {
              return (
                <>
                  <div key={'Separation' + item.Id}>
                    <NavLink to={item.RouteLink} className="category-list-item">
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
                            <IconHeader />
                          </ListItemIconCustom>
                          <ListItemText primary={item.Name} />
                        </ListItemButtonCustom>
                      </ListItem>
                    </NavLink>
                  </div>
                </>
              );
            }
          })}
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
