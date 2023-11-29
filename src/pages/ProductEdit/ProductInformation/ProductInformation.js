import { useState } from "react";
import Select from "react-select";
import { styled } from "@mui/system";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import classNames from "classnames/bind";
import styles from "../ProductEdit.module.scss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../components/CustomMUI/Accordion";

const cx = classNames.bind(styles);

const categoryList = [
  {
    id: 1,
    value: "PC-Laptop",
    label: "Pê Cê & Láp Tóp",
  },
  {
    id: 2,
    value: "Electronic",
    label: "Ê Lếc Trô Níc",
  },
  {
    id: 3,
    value: "Fashion-Make-Up",
    label: "Phát sành & Mếch Úp",
  },
];

const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#f3f3f3",
    primary: "var(--primary-color)",
  },
});

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

function ProductInformation() {
  const [expanded, setExpanded] = useState("panel1");

  const [isClearable, setIsClearable] = useState(true);

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
              <p>Product Information</p>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-aside")}>
                <div className={cx("aside-text-info")}>
                  <strong>Product Name</strong>
                  <p>Required</p>
                </div>
                <div className={cx("aside-text-tip")}>
                  <p>
                    Include min. 40 characters to make it more attractive and
                    easy for buyers to find, consisting of product type, brand,
                    and information such as color, material, or type.
                  </p>
                </div>
              </div>

              <div className={cx("item-title-content-main")}>
                <TextFieldCustom
                  fullWidth
                  placeholder="Product Name"
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
                  <strong>Category</strong>
                  <p>Required</p>
                </div>
              </div>

              <div className={cx("item-title-content-main")}>
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <Select
                    isClearable={isClearable}
                    options={categoryList}
                    theme={theme}
                  />
                </FormControl>
              </div>
            </div>

            <div className={cx("item-title-content")}>
              <div className={cx("item-title-content-aside")}>
                <div className={cx("aside-text-info")}>
                  <strong>Subcategory</strong>
                  <p>Required</p>
                </div>
                <div className={cx("aside-text-tip")}>
                  <p>
                    You can add a new subcategory or choose from the existing
                    subcategory list.
                  </p>
                </div>
              </div>

              <div className={cx("item-title-content-main")}>
                <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                  <Select
                    isMulti
                    theme={theme}
                    isClearable={isClearable}
                    options={categoryList}
                  />
                </FormControl>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default ProductInformation;
