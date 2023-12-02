import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Box from "@mui/material/Box";
// import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/system";
import RadioGroup from "@mui/material/RadioGroup";

// import Divider from "@mui/material/Divider";
import { TextField, Typography } from "@mui/material";
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

import classNames from "classnames/bind";
import styles from "./WrittenDetails.module.scss";

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

//Custom
const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#f3f3f3",
    primary: "var(--primary-color)",
  },
});

// const TextFieldCustom = styled(TextField)({
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "var(--grey-border)",
//     },
//     "&:hover fieldset": {
//       borderColor: "var(--primary-color)",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "var(--primary-color)",
//     },
//   },
// });

const TypographyCustom = styled(Typography)({
  margin: "10px 0",

  fontSize: "14px",
});

// const TypographyError = styled(Typography)({
//   color: "red",
//   fontSize: "14px",
//   marginTop: "10px",
// });

const FormControlLabelCustom = styled(FormControlLabel)({
  span: {
    "&.Mui-checked": {
      color: "var(--primary-color)",
    },
  },
});

// const StackCustom = styled(Stack)(({ theme }) => ({
//   marginTop: "10px",
//   display: "flex",
//   flexWrap: "wrap",
//   justifyContent: "flex-end",
//   alignItems: "center",
//   padding: theme.spacing(1),
//   [theme.breakpoints.down("md")]: {
//     justifyContent: "center",
//   },
//   [theme.breakpoints.up("md")]: {
//     justifyContent: "space-evenly",
//   },
//   [theme.breakpoints.up("lg")]: {
//     justifyContent: "flex-end",
//   },
// }));

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
  input: {
    padding: "7.5px 14px",
  },

  "& .Mui-focused": {
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

function WrittenDetails(props) {
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
                        <Select
                          isClearable={isClearable}
                          options={categoryList}
                          theme={theme}
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
                        <Select
                          isClearable={isClearable}
                          options={categoryList}
                          theme={theme}
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
                        <Select
                          isMulti
                          theme={theme}
                          isClearable={isClearable}
                          options={categoryList}
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
