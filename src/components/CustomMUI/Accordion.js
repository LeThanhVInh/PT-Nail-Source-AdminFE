import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
} from "@mui/material";

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "var(--white-color-outline)",
  border: "1px solid var(--grey-border-item)",
  borderRadius: "10px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  ".MuiButtonBase-root": {
    borderRadius: "10px",
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "var(--white-color-outline) !important",
  flexDirection: "row-reverse",
  color: "var(--text-color)",

  svg: {
    color: "var(--text-color)",
  },

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    color: "var(--text-color)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    color: "var(--text-color)",
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  "&.MuiAccordionDetails-root": {
    borderTop: "1px solid var(--grey-border-item)",
  },
}));
