import Button from "@mui/material/Button";
import { ToggleButton } from "@mui/material";
import { styled } from "@mui/system";

export const DefaultButton = styled(Button)(({ theme }) => ({
  color: "var(--btn-edit)",
  backgroundColor: "var(--white-color)",
  padding: "0 10px",
  fontSize: "14px",
  textTransform: "capitalize",
  boxShadow: "0 3px 20px #0000000b !important",
  height: "38px",
  minWidth: "80px",
  ":hover": {
    backgroundColor: "var(--white-color)",
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

export const ToggleButtonPayment = styled(ToggleButton)(({ theme }) => ({
  textTransform: "capitalize",
  height: "90px",
  width: "100px",
  borderRadius: "20px !important",
  boxShadow: "var(--box-shadow)",
  margin: "10px 10px !important",
  border: "1px solid var(--grey-border-half) !important",
  flexDirection: "column",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--primary-color)",
    backgroundColor: "var(--white-color)",
    border: "1px solid var(--primary-color) !important",
    svg: {
      color: "var(--primary-color)",
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
  border: "1px solid var(--grey-border-half) !important",
  flexDirection: "column",
  flexWrap: "wrap",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--primary-color)",
    backgroundColor: "var(--white-color)",
    border: "1px solid var(--primary-color) !important",
    svg: {
      color: "var(--primary-color)",
    },
  },
}));
