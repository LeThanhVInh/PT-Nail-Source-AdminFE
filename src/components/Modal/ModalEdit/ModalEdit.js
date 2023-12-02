import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/system";
import RadioGroup from "@mui/material/RadioGroup";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { IconButton, TextField, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";

import classNames from "classnames/bind";
import styles from "./ModalEdit.module.scss";

const cx = classNames.bind(styles);

const ProSpan = styled("span")({
  display: "inline-block",
  height: "1em",
  width: "1em",
  verticalAlign: "middle",
  marginLeft: "0.3em",
  marginBottom: "0.08em",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(https://mui.com/static/x/pro.svg)",
});

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a href="https://mui.com/x/introduction/licensing/#pro-plan">
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

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

const top100Films = [
  { label: "Pê Cê & Láp Tóp" },
  { label: "Ê Lếc Trô Níc " },
  { label: "Phát sành & Mếch Úp" },
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

const TextFieldCustom = styled(TextField)({
  margin: "10px 0",
  input: {
    padding: "0 14px",
    height: "38px",
  },

  "&.MuiTextField-root label": {
    top: "-7px",
  },

  "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -5px) scale(0.8)",
    color: "var(--primary-color)",
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

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  margin: "10px 0",

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

  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    transform: "translate(12px, 8px) scale(1);",
  },

  "&.Mui-focused .MuiInputLabel-outlined": {
    color: "var(--primary-color)",
  },

  "& .MuiAutocomplete-inputRoot": {
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      padding: "0 0 0 6px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      // borderColor: "var(--primary-color)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      // borderColor: "red",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary-color)",
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

const TypographyCustom = styled(Typography)({
  // margin: "5px 0",
  // paddingTop: "10px",
});

const TypographyError = styled(Typography)({
  color: "red",
  fontSize: "14px",
  marginTop: "10px",
});

const FormControlLabelCustom = styled(FormControlLabel)({
  span: {
    "&.Mui-checked": {
      color: "var(--primary-color)",
    },
  },
});

const StackCustom = styled(Stack)(({ theme }) => ({
  marginTop: "10px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-evenly",
  },
  [theme.breakpoints.up("lg")]: {
    justifyContent: "flex-end",
  },
}));

const ButtonCustom = styled(Button)(({ theme }) => ({
  color: "var(--grey-color)",
  width: "208px",
  height: "46px",
  fontSize: "14px",
  textTransform: "capitalize",
  borderColor: "var(--gray-color)",
  marginBottom: "20px",
  ":hover": {
    borderColor: "var(--primary-color)",
  },
  [theme.breakpoints.down("md")]: {
    flexGrow: 1,
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    margin: "0 20px 20px 20px",
  },
  [theme.breakpoints.up("lg")]: {
    flexGrow: 0,
    margin: "0 0 0 20px",
  },
}));

const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
  margin: "10px 0",

  input: {
    padding: "7.5px 14px",
  },

  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    transform: "translate(12px, 8px) scale(1);",
  },

  "&.Mui-focused .MuiInputLabel-outlined": {
    color: "var(--primary-color)",
  },

  "& .MuiAutocomplete-inputRoot": {
    // height: "38px",
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      padding: "0 0 0 6px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      // borderColor: "var(--primary-color)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      // borderColor: "red",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary-color)",
    },
  },

  "& .Mui-focused": {
    color: "var(--primary-color)",
    fieldset: {
      "&.MuiOutlinedInput-notchedOutline, &.css-1d3z3hw-MuiOutlinedInput-notchedOutline":
      {
        borderColor: "var(--primary-color)",
      },
      ":hover": {
        borderColor: "var(--primary-color)",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "100%",
  bgcolor: "var(--bg-white-color)",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  zIndex: "1400",
  // overflow: "auto",
  // maxHeight: "100%",
};

function ModalEdit(props) {
  const { handleClose, open } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isClearable, setIsClearable] = useState(true);
  const [value, setValue] = useState("male");
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className="animate__animated animate__zoomIn animate__fast"
      >
        {/* <Box sx={style}> */}
        <Box sx={{ overflow: "auto", height: "100%" }}>
          <div className={cx("wrapper")}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={cx("add-new-container")}>
                <div className={cx("content-items")}>
                  <div className={cx("item")}>
                    <div className={cx("item-title")}>
                      <p>Modal Edit</p>
                      <IconButton
                        // disableElevation
                        // disableRipple
                        aria-label="Close"
                        sx={{
                          ":hover": {
                            color: "var(--primary-color)",
                          },
                        }}
                        onClick={handleClose}
                      >
                        <ClearIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                    <Divider sx={{ margin: "10px 0" }} />
                    <div className={cx("item-title-content")}>
                      <div className={cx("item-content")}>
                        <TextFieldCustom
                          fullWidth
                          label="Email"
                          {...register("email", {
                            required: true,
                            pattern: /\S+@\S+\.\S+/,
                          })}
                        />

                        {errors.email && errors.email.type === "required" && (
                          <TypographyError>Email is required</TypographyError>
                        )}

                        {errors.email && errors.email.type === "pattern" && (
                          <TypographyError>Enter a valid email</TypographyError>
                        )}
                      </div>

                      <div className={cx("item-content")}>
                        <TextFieldCustom
                          label="User name"
                          fullWidth
                          {...register("userName", {
                            required: true,
                          })}
                        />

                        {errors.userName &&
                          errors.userName.type === "required" && (
                            <TypographyError>
                              User name is required
                            </TypographyError>
                          )}
                      </div>

                      <div className={cx("item-content")}>
                        <TextFieldCustom
                          label="Password"
                          type="password"
                          fullWidth
                          {...register("passWord", {
                            required: true,
                            minLength: 4,
                          })}
                        />
                        <Box>
                          {errors.passWord &&
                            errors.passWord.type === "required" && (
                              <TypographyError>
                                Password is required
                              </TypographyError>
                            )}

                          {errors.passWord &&
                            errors.passWord.type === "minLength" && (
                              <TypographyError>
                                Minimum characters 4 required
                              </TypographyError>
                            )}
                        </Box>
                      </div>

                      <div className={cx("item-content")}>
                        <FormControl
                          sx={{ minWidth: 120 }}
                          size="small"
                          fullWidth
                        >
                          <StyledAutocomplete
                            disablePortal
                            options={top100Films}
                            renderInput={(params) => (
                              <TextField {...params} label="Select" fullWidth />
                            )}
                          />
                        </FormControl>
                      </div>

                      <div className={cx("item-content")}>
                        <FormControl
                          sx={{ minWidth: 120 }}
                          size="small"
                          fullWidth
                        >
                          <StyledAutocomplete
                            disablePortal
                            multiple
                            filterSelectedOptions
                            options={top100Films}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Multi Select"
                                fullWidth
                              />
                            )}
                            size="small"
                          />

                          {/* <Select
                            isMulti
                            theme={theme}
                            isClearable={isClearable}
                            options={categoryList}
                          /> */}
                        </FormControl>
                      </div>

                      <div className={cx("item-content")}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePickerCustom
                            label="Date Picker"
                            className={cx("date-time-picker")}
                          />
                        </LocalizationProvider>
                      </div>

                      <div className={cx("item-content")}>
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
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabelCustom
                              value="female"
                              control={<Radio />}
                              label="Female"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>

                      <div className={cx("item-content")}>
                        <FormGroup>
                          <TypographyCustom>Check Box</TypographyCustom>

                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                size="small"
                                sx={{
                                  color: "var(--primary-color)",
                                  "&.Mui-checked": {
                                    color: "var(--primary-color)",
                                  },
                                }}
                              />
                            }
                            label={
                              <span style={{ fontSize: "14px" }}>
                                {"Remember me"}
                              </span>
                            }
                            fontSize="14px"
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <Divider sx={{ m: "10px 0" }} />

                    <div className={cx("add-new-footer")}>
                      <StackCustom direction="row">
                        <ButtonCustom variant="outlined" onClick={handleClose}>
                          Cancel
                        </ButtonCustom>
                        <ButtonCustom
                          // disableElevation
                          disableRipple
                          variant="outlined"
                        >
                          Save & Add New
                        </ButtonCustom>
                        <ButtonCustom
                          // disableElevation
                          disableRipple
                          type="submit"
                          variant="contained"
                          sx={{
                            backgroundColor: "var(--primary-color)",
                            color: "var(--white-color)",
                            ":hover": {
                              backgroundColor: "var(--primary-color)",
                            },
                          }}
                        >
                          Save
                        </ButtonCustom>
                      </StackCustom>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Box>
        {/* </Box> */}
      </Modal>
    </div>
  );
}

export default ModalEdit;
