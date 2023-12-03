import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { NavLink } from "react-router-dom";
import config from "../../router/config";

import classNames from "classnames/bind";
import styles from "./PointOfSale.module.scss";
import HeaderPOS from "../../components/HeaderPOS";
const cx = classNames.bind(styles);

const categoriesList = [
  {
    id: 1,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/5787/5787100.png",
    title: "All",
  },
  {
    id: 2,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/4357/4357932.png",
    title: "Coffee",
  },
];

function PointOfSale() {
  return (
    <div className={cx("wrapper")}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <HeaderPOS />
            <div className={cx("body")}>
              <div className={cx("categories-wrapper")}>
                <div className={cx("header-title")}>
                  <h3>Categories</h3>
                </div>

                <div className={cx("categories-body")}>
                  {categoriesList.map((list) => (
                    <NavLink
                      className={(nav) =>
                        cx("categories-list-item", { active: nav.isActive })
                      }
                      key={list.id}
                    >
                      <img src={list.imgSrc} alt="1" />
                      <p>{list.title}</p>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
          <Grid xs={4}>xs=4</Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PointOfSale;
