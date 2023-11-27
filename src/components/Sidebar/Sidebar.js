import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import classNames from "classnames/bind";
// import styles from "./Sidebar.module.scss";

import Box from "@mui/material/Box";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import HomeIcon from "@mui/icons-material/Home";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import config from "../../router/config";
import "./Sidebar.scss";

// const cx = classNames.bind(styles);

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
          mt: "26px",
        }}
      >
        <List
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ background: "transparent" }}
            >
              Nested List Items
            </ListSubheader>
          }
        >
          <div className="divider">
            <Divider />
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
                <ListItemIcon sx={{ color: "white" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  // sx={{ display: { xs: "none", md: "block" } }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to={config.routes.table}
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Table" />
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
              // "&:hover": {
              //   backgroundColor: "var(--white-color)",
              //   opacity: "0.9",
              // },
            }}
            // className={`category-list-parent ${isListParentActive}`}
            // className="category-list-parent"
          >
            <ListItemIcon sx={{ color: "white" }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              // sx={{ backgroundColor: "#2c2974" }}
              className={`category-list-parent ${isListParentActive}`}
            >
              <NavLink
                to="/4"
                className="category-list-item-child"
                onClick={() => setIsListChildActive(true)}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: "white" }}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
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
                    <ListItemIcon sx={{ color: "white" }}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred 2" />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            </List>
          </Collapse>

          <NavLink
            to="/6"
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink
            to="/7"
            className="category-list-item"
            onClick={() => setIsListChildActive(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                disableRipple
                disableTouchRipple
                sx={{ borderBottomLeftRadius: 999, borderTopLeftRadius: 999 }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
