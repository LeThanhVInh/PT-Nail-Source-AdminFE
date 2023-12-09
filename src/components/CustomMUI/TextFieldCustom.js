import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

export const TextFieldCustom = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
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

export const TextFieldNoneBorder = styled(TextField)({
  backgroundColor: "var(--input-color)",
  color: "var(--text-color)",
  input: {
    color: "var(--text-color)",

    padding: "0 14px",
    height: "46px",
  },
  borderRadius: "5px",
  boxShadow: "0 3px 20px #0000000b !important",
  "&.MuiTextField-root label": {
    color: "var(--text-color)",
    top: "-5px",
  },

  "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -5px) scale(0.8)",
    color: "var(--primary-check)",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--grey-color)",
    },
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
});
