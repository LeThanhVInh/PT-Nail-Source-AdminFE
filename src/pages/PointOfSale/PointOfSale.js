import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import classNames from "classnames/bind";
import styles from "./PointOfSale.module.scss";
import HeaderPOS from "../../components/HeaderPOS";
const cx = classNames.bind(styles);

function PointOfSale() {
  return (
    <div className={cx("wrapper")}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <HeaderPOS />
            <div className={cx("body")}></div>
          </Grid>
          <Grid xs={4}>xs=4</Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PointOfSale;
