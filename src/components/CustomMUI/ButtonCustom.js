import Button from "@mui/material/Button";
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
