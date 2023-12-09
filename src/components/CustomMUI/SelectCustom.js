import { Autocomplete } from "@mui/material";
import { styled } from "@mui/system";

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  backgroundColor: "var(--input-color)",
  color: "var(--text-color)",
  margin: "10px 0",
  borderRadius: "5px",

  [theme.breakpoints.down("md")]: {
    "& .MuiAutocomplete-inputRoot": {
      minHeight: "38px",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiAutocomplete-inputRoot": {
      height: "38px",
    },
  },
  [theme.breakpoints.up("lg")]: {
    "& .MuiAutocomplete-inputRoot": {
      height: "38px",
    },
  },

  svg: {
    color: "var(--text-color)",
  },

  "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
    color: "var(--text-color)",
  },

  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    transform: "translate(12px, 8px) scale(1);",
    color: "var(--text-color)",
  },

  "&.Mui-focused .MuiInputLabel-outlined": {
    color: "var(--text-color)",
  },

  "& .MuiAutocomplete-inputRoot": {
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      padding: "0 0 0 6px",
      color: "var(--text-color)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      color: "var(--text-color)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      color: "var(--text-color)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--grey-border-input)",
      color: "var(--text-color)",
    },
  },

  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "var(--grey-border-input)",
    },
  },

  "& .MuiChip-root": {
    color: "var(--text-color)",
    svg: {
      color: "var(--text-color)",
    },
  },

  "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
    "&.Mui-focused": {
      color: "var(--text-color)",
      backgroundColor: "var(--primary-light)",
    },

    '&[aria-selected="true"]': {
      color: "var(--white-color)",
      backgroundColor: "var(--primary-color)",
      "&.Mui-focused": {
        color: "var(--white-color)",
        backgroundColor: "var(--primary-color)",
      },
      "&:hover": {
        color: "var(--white-color)",
        backgroundColor: "var(--primary-color)",
      },
    },
  },
}));
