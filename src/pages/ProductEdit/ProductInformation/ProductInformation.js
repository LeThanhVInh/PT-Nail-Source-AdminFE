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
import { StyledAutocomplete } from "../../../components/CustomMUI/SelectCustom";
import { TextFieldProductEdit } from "../../../components/CustomMUI/ProductEdit/TextFieldProductEdit";

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

function ProductInformation() {
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
                <TextFieldProductEdit
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
                  <StyledAutocomplete
                    disablePortal
                    options={categoryList}
                    renderInput={(params) => (
                      <TextFieldProductEdit
                        {...params}
                        placeholder="Category"
                        fullWidth
                      />
                    )}
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
                  <StyledAutocomplete
                    disablePortal
                    multiple
                    filterSelectedOptions
                    options={categoryList}
                    renderInput={(params) => (
                      <TextFieldProductEdit
                        {...params}
                        placeholder="Subcategory"
                        fullWidth
                      />
                    )}
                    size="small"
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
