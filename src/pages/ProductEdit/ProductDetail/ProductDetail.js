import { useState } from "react";
import { styled } from "@mui/system";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../components/CustomMUI/Accordion";

import classNames from "classnames/bind";
import styles from "../ProductEdit.module.scss";

const cx = classNames.bind(styles);

const FormControlLabelCustom = styled(FormControlLabel)({
  span: {
    "&.Mui-checked": {
      color: "var(--primary-color)",
    },
  },
});

const ButtonCustom = styled(Button)({
  height: "38px",
  textTransform: "capitalize",
  color: "var(--grey-color)",
  borderColor: "var(--grey-color)",
  "&:hover": {
    color: "var(--primary-color)",
    borderColor: "var(--primary-color)",
  },
});

function ProductDetail() {
  const [expanded, setExpanded] = useState("panel1");
  const [value, setValue] = useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
              <p>Product Detail</p>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-aside")}>
                <div className={cx("aside-text-info")}>
                  <strong>Condition</strong>
                  <p>Required</p>
                </div>
              </div>
              <div className={cx("item-title-content-main", "fl-start")}>
                <FormControl>
                  <RadioGroup
                    row
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabelCustom
                      value="new"
                      control={<Radio />}
                      label="New"
                    />
                    <FormControlLabelCustom
                      value="second"
                      control={<Radio />}
                      label="Second"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-aside")}>
                <div className={cx("aside-text-info")}>
                  <strong>Product Description</strong>
                  <p>Required</p>
                </div>
                <div className={cx("aside-text-tip")}>
                  <p>
                    Make sure the product description provides a detailed
                    explanation of your product so that it is easy to understand
                    and find your product.
                  </p>
                  <p>
                    It is recommended not to enter info on mobile numbers,
                    e-mails, etc. into the product description to protect your
                    personal data.
                  </p>
                </div>
              </div>
              <div className={cx("item-title-content-main")}>
                {/* <div style={{ width: "100%" }}> */}
                <SunEditor
                  defaultValue="<p>Content of the editor.</p>"
                  height="100%"
                />
                {/* </div> */}
              </div>
            </div>

            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-aside")}>
                <div className={cx("aside-text-info")}>
                  <strong>Product Video</strong>
                </div>
                <div className={cx("aside-text-tip")}>
                  <p>
                    Add a video so that buyers are more interested in your
                    product.Learn more.
                  </p>
                </div>
              </div>
              <div className={cx("item-title-content-main", "fl-start")}>
                <ButtonCustom variant="outlined" startIcon={<AddIcon />}>
                  Add Video URL
                </ButtonCustom>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default ProductDetail;