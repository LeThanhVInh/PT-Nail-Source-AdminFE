import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import loginImg from "../../assest/svg/login-img.svg";

import classNames from "classnames/bind";
import styles from "./LoginPage.module.scss";
const cx = classNames.bind(styles);

function LoginPage() {
  return (
    <>
      <div className={cx("wrapper")}>
        <Grid
          container
          // spacing={2}
          sx={{
            position: "relative",
            height: "100vh",
            backgroundColor: {
              xl: "var(--white-color)",
              lg: "none",
              xs: "none",
              sm: "none",
              md: "none",
              overflow: "hidden",
            },
            minHeight: "100%",
            mt: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              // position: "relative",
              display: {
                xl: "flex",
                lg: "none",
                xs: "none",
                sm: "none",
                md: "none",
              },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--white-color)",
              ":before": {
                position: "absolute",
                width: "50%",
                height: "140%",
                backgroundColor: "#d6d5e6",
                content: `""`,
                left: "0",
                zIndex: 0,
                borderTopRightRadius: "25% 50%",
                borderBottomRightRadius: "25% 50%",
              },
              ":after": {
                position: "absolute",
                width: "50%",
                height: "140%",
                backgroundColor: "var(--primary-color)",
                content: `""`,
                left: "0",
                zIndex: 0,
                borderTopRightRadius: "40% 50%",
                borderBottomRightRadius: "40% 50%",
              },
            }}
          >
            <Box sx={{ zIndex: 6 }}>
              <Typography
                sx={{ top: 0, position: "absolute", marginTop: "50px" }}
              >
                Logo
              </Typography>
              <Box>
                <img src={loginImg} alt="login" />
                <Typography
                  variant="h4"
                  sx={{ maxWidth: "370px", fontWeight: "700" }}
                >
                  A few more clicks to sign in to your account.
                </Typography>
                <Typography
                  sx={{
                    maxWidth: "400px",
                    color: "#FFFFFFB3",
                    marginTop: "20px",
                  }}
                >
                  Manage all your e-commerce accounts in one place
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-color)",
              backgroundColor: "var(--white-color)",
              borderRadius: {
                xl: "0",
                lg: "30px",
                xs: "30px",
                sm: "30px",
                md: "30px",
              },
              maxWidth: "472px",
              minWidth: "360px",
              height: {
                xl: "100%",
                lg: "534px",
                xs: "534px",
                sm: "534px",
                md: "534px",
              },
              padding: "16px",
            }}
          >
            <Typography
              sx={{
                marginBottom: "20px",
                fontSize: "30px",
                fontWeight: "700",
                transform: {
                  xl: "translateX(-166px)",
                  lg: "translateX(0)",
                },
              }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: {
                    xl: "425px",
                    lg: "425px",
                    xs: "320px",
                    sm: "320px",
                    md: "320px",
                  },
                },
                display: "flex",
                flexDirection: "column",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                // id="outlined-basic"
                label="Email"
                variant="outlined"
                inputProps={{
                  style: {
                    padding: "11.5px 14px",
                  },
                }}
                sx={{
                  "& label": {
                    top: "-4px",
                  },
                  // height: "46px",
                  "& label.Mui-focused": {
                    color: "var(--primary-color)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--primary-color)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--primary-color)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--primary-color)",
                    },
                  },
                }}
              />
              <TextField
                // id="outlined-password-input"
                label="Password"
                type="password"
                // autoComplete="current-password"
                inputProps={{
                  style: {
                    padding: "11.5px 14px",
                  },
                }}
                sx={{
                  "& label": {
                    top: "-4px",
                  },
                  "& label.Mui-focused": {
                    color: "var(--primary-color)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--primary-color)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--primary-color)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--primary-color)",
                    },
                  },
                }}
              />

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "14px",
                }}
              >
                <FormGroup>
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
                      <span style={{ fontSize: "14px" }}>{"Remember me"}</span>
                    }
                    fontSize="14px"
                  />
                </FormGroup>

                <a>Forgot Password?</a>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  sx={{ width: "128px", height: "46px" }}
                  className={cx("btn-login")}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: "128px", height: "46px" }}
                  className={cx("btn-register")}
                >
                  Register
                </Button>
              </Stack>
            </Box>
            <Typography
              className={cx("text-policy")}
              sx={{
                fontSize: "14px",
                marginTop: "20px",
                textAlign: "center",
                maxWidth: "100%",
                width: {
                  xl: "425px",
                  lg: "425px",
                  xs: "320px",
                  sm: "320px",
                  md: "320px",
                },
              }}
            >
              By signin up, you agree to our
              <a> Terms and Conditions & Privacy Policy</a>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default LoginPage;