import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";

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
} from "@mui/material";

import {
  MoveToInbox as InboxIcon,
  Drafts as DraftsIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@mui/icons-material";

import config from "../../router/config";
import "./Sidebar.scss";

const ListItemIconCustom = styled(ListItemIcon)({
  minWidth: "35px",
  color: "var(--white-color)",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

function Sidebar() {
  const [open, setOpen] = useState(true);

  const [isListChildActive, setIsListChildActive] = useState(false);
  const [isListParentActive, setIsListParentActive] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isListChildActive === true) {
      setIsListParentActive("active");
    } else {
      setIsListParentActive("");
    }
  }, [isListChildActive]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "var(--primary-color)",
          mt: "15px",
        }}
      >
        <List
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ background: "transparent", color: "var(--white-color)" }}
            >
              Logo
            </ListSubheader>
          }
        >
          <div className="divider">
            <Divider sx={{ borderColor: "var(--divider-primary)" }} />
          </div>

          <NavLink
            to={config.routes.home}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
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
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to={config.routes.products}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <DraftsIcon />
                </ListItemIconCustom>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to={config.routes.categories}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <DraftsIcon />
                </ListItemIconCustom>
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <ListItemButton
            onClick={handleClick}
            disableRipple
            disableTouchRipple
            sx={{
              color: "var(--white-color)",
              borderRadius: "999px",
            }}
          >
            <ListItemIconCustom>
              <InboxIcon />
            </ListItemIconCustom>
            <ListItemText primary="E-Commerce" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                backgroundColor: "var(--primary-dark)",
                borderRadius: "10px",
              }}
              className={`category-list-parent ${isListParentActive}`}
            >
              <NavLink
                to={config.routes.productsEdit}
                className="category-list-item-child"
                onClick={() => setIsListChildActive(true)}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIconCustom>
                      <StarBorder />
                    </ListItemIconCustom>
                    <ListItemText primary="Product Edit" />
                  </ListItemButton>
                </ListItem>
              </NavLink>

              <NavLink
                to="/5"
                className="category-list-item-child"
                onClick={() => setIsListChildActive(true)}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIconCustom>
                      <StarBorder />
                    </ListItemIconCustom>
                    <ListItemText primary="Starred 2" />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <NavLink
            to={config.routes.post}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <DescriptionIcon />
                </ListItemIconCustom>
                <ListItemText primary="Post" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to={config.routes.pos}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <DraftsIcon />
                </ListItemIconCustom>
                <ListItemText primary="Point Of Sale" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to={config.routes.lock}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIconCustom>
                  <DraftsIcon />
                </ListItemIconCustom>
                <ListItemText primary="Lock" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
