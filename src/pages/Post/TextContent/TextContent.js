import { useState } from "react";
import { styled } from "@mui/system";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
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
import styles from "./TextContent.module.scss";

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

function TextContent() {
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
              <p>Text Content</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-main")}>
                <SunEditor
                  defaultValue="<p>Content of the editor.</p>"
                  height="100%"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default TextContent;
