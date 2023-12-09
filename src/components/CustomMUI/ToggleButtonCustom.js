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
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--primary-color)",
    backgroundColor: "var(--white-color)",
  },
  "&.Mui-selected:first-child, &.Mui-selected:first-child:hover": {
    borderRadius: "10px 0 0 0",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
  },
}));
