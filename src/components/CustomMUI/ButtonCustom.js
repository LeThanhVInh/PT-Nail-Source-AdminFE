import Button from "@mui/material/Button";
import { ToggleButton } from "@mui/material";
import { styled } from "@mui/system";

export const DefaultButton = styled(Button)(({ theme }) => ({
  color: "var(--btn-edit)",
  backgroundColor: "var(--bg-white-item)",
  padding: "0 10px",
  fontSize: "14px",
  textTransform: "capitalize",
  boxShadow: "0 3px 20px #0000000b !important",
  height: "38px",
  minWidth: "80px",
  ":hover": {
    backgroundColor: "var(--bg-white-item)",
  },
  [theme.breakpoints.down("md")]: {
    flexGrow: 1,
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    margin: "0 20px 20px 20px",
  },
  [theme.breakpoints.up("lg")]: {
    flexGrow: 0,
    margin: "0 0 0 20px",
  },
}));

//Categories
export const ToggleButtonCategories = styled(ToggleButton)(({ theme }) => ({
  textTransform: "capitalize",
  borderRadius: "10px !important",

  margin: "5px 10px 0 0 !important",
  border: "1px solid transparent !important",
  flexDirection: "column",
  color: "var(--grey)",
  ":hover": {
    backgroundColor: "var(--input-color) !important",
    color: "var(--primary-icon)",
    span: {
      border: "1px solid var(--grey-border) !important",
    },
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--white-color)",
    backgroundColor: "var(--btn-primary) !important",
    span: {
      border: "1px solid var(--primary-icon) !important",
    },
    svg: {
      color: "var(--white-color)",
    },
  },
}));

//Payment
export const ToggleButtonPayment = styled(ToggleButton)(({ theme }) => ({
  textTransform: "capitalize",
  height: "70px",
  width: "80px",
  borderRadius: "10px !important",
  margin: "5px 10px 0 0 !important",
  border: "1px solid red !important",
  flexDirection: "column",
  color: "var(--grey-color-text)",
  ":hover": {
    backgroundColor: "var(--input-color) !important",
    color: "var(--primary-icon)",
    span: {
      border: "1px solid var(--grey-border) !important",
    },
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--white-color)",
    backgroundColor: "var(--btn-primary) !important",
    span: {
      border: "1px solid var(--primary-icon) !important",
    },
    svg: {
      color: "var(--white-color)",
    },
  },
}));

//Modal Edit
export const ToggleButtonSelectSize = styled(ToggleButton)(({ theme }) => ({
  textTransform: "capitalize",
  height: "40px",
  width: "auto",
  borderRadius: "10px !important",
  boxShadow: "var(--box-shadow)",
  margin: "5px 10px !important",
  flexDirection: "column",
  flexWrap: "wrap",
  color: "var(--grey-color)",
  backgroundColor: "var(--bg-white-color)",
  border: "1px solid transparent !important",
  ":hover": {
    border: "1px solid var(--grey-border-half) !important",
    color: "var(--primary-icon)",
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--white-color)",
    backgroundColor: "var(--btn-primary)",
    border: "1px solid var(--grey-border-half) !important",
    svg: {
      color: "var(--primary-color)",
    },
  },
}));
