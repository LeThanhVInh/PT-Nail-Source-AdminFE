import { useState } from "react";

import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import constants from "../../../providers/constants";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import classNames from "classnames/bind";
import styles from "../PointOfSale.module.scss";
const cx = classNames.bind(styles);

export default function ProductsPos(props) {
  const { newData, handleLearnMore, alignment } = props;
  const [productListColumnAmount, setProductListColumnAmount] = useState(4);

  return (
    <div className={cx("items-wrapper")}>
      <div className={cx("header-title-items")}>
        <h3>
          Products <KeyboardArrowRightIcon /> {alignment}
        </h3>
      </div>
      <div className={cx("items-body")}>
        {newData.map((menu, i) => (
          <Card
            key={i}
            className={cx("item-card")}
            onClick={() => handleLearnMore(menu)}
            sx={{
              maxHeight: {
                xs: "150px",
                md: "150px",
                lg: "300px",
                xl: "300px",
              },
              minHeight: "150px",
              height: "auto",
              display: {
                xs: "flex !important",
                md: "flex !important",
                lg: "block",
                xl: "block",
              },
              flexDirection: {
                xs: "row",
                md: "row",
                lg: "column",
                xl: "column",
              },
              width: {
                xs: `calc( (100% / 1) - 20px)`,
                md: `calc( (100% / 2) - 20px)`,
                lg: `calc( (100% / ${productListColumnAmount}) - 20px)`,
                xl: `calc( (100% / ${productListColumnAmount}) - 20px)`,
              },
            }}
          >
            <CardMedia
              component="img"
              alt={menu.name}
              image={menu.img}
              sx={{
                minHeight: "150px",
                width: {
                  xs: "40%",
                  md: "40%",
                  lg: "100%",
                  xl: "100%",
                },
                height: {
                  xs: "100%",
                  md: "100%",
                  lg: 150,
                  xl: 200,
                },
              }}
            />
            <Box component="div" sx={{ height: "auto" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  "&.MuiCardContent-root:last-child": {
                    padding: "10px 10px",
                  },
                }}
              >
                <Box component="div">
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ color: "var(--text-color)" }}
                  >
                    <b>{menu.name}</b>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                    sx={{ color: "var(--text-color)" }}
                  >
                    0 Available
                  </Typography>
                </Box>
                {constants.Spacer}
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    color: "var(--text-color)",
                  }}
                >
                  ${menu.price}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </div>
    </div>
  );
}
