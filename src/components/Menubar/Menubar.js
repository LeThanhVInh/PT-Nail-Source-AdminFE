import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core";
import "./Menubar.scss";
import config from "../../router/config";

// import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "black" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <div className="sidebar-sort-by-category">
            <h3>
              <i className="fa-solid fa-filter"></i>&nbsp;Sort by Category
            </h3>
          </div>

          <NavLink to="/3" className="category-list-item">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>
                  <h4>
                    <i className="fa-solid fa-caret-right arrow-icon"></i>
                    sdsd
                  </h4>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink to="/2" className="category-list-item">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>
                  <h4>
                    <i className="fa-solid fa-caret-right arrow-icon"></i>
                    sdsd
                  </h4>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </nav>
    </Box>
  );
}

export default Sidebar;
