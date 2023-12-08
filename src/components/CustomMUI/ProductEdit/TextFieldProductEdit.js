import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const TextFieldProductEdit = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    borderColor: "1px solid yellow",
    backgroundColor: "var(--input-color)",
    "& .MuiOutlinedInput-input": {
      color: "var(--text-color)",
    },
    "& fieldset": {
      borderColor: "var(--grey-border)",
    },
    "&:hover fieldset": {
      borderColor: "var(--grey-border-input)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--grey-border-input)",
    },
  },
});
