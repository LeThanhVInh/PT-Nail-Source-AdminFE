import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import "animate.css";
import config from "../../router/config";

const cx = classNames.bind(styles);

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: "var(--primary-color)",
    width: "50px",
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function DefaultLayout({ children }) {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const isShowBackdrop = false;

  return (
    <div className={cx("wrapper")}>
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 20px)",
          overflow: "hidden",
        }}
      >
        <CssBaseline />
        <AppBar
          position="absolute"
          open={isOpen}
          sx={{
            top: "47px",
            left: "0px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // ...(open && { display: "none" }),
            ...(isOpen && {
              left: "-16px",
              zIndex: "1300",
              // transition: "all ease-in .1s",
            }),
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen((prev) => !prev)}
            edge="start"
            sx={{ transform: "translateX(15%)" }}
          >
            <MenuIcon />
          </IconButton>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              backgroundColor: "var(--primary-color)",
              boxSizing: "border-box",
              overflow: "unset",
              paddingTop: "14px",
              paddingLeft: "20px",
              width: { xs: drawerWidth, tablet: "120px" },
              borderRight: 0,
            },
          }}
          variant="persistent"
          anchor="left"
          open={isOpen}
        >
          <Sidebar />
        </Drawer>

        <Main
          open={isOpen}
          sx={{
            backgroundColor: "var(--bg-white-color)",
            borderRadius: "30px",
            overflow: "auto",
            padding: "14px",
          }}
        >
          {config.routes.pos === location.pathname ? "" : <Header />}
          {children}
          {
            isShowBackdrop
              ? isOpen
                ? <div
                  onClick={() => setOpen((prev) => !prev)}
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "black",
                    opacity: 0.4,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 10,
                  }}></div>
                : <div></div>
              : <div></div>
          }
        </Main>
      </Box>
    </div >
  );
}

export default DefaultLayout;
