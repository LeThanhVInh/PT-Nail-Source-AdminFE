import { useState } from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../components/CustomMUI/Accordion";

import classNames from "classnames/bind";
import styles from "../ProductEdit.module.scss";

const cx = classNames.bind(styles);

//Custom
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiTypography-root,& .MuiFormControlLabel-label": {
    span: {
      color: "red",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "var(--primary-color)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? "" : "",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
  },
}));

const TextFieldCustom = styled(TextField)({
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

function ProductManagement() {
  //Accordion
  const [expanded, setExpanded] = useState("panel1");

  const handleChangeExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={cx("content-items")}>
      <div className={cx("item")}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChangeExpanded("panel1")}
          sx={{ padding: 0, border: 0 }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{ backgroundColor: "var(--white-color)" }}
          >
            <div className={cx("item-title")}>
              <p>Product Management</p>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-aside")}>
                <div className={cx("aside-text-info")}>
                  <strong>Condition</strong>
                  <p>Required</p>
                </div>
                <div className={cx("aside-text-tip")}>
                  <p>
                    If the status is active, your product can be searched for by
                    potential buyers.
                  </p>
                </div>
              </div>
              <div className={cx("item-title-content-main", "fl-start")}>
                <FormGroup sx={{ marginLeft: "10px" }}>
                  <FormControlLabel
                    control={<IOSSwitch defaultChecked />}
                    label={
                      <Typography
                        style={{
                          marginLeft: "10px",
                          fontSize: "14px",
                          color: "var(--text-color)",
                        }}
                      >
                        Active
                      </Typography>
                    }
                  />
                </FormGroup>
              </div>
            </div>

            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-aside")}>
                <div className={cx("aside-text-info")}>
                  <strong>Product Stock</strong>
                  <p>Required</p>
                </div>
              </div>
              <div className={cx("item-title-content-main")}>
                <TextFieldCustom
                  fullWidth
                  placeholder="Input Product Stock"
                  id="fullWidth"
                  inputProps={{
                    style: {
                      padding: "7.5px 14px",
                    },
                  }}
                />
              </div>
            </div>

            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-aside")}>
                <div className={cx("aside-text-info")}>
                  <strong>SKU (Stock Keeping Unit)</strong>
                </div>
                <div className={cx("aside-text-tip")}>
                  <p>
                    Add a video so that buyers are more interested in your
                    product.Learn more.
                  </p>
                </div>
              </div>
              <div className={cx("item-title-content-main")}>
                <TextFieldCustom
                  fullWidth
                  placeholder="Input SKU"
                  id="fullWidth"
                  inputProps={{
                    style: {
                      padding: "7.5px 14px",
                    },
                  }}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default ProductManagement;
