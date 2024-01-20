// import classNames from "classnames/bind";
// import styles from "./PrivateLayout.module.scss";
// const cx = classNames.bind(styles);

import Box from '@mui/material/Box';

function PrivateLayout({ children }) {
  return <Box sx={{ width: 1 }}>{children}</Box>;
}

export default PrivateLayout;
