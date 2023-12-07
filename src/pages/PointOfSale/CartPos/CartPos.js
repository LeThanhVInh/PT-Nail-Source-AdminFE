import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";

import {
  Remove as RemoveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "../PointOfSale.module.scss";
const cx = classNames.bind(styles);

export default function CartPos() {
  return (
    <div className={cx("cart")}>
      {[1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
        <Card key={i} className={cx("data-card")}>
          <CardMedia
            component="img"
            image="https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg"
            className={cx("image")}
            sx={{
              width: {
                xs: "15%",
                md: "15%",
                lg: "20%",
                xl: "20%",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <CardContent className={cx("content")}>
              <Typography component="div" variant="h6">
                <b>Cappuccino 2</b>
              </Typography>
              <Typography component="div" variant="subtitle2">
                Size XXL, không đường
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                pl: 1,
                pb: 1,
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  sx={{
                    margin: "0 5px",
                    color: "var(--primary-color)",
                    backgroundColor: "var(--white-color)",
                    borderRadius: "50%",
                    border: "1px solid var(--primary-color)",
                    padding: "2px",
                    ":hover": {
                      color: "var(--primary-color)",
                      backgroundColor: "var(--white-color)",
                    },
                  }}
                >
                  <DeleteIcon sx={{ height: 22, width: 22 }} />
                </IconButton>
                <Typography
                  component="div"
                  variant="subtitle1"
                  sx={{ margin: "5px" }}
                >
                  <strong>6</strong>
                </Typography>
                <IconButton
                  sx={{
                    margin: "0 5px",
                    color: "var(--white-color)",
                    backgroundColor: "var(--primary-color)",
                    border: "1px solid var(--primary-color)",
                    borderRadius: "50%",
                    padding: "2px",
                    ":hover": {
                      backgroundColor: "var(--primary-color)",
                    },
                  }}
                >
                  <AddIcon sx={{ height: 22, width: 22 }} />
                </IconButton>
              </Box>

              <Box component="div">
                <Typography component="div" variant="subtitle1">
                  6 x $21
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </div>
  );
}
