import { styled } from "@mui/material/styles";
import { Box, Typography, ToggleButton } from "@mui/material";

export const BoxSpaceBetween = styled(Box)(({ theme }) => ({
  component: "div",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
}));

export const TypographySmallBold = styled(Typography)(({ theme }) => ({
  color: "var(--text-color)",
  fontWeight: "600",
  variant: "subtitle1",
  component: "div",
}));

export const TypographyMediumBold = styled(Typography)(({ theme }) => ({
  color: "var(--text-color)",
  fontSize: "20px",
  component: "div",
  fontWeight: "600",
}));

export const ToggleButtonMenu = styled(ToggleButton)(({ theme }) => ({
  borderRadius: "10px !important",
  boxShadow: "var(--box-shadow) !important",
  margin: "10px 10px !important",
  border: "2px solid var(--grey-border-half) !important",
  backgroundColor: "var(--bg-white-color) ",
  textTransform: "capitalize",
  transition: "all 0.2s linear",
  ":hover": {
    border: "2px solid var(--primary-color) !important",
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--white-color)",
    backgroundColor: "var(--primary-color)",
    border: "2px solid var(--primary-color)",
    svg: {
      color: "var(--primary-color)",
    },
    p: {
      color: "var(--white-color) !important",
    },
  },
}));
