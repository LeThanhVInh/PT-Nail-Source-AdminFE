import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

export const TextFieldCustom = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--grey-border)",
    },
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
});

export const TextFieldNoneBorder = styled(TextField)({
  input: {
    padding: "0 14px",
    height: "46px",
  },
  borderRadius: "5px",
  boxShadow: "0 3px 20px #0000000b !important",

  "&.MuiTextField-root label": {
    top: "-5px",
  },

  "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -5px) scale(0.8)",
    color: "var(--primary-color)",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
});
