import { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, TextField, Typography, Box, RadioGroup, Modal, Divider, Radio } from "@mui/material";
import { FormControl, FormControlLabel, FormGroup, Checkbox, Stack, Button, Autocomplete } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import classNames from "classnames/bind";
import styles from "./ModalEdit.module.scss";

const cx = classNames.bind(styles);

//#region const varibale
const top100Films = [
  { label: "Pê Cê & Láp Tóp" },
  { label: "Ê Lếc Trô Níc " },
  { label: "Phát sành & Mếch Úp" },
];

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
//#endregion

function ModalEdit(props) {
  const { handleClose, open } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState("male");

  const onSubmit = (data) => {
    console.log(data);
  };

  const modalSize = {
    mini: "360px",
    tiny: "540px",
    medium: "720px",
    large: "1080px",
    full: "auto",
  }

  const getSizeOfModal = (type) => {
    if (type === modalSize.mini && window.innerWidth < 360)
      return modalSize.full;
    else if (type === modalSize.tiny && window.innerWidth < 540)
      return modalSize.full;
    else if (type === modalSize.medium && window.innerWidth < 720)
      return modalSize.full;
    else if (type === modalSize.large && window.innerWidth < 1080)
      return modalSize.full;
    else
      return type.toString();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="animate__animated animate__zoomIn animate__fast"
    >
      <Box sx={{ overflow: "auto", height: "100%", width: getSizeOfModal(modalSize.mini), margin: 'auto' }}>
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
                          onChange={(event) => setValue(event.target.value)}
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
    </Modal>
  );
}

export default ModalEdit;
