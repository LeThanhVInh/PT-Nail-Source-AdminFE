import { useState } from "react";
import Select from "react-select";
import { styled } from "@mui/system";

import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import classNames from "classnames/bind";
import styles from "../ProductEdit.module.scss";
const cx = classNames.bind(styles);

const categoryList = [
  {
    id: 1,
    value: "PC-Laptop",
    label: "PC & Laptop",
  },
  {
    id: 2,
    value: "Electronic",
    label: "Electronic",
  },
  {
    id: 3,
    value: "Fashion-Make-Up",
    label: "Fashion & Make Up",
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
  margin: "8px",

  "& label": {
    top: "-8px",
    color: "var(--grey-color)",
  },
  "& label.Mui-focused": {
    color: "var(--primary-color)",
    top: "-2px",
  },
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
  const [isClearable, setIsClearable] = useState(true);

  return (
    <div className={cx("content-items")}>
      <div className={cx("item")}>
        <div className={cx("item-title")}>
          <p>Product Information</p>
        </div>
        <Divider />

        <div className={cx("item-title-content")}>
          <div className={cx("item-title-content-aside")}>
            <div className={cx("aside-text-info")}>
              <strong>Product Name</strong>
              <p>Required</p>
            </div>
            <div className={cx("aside-text-tip")}>
              <p>
                Include min. 40 characters to make it more attractive and easy
                for buyers to find, consisting of product type, brand, and
                information such as color, material, or type.
              </p>
            </div>
          </div>

          <div className={cx("item-title-content-main")}>
            <TextFieldCustom
              fullWidth
              label="Product Name"
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
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
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
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
              <Select
                isMulti
                theme={theme}
                isClearable={isClearable}
                options={categoryList}
              />
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInformation;
