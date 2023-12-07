import { useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import {
  Card,
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
  Delete as DeleteIcon,
} from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./PointOfSale.module.scss";
import HeaderPOS from "../../components/HeaderPOS";
import { ToggleButtonPayment } from "../../components/CustomMUI/ButtonCustom";
import ModalItem from "../../components/Modal/ModalItem/ModalItem";
import {
  BoxSpaceBetween,
  TypographyMediumBold,
  TypographySmallBold,
} from "../../components/CustomMUI/PosMuiCustom/PosMuiCustom";

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
  const [productListColumnAmount, setProductListColumnAmount] = useState(4);
  const [newData, setNewData] = useState([]);

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
  };

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
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              xs={9}
              sx={{
                width: {
                  xs: "100%",
                  md: "100%",
                  lg: "calc(100% * 9 / var(--Grid-columns))",
                  xl: "calc(100% * 9 / var(--Grid-columns))",
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
                      exclusive
                      color="primary"
                      value={alignment}
                      className={cx("button-group")}
                      onChange={(event, newAlignment) =>
                        setAlignment(newAlignment)
                      }
                    >
                      {
                        categoriesList.map((item) => (
                          <ToggleButton
                            key={item.id}
                            value={item.title}
                            className={cx("button")}
                          >
                            <div className={cx("categories-list-item")}>
                              <img src={item.imgSrc} alt={item.title} />
                              <p>{item.title}</p>
                            </div>
                          </ToggleButton>
                        ))
                      }
                    </ToggleButtonGroup>
                  </div>
                </div>
                <div className={cx("items-wrapper")}>
                  <div className={cx("header-title-items")}>
                    <h3>Products</h3>
                  </div>
                  <div className={cx("items-body")}>
                    {
                      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((menu, i) => (
                        <Card
                          key={i}
                          className={cx("item-card")}
                          onClick={() => handleLearnMore(menuList[0])}
                          sx={{
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
                            height: "auto",
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
                            alt={menuList[0].name}
                            image={menuList[0].img}
                            sx={{
                              minHeight: "100px",
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
                          <Box component="div" sx={{ height: "auto" }} >
                            <CardContent
                              sx={{
                                height: "100%",
                                "&.MuiCardContent-root:last-child": {
                                  padding: "10px 10px",
                                },
                              }} >
                              <Box component="div">
                                <Typography gutterBottom variant="h6" component="div" >
                                  <b>{menuList[0].name}</b>
                                </Typography>

                                <Typography variant="body2" color="text.secondary" component="div" >
                                  0 Available
                                </Typography>
                              </Box>

                              <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }} >
                                ${menuList[0].price}
                              </Typography>
                            </CardContent>
                          </Box>
                        </Card>
                      ))
                    }
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              xs={3}
              sx={{
                width: {
                  xs: "100%",
                  md: "100%",
                  lg: "calc(100% * 3 / var(--Grid-columns))",
                  xl: "calc(100% * 3 / var(--Grid-columns))",
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
                    <div className={cx("total-payment")}>
                      <div className={cx("total")}>
                        <BoxSpaceBetween>
                          <Typography component="div" variant="subtitle2">Item</Typography>
                          <TypographySmallBold>X (Items)</TypographySmallBold>
                        </BoxSpaceBetween>

                        <BoxSpaceBetween>
                          <Typography component="div" variant="subtitle2">Subtotal</Typography>
                          <TypographySmallBold>$9999</TypographySmallBold>
                        </BoxSpaceBetween>

                        <BoxSpaceBetween>
                          <Typography component="div" variant="subtitle2">Discount</Typography>
                          <TypographySmallBold>-$9999</TypographySmallBold>
                        </BoxSpaceBetween>

                        <BoxSpaceBetween>
                          <Typography component="div" variant="subtitle2">Tax (15%)</Typography>
                          <TypographySmallBold>$99</TypographySmallBold>
                        </BoxSpaceBetween>

                        <Divider sx={{ margin: "10px 0" }} />

                        <BoxSpaceBetween>
                          <TypographyMediumBold>Total</TypographyMediumBold>
                          <TypographyMediumBold>$99</TypographyMediumBold>
                        </BoxSpaceBetween>
                      </div>

                      <div className={cx("payment")}>
                        <div className={cx("header-title-payment")}>
                          <TypographyMediumBold>Payment Method</TypographyMediumBold>
                        </div>
                        <div>
                          <ToggleButtonGroup
                            color="primary"
                            value={paymentMethod}
                            exclusive
                            onChange={(e, newAlignment) => setPaymentMethod(newAlignment)}
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                          >
                            <ToggleButtonPayment value="cash">
                              <PaymentsIcon sx={{ width: "30px", height: "30px" }} />
                              <Typography>Cash</Typography>
                            </ToggleButtonPayment>

                            <ToggleButtonPayment value="debit">
                              <PaymentIcon sx={{ width: "30px", height: "30px" }} />
                              <Typography>Debit</Typography>
                            </ToggleButtonPayment>

                            <ToggleButtonPayment value="qris">
                              <QrCodeScannerIcon sx={{ width: "30px", height: "30px" }} />
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
                            fontWeight: 600,
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
