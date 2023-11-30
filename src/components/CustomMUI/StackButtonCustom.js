import { Stack } from "@mui/material";
import { styled } from "@mui/system";

export const StackCustom = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
  },
}));
