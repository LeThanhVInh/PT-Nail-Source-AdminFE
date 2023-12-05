import { useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  Remove as RemoveIcon,
  Payments as PaymentsIcon,
  Payment as PaymentIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./PointOfSale.module.scss";
import HeaderPOS from "../../components/HeaderPOS";
import { ToggleButtonPayment } from "../../components/CustomMUI/ButtonCustom";
import ModalItem from "../../components/Modal/ModalItem/ModalItem";

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
    title: "Cafe",
  },
  {
    id: 3,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/4357/4357932.png",
    title: "Rice",
  },
  {
    id: 4,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/4357/4357932.png",
    title: "Tea",
  },
  {
    id: 5,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/4357/4357932.png",
    title: "Mocktail",
  },
  {
    id: 6,
    imgSrc: "https://cdn-icons-png.flaticon.com/512/4357/4357932.png",
    title: "Burger",
  },
];

const menuList = [
  {
    id: 6,
    name: "Cappuccino 2",
    categorize: "Cafe",
    price: 2.5,
    description:
      "A classic Italian coffee drink with equal parts espresso, steamed milk, and milk foam.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/1200px-Cappuccino_at_Sightglass_Coffee.jpg",
  },
  {
    id: 1,
    name: "Cappuccino",
    categorize: "Cafe",
    price: 2.5,
    description:
      "A classic Italian coffee drink with equal parts espresso, steamed milk, and milk foam.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/1200px-Cappuccino_at_Sightglass_Coffee.jpg",
  },
  {
    id: 2,
    name: "Fried Rice",
    categorize: "Rice",
    price: 7.99,
    description:
      "A flavorful stir-fried rice dish typically made with vegetables, meat, and soy sauce.",
    img: "https://www.seriouseats.com/thmb/BJjCEDw9OZe95hpZxmNcD3rJnHo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20230529-SEA-EggFriedRice-AmandaSuarez-hero-c8d95fbf69314b318bc279159f582882.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    categorize: "Tea",
    price: 1.99,
    description:
      "A refreshing beverage made from the leaves of the Camellia sinensis plant.",
    img: "https://www.vahdam.com/cdn/shop/files/Perfect_Cup_of_Green_Tea-1.webp?v=1692784065",
  },
  {
    id: 4,
    name: "Tropical Mocktail",
    categorize: "Mocktail",
    price: 4.5,
    description:
      "A non-alcoholic mixed drink with a combination of tropical fruit flavors.",
    img: "https://www.thespeckledpalate.com/wp-content/uploads/2015/03/The-Speckled-Palate-Sweet-Sunrise-Mocktail-Photo.jpg",
  },
  {
    id: 5,
    name: "Cheeseburger",
    categorize: "Burger",
    price: 6.99,
    description:
      "A delicious burger with a beef patty, melted cheese, lettuce, tomato, and condiments.",
    img: "https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg",
  },
];

function PointOfSale() {
  const modalRef = useRef();
  const [alignment, setAlignment] = useState("All");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [dataItem, setDataItem] = useState({});

  const [newData, setNewData] = useState([]);

  const handleChangePaymentMethod = (event, newAlignment) => {
    setPaymentMethod(newAlignment);
  };

  const dataSort = () => {
    let newData = [...menuList];

    if (alignment === "All") {
      setNewData([...menuList]);
    } else if (alignment) {
      let newDataSort = [...newData];
      const filteredArray = newDataSort.filter(
        (res) => res.categorize === alignment
      );
      setNewData(filteredArray);
    }
  }

  useEffect(() => {
    setNewData([...newData]);
    dataSort();
  }, [alignment]);

  const handleLearnMore = (item) => {
    setDataItem(item);
    openModal();
  };

  const openModal = () => {
    if (modalRef.current && modalRef.current.openModal) {
      modalRef.current.openModal();
    }
  }

  return (
    <>
      <div className={cx("wrapper")}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              xs={8}
              sx={{
                width: {
                  xs: "100%",
                  md: "100%",
                  lg: "calc(100% * 8 / var(--Grid-columns))",
                  xl: "calc(100% * 8 / var(--Grid-columns))",
                },
              }}
            >
              <HeaderPOS />
              <div className={cx("body")}>
                <div className={cx("categories-wrapper")}>
                  <div className={cx("header-title")}>
                    <h3>Categories</h3>
                  </div>

                  <div className={cx("categories-body")}>
                    <ToggleButtonGroup
                      color="primary"
                      value={alignment}
                      exclusive
                      onChange={(newAlignment) => setAlignment(newAlignment)}
                      aria-label="Platform"
                      sx={{
                        display: "flex",
                        overflow: "auto",
                      }}
                    >
                      {categoriesList.map((list) => (
                        <ToggleButton
                          value={list.title}
                          key={list.id}
                          sx={{
                            borderRadius: "10px !important",
                            boxShadow: "var(--box-shadow)",
                            margin: "10px 10px !important",
                            border:
                              "2px solid var(--grey-border-half) !important",
                            "&.Mui-selected, &.Mui-selected:hover": {
                              color: "var(--primary-color)",
                              backgroundColor: "var(--white-color)",
                              border:
                                "2px solid var(--primary-color) !important",
                            },
                          }}
                        >
                          <div className={cx("categories-list-item")}>
                            <img src={list.imgSrc} alt={list.title} />
                            <p>{list.title}</p>
                          </div>
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </div>
                </div>
                <div className={cx("items-wrapper")}>
                  <div className={cx("header-title")}>
                    <h3>Categories</h3>
                  </div>
                  <div className={cx("items-body")}>
                    {newData.map((menu) => (
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: {
                            xs: "row",
                            md: "row",
                            lg: "column",
                            xl: "column",
                          },
                          margin: "10px",

                          height: {
                            xs: 150,
                            md: 150,
                            lg: 265,
                            xl: 265,
                          },

                          width: {
                            xs: 400,
                            md: 350,
                            lg: "22%",
                            xl: "18%",
                          },
                        }}
                        key={menu.id}
                      >
                        <CardMedia
                          component="img"
                          alt={menu.name}
                          height="140"
                          image={menu.img}
                          sx={{
                            minHeight: "100px",
                            width: {
                              xs: "100px",
                              md: "150px",
                              lg: "100%",
                              xl: "100%",
                            },
                            height: {
                              xs: "100%",
                              md: "100%",
                              lg: "40%",
                              xl: "50%",
                            },
                          }}
                        />
                        <Box
                          component="div"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                          }}
                        >
                          <CardContent sx={{ height: "55%" }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {menu.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${menu.price}
                            </Typography>
                          </CardContent>
                          <CardActions sx={{ height: "40%" }}>
                            <Button size="small">Share</Button>
                            <Button
                              size="small"
                              onClick={() => handleLearnMore(menu)}
                            >
                              Learn More
                            </Button>
                          </CardActions>
                        </Box>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              xs={4}
              sx={{
                width: {
                  xs: "100%",
                  md: "100%",
                  lg: "calc(100% * 4 / var(--Grid-columns))",
                  xl: "calc(100% * 4 / var(--Grid-columns))",
                },
              }}
            >
              <div className={cx("aside")}>
                <div className={cx("aside-wrapper")}>
                  <div className={cx("header-title")}>
                    <h3>Detail Items</h3>
                  </div>
                  <div className={cx("body")}>
                    <div className={cx("cart")}>
                      {/* <div className={cx("cart-item")}> */}
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            minWidth: "100px",
                            width: {
                              xs: "15%",
                              md: "15%",
                              lg: "20%",
                              xl: "20%",
                            },

                            height: "100%",
                            borderRadius: "20px",
                          }}
                          image="https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg"
                          alt="Live from space album cover"
                        />

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                            padding: "0 20px",
                          }}
                        >
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="h5">
                              Name
                            </Typography>
                            <Typography component="div" variant="subtitle2">
                              Name
                            </Typography>
                          </CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
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
                              }}
                            >
                              <IconButton>
                                <RemoveIcon sx={{ height: 30, width: 30 }} />
                              </IconButton>
                              <Typography component="div" variant="h6">
                                6
                              </Typography>
                              <IconButton>
                                <AddIcon sx={{ height: 30, width: 30 }} />
                              </IconButton>
                            </Box>

                            <Box component="div">
                              <Typography component="div" variant="h6">
                                6 x $21
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                      <Divider sx={{ margin: "10px 0" }} />
                      {/* </div> */}
                    </div>
                    <div className={cx("total-payment")}>
                      <div className={cx("total")}>
                        <Box
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "10px 0",
                          }}
                        >
                          <Typography component="div" variant="subtitle1">
                            Item
                          </Typography>
                          <Typography
                            component="div"
                            variant="subtitle1"
                            sx={{ fontWeight: "700" }}
                          >
                            X (Items)
                          </Typography>
                        </Box>

                        <Box
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "10px 0",
                          }}
                        >
                          <Typography component="div" variant="subtitle1">
                            Subtotal
                          </Typography>
                          <Typography
                            component="div"
                            variant="subtitle1"
                            sx={{ fontWeight: "700" }}
                          >
                            $9999
                          </Typography>
                        </Box>

                        <Box
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "10px 0",
                          }}
                        >
                          <Typography component="div" variant="subtitle1">
                            Discount
                          </Typography>
                          <Typography
                            component="div"
                            variant="subtitle1"
                            sx={{ fontWeight: "700" }}
                          >
                            -$9999
                          </Typography>
                        </Box>
                        <Box
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "10px 0",
                          }}
                        >
                          <Typography component="div" variant="subtitle1">
                            Tax(15%)
                          </Typography>
                          <Typography
                            component="div"
                            variant="subtitle1"
                            sx={{ fontWeight: "700" }}
                          >
                            $99
                          </Typography>
                        </Box>
                        <Divider sx={{ margin: "10px 0" }} />
                        <Box
                          component="div"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "10px 0",
                          }}
                        >
                          <Typography component="div" variant="h5">
                            Total
                          </Typography>
                          <Typography
                            component="div"
                            variant="h5"
                            sx={{ fontWeight: "700" }}
                          >
                            $99
                          </Typography>
                        </Box>
                      </div>
                      {/* <Divider sx={{ margin: "10px 0" }} /> */}
                      <div className={cx("payment")}>
                        <div className={cx("header-title")}>
                          <h3>Payment Method</h3>
                        </div>
                        <div>
                          <ToggleButtonGroup
                            color="primary"
                            value={paymentMethod}
                            exclusive
                            onChange={handleChangePaymentMethod}
                            aria-label="Platform"
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                          >
                            <ToggleButtonPayment value="cash">
                              <PaymentsIcon
                                sx={{ width: "35px", height: "35px" }}
                              />

                              <Typography>Cash</Typography>
                            </ToggleButtonPayment>

                            <ToggleButtonPayment value="debit">
                              <PaymentIcon
                                sx={{ width: "35px", height: "35px" }}
                              />

                              <Typography>Debit</Typography>
                            </ToggleButtonPayment>

                            <ToggleButtonPayment value="qris">
                              <QrCodeScannerIcon
                                sx={{ width: "35px", height: "35px" }}
                              />
                              <Typography>QRIS</Typography>
                            </ToggleButtonPayment>
                          </ToggleButtonGroup>
                        </div>
                      </div>
                      <div className={cx("footer")}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            height: "50px",
                            backgroundColor: "var(--primary-color)",
                            ":hover": {
                              backgroundColor: "var(--primary-color)",
                            },
                          }}
                        >
                          Process Transaction
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <ModalItem ref={modalRef} dataItem={dataItem} />
    </>
  );
}

export default PointOfSale;
