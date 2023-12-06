import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const BoxSpaceBetween = styled(Box)(({ theme }) => ({
  component: "div",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
}));

export const TypographySmallBold = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  variant: "subtitle1",
  component: "div",
}));

export const TypographyMediumBold = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  component: "div",
  fontWeight: "600",
}));
