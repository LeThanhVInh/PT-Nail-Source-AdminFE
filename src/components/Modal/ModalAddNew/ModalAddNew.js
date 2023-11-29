import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import ClearIcon from "@mui/icons-material/Clear";
// import Grid from "@mui/material/Unstable_Grid2";
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
import { useForm } from "react-hook-form";

import classNames from "classnames/bind";
import styles from "./ModalAddNew.module.scss";

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

const TypographyCustom = styled(Typography)({
  margin: "10px 0",
  paddingTop: "10px",
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
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("lg")]: {
    justifyContent: "flex-end",
  },
}));

const ButtonCustom = styled(Button)(({ theme }) => ({
  marginBottom: "20px",
  color: "var(--grey-color)",
  width: "208px",
  height: "46px",
  fontSize: "14px",
  textTransform: "capitalize",
  borderColor: "var(--gray-color)",
  // flexGrow: 1,
  marginLeft: "20px",
  ":hover": {
    borderColor: "var(--primary-color)",
  },
  [theme.breakpoints.down("md")]: {
    flexGrow: 1,
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
  },
  [theme.breakpoints.up("lg")]: {
    flexGrow: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  bgcolor: "var(--bg-white-color)",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  zIndex: "1400",
  // overflow: "auto",
  // maxHeight: "100%",
};

function ModalAddNew(props) {
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ overflow: "auto", height: "100%" }}>
            <div className={cx("wrapper")}>
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={cx("title")}>
                  <h3>Modal Add New</h3>
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

                <div className={cx("add-new-container")}>
                  <div className={cx("content-items")}>
                    <div className={cx("item")}>
                      <div className={cx("item-title")}>
                        <p>Add New</p>
                      </div>
                      <Divider />
                      <div className={cx("item-title-content")}>
                        <div>
                          <TypographyCustom>Email</TypographyCustom>
                          <TextFieldCustom
                            placeholder="Email"
                            fullWidth
                            inputProps={{
                              style: {
                                padding: "7.5px 14px",
                              },
                            }}
                            {...register("email", {
                              required: true,
                              pattern: /\S+@\S+\.\S+/,
                            })}
                          />
                          <Box>
                            <TypographyError>
                              {errors.email &&
                                errors.email.type === "required" &&
                                "Email is required"}
                            </TypographyError>
                            <TypographyError>
                              {errors.email &&
                                errors.email.type === "pattern" &&
                                "Enter a valid email"}
                            </TypographyError>
                          </Box>
                        </div>

                        <div>
                          <TypographyCustom>User name</TypographyCustom>
                          <TextFieldCustom
                            placeholder="User name"
                            fullWidth
                            inputProps={{
                              style: {
                                padding: "7.5px 14px",
                              },
                            }}
                            {...register("userName", {
                              required: true,
                            })}
                          />
                          <Box>
                            <TypographyError>
                              {errors.userName &&
                                errors.userName.type === "required" &&
                                "User name is required"}
                            </TypographyError>
                          </Box>
                        </div>

                        <div>
                          <TypographyCustom>Password</TypographyCustom>
                          <TextFieldCustom
                            placeholder="Password"
                            type="password"
                            fullWidth
                            inputProps={{
                              style: {
                                padding: "7.5px 14px",
                              },
                            }}
                            {...register("passWord", {
                              required: true,
                              minLength: 4,
                            })}
                          />
                          <Box>
                            <TypographyError>
                              {errors.passWord &&
                                errors.passWord.type === "required" &&
                                "Password is required"}
                            </TypographyError>
                            <TypographyError>
                              {errors.passWord &&
                                errors.passWord.type === "minLength" &&
                                "Minimum characters 4 required"}
                            </TypographyError>
                          </Box>
                        </div>

                        <div>
                          <TypographyCustom>Select</TypographyCustom>
                          <FormControl
                            sx={{ minWidth: 120 }}
                            size="small"
                            fullWidth
                          >
                            <Select
                              isClearable={isClearable}
                              options={categoryList}
                              theme={theme}
                            />
                          </FormControl>
                        </div>

                        <div>
                          <TypographyCustom>Multi Select</TypographyCustom>

                          <FormControl
                            sx={{ minWidth: 120 }}
                            size="small"
                            fullWidth
                          >
                            <Select
                              isMulti
                              theme={theme}
                              isClearable={isClearable}
                              options={categoryList}
                            />
                          </FormControl>
                        </div>

                        <div>
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

                        <div>
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

                        <div>
                          <TypographyCustom>Date Picker</TypographyCustom>
                          <DatePicker
                            width="100%"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <StackCustom
                  direction="row"
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
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
              </form>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAddNew;
