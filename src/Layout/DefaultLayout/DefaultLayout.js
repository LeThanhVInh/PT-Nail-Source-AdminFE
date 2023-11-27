// import * as React from "react";
// import classNames from "classnames/bind";
// import styles from "./DefaultLayout.module.scss";
// import Box from "@mui/material/Box";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header/Header";

// const cx = classNames.bind(styles);

// function DefaultLayout({ children }) {
//   return (
//     <>
//       <Box sx={{ width: 1 }} className={cx("wrapper")}>
//         <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
//           <Box gridColumn="span 2" className={cx("container")}>
//             <Sidebar />
//           </Box>
//           <Box gridColumn="span 10" className={cx("content-layout")}>
//             <Header />
//             {children}
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default DefaultLayout;

import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

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

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
//   backgroundColor: "red",
//   display: "none",
//   height: "1px",
//   maxHeight: "1px",
// }));

function DefaultLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={cx("wrapper")}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "var(--primary-color)",
          borderRadius: "30px",
        }}
      >
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
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
            ...(open && {
              left: "-16px",
              zIndex: "9999",
              // transition: "all ease-in .1s",
            }),
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              transform: "translateX(15%)",
              // ...(open && { display: "none" }),
            }}
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
              // width: drawerWidth,
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
          open={open}
        >
          {/* <IconButton
            onClick={handleDrawerClose}
            sx={{
              position: "absolute",
              top: "30px",
              right: "0px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--white-color)",
              zIndex: 999,
            }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}

          <Sidebar />
        </Drawer>

        <Main
          open={open}
          sx={{
            backgroundColor: "var(--bg-white-color)",
            borderRadius: "30px",
            overflow: "auto",
          }}
        >
          <Header />
          {children}
        </Main>
      </Box>
    </div>
  );
}

export default DefaultLayout;
