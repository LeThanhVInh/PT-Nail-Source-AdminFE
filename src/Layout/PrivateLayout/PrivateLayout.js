// import classNames from "classnames/bind";
// import styles from "./PrivateLayout.module.scss";
import Box from "@mui/material/Box";

// const cx = classNames.bind(styles);

function PrivateLayout({ children }) {
  return <Box sx={{ width: 1 }}>{children}</Box>;
}

export default PrivateLayout;
