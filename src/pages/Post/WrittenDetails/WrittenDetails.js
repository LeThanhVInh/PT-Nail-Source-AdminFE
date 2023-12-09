import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Box from "@mui/material/Box";
// import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/system";
import RadioGroup from "@mui/material/RadioGroup";

// import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import classNames from "classnames/bind";
import styles from "./WrittenDetails.module.scss";
import { StyledAutocomplete } from "../../../components/CustomMUI/SelectCustom";
import { TextFieldProductEdit } from "../../../components/CustomMUI/ProductEdit/TextFieldProductEdit";

const cx = classNames.bind(styles);

//Dummy Data
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

//Custom
const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#f3f3f3",
    primary: "var(--primary-color)",
  },
});

const TypographyCustom = styled(Typography)({
  color: "var(--text-color)",
  margin: "10px 0",
  fontSize: "14px",
});

const FormControlLabelCustom = styled(FormControlLabel)({
  color: "var(--text-color)",

  span: {
    "&.Mui-checked": {
      color: "var(--primary-check)",
    },
  },
});

const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
  backgroundColor: "var(--input-color)",
  margin: "10px 0",
  borderRadius: "5px",
  color: "var(--text-color)",

  svg: {
    color: "var(--text-color)",
  },
  span: {
    color: "var(--text-color)",
  },
  label: {
    color: "var(--text-color)",
  },
  input: {
    padding: "7.5px 14px",
  },
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    transform: "translate(12px, 8px) scale(1);",
  },

  "&.Mui-focused .MuiInputLabel-outlined": {
    color: "var(--text-color)",
  },

  "& .MuiInputBase-input": {
    color: "var(--text-color)",
    input: {
      color: "var(--text-color)",
    },
  },

  "& .MuiInputBase-root": {
    "&:hover fieldset": {
      borderColor: "var(--grey-border-input)",
    },
  },

  "& .MuiAutocomplete-inputRoot": {
    color: "var(--text-color)",
    // height: "38px",
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      padding: "0 0 0 6px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--grey-color-input)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--grey-color-input)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--grey-border-input)",
    },
  },

  "& .Mui-focused": {
    color: "var(--text-color)",
    fieldset: {
      "&.MuiOutlinedInput-notchedOutline, &.css-1d3z3hw-MuiOutlinedInput-notchedOutline":
        {
          borderColor: "var(--grey-border-input)",
        },
      ":hover": {
        borderColor: "var(--grey-border-input)",
      },
    },
  },
  "&.MuiPickersFadeTransitionGroup-root": {
    backgroundColor: "#209214 !important",

    "&.MuiButtonBase-root-MuiPickersDay-root, &.Mui-selected": {
      backgroundColor: "#209214 !important",
    },
  },
}));

function WrittenDetails(props) {
  const {
    handleSubmit,
    formState: {},
  } = useForm();

  const [isClearable, setIsClearable] = useState(true);
  const [value, setValue] = useState("male");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Box sx={{ overflow: "auto", height: "100%" }}>
        <div className={cx("wrapper")}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className={cx("add-new-container")}>
              <div className={cx("content-items")}>
                <div className={cx("item")}>
                  <div className={cx("item-title-content")}>
                    <Box>
                      <TypographyCustom>Written By</TypographyCustom>
                      <FormControl
                        sx={{ minWidth: 120 }}
                        size="small"
                        fullWidth
                      >
                        <StyledAutocomplete
                          disablePortal
                          options={categoryList}
                          renderInput={(params) => (
                            <TextFieldProductEdit
                              {...params}
                              placeholder="Written By"
                              fullWidth
                            />
                          )}
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <TypographyCustom>Post Date</TypographyCustom>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePickerCustom className={cx("date-time-picker")} />
                      </LocalizationProvider>
                    </Box>

                    <Box>
                      <TypographyCustom>Categories</TypographyCustom>
                      <FormControl
                        sx={{ minWidth: 120 }}
                        size="small"
                        fullWidth
                      >
                        <StyledAutocomplete
                          disablePortal
                          options={categoryList}
                          renderInput={(params) => (
                            <TextFieldProductEdit
                              {...params}
                              placeholder="Categories"
                              fullWidth
                            />
                          )}
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <TypographyCustom>Tags</TypographyCustom>
                      <FormControl
                        sx={{ minWidth: 120 }}
                        size="small"
                        fullWidth
                      >
                        <StyledAutocomplete
                          disablePortal
                          multiple
                          filterSelectedOptions
                          options={categoryList}
                          renderInput={(params) => (
                            <TextFieldProductEdit
                              {...params}
                              placeholder="Tags"
                              fullWidth
                            />
                          )}
                          size="small"
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl>
                        <TypographyCustom>Radio</TypographyCustom>

                        <RadioGroup
                          row
                          name="controlled-radio-buttons-group"
                          value={value}
                          onChange={handleChange}
                        >
                          <FormControlLabelCustom
                            value="male"
                            control={
                              <Radio sx={{ color: "var(--primary-check)" }} />
                            }
                            label="Male"
                          />
                          <FormControlLabelCustom
                            value="female"
                            control={
                              <Radio sx={{ color: "var(--primary-check)" }} />
                            }
                            label="Female"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>

                    <Box>
                      <FormGroup>
                        <TypographyCustom>Check Box</TypographyCustom>

                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              size="small"
                              sx={{
                                color: "var(--primary-check)",
                                "&.Mui-checked": {
                                  color: "var(--primary-check)",
                                },
                              }}
                            />
                          }
                          label={
                            <span
                              style={{
                                fontSize: "14px",
                                color: "var(--text-color)",
                              }}
                            >
                              {"Remember me"}
                            </span>
                          }
                          fontSize="14px"
                        />
                      </FormGroup>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </>
  );
}

export default WrittenDetails;
