import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

export const ToggleButtonCustom = styled(MuiToggleButton)(({ theme }) => ({
  border: "none",
  minWidth: "158px",
  height: "52px",
  textTransform: "capitalize",
  fontWeight: "600",
  fontSize: "16px",
  borderRadius: "0",
  flexWrap: "wrap",
  color: "var(--grey-color-text)",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--primary-check)",
    backgroundColor: "var(--white-color-outline)",
  },
  "&.Mui-selected:first-of-type, &.Mui-selected:first-of-type:hover": {
    borderRadius: "10px 0 0 0",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
  },
}));
