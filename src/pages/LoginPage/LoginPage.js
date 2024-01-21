import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Box, TextField, Button, Stack, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import config from '../../router/config';

import loginImg from '../../assets/images/svg/login-img.svg';
import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import Loader from '../../components/Loader';
import useAuth from '../../providers/custom-hooks/useAuth';

const cx = classNames.bind(styles);

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputAnimation, setInputAnimation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaderLoading, setIsLoaderLoading] = useState(true);
  const [colorLoader, setColorLoader] = useState('#fff');
  const [isLogin, setLogin] = useState(false);

  const { currentUser } = useAuth();

  const emailRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleLogin = async (data) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.passWord)
      .then(async (userCredential) => {
        setIsLoading(false);
        navigate(location?.state?.prevUrl ? location?.state?.prevUrl : '/');
      })
      .catch((error) => {
        Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' },
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire('Email or password is incorrect !', '', 'error');
        setInputAnimation(['animate__animated animate__shakeX', 'border-error']);
        setTimeout(() => setInputAnimation([]), 3000);
        emailRef.current.focus();
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.getIdToken().then((token) => {
          if (token !== '') {
            setIsLoaderLoading(true);
            setLogin(true);
            navigate(config.routes.home);
          } else {
            setIsLoaderLoading(false);
            setLogin(false);
          }
        });
      } else {
        setIsLoaderLoading(false);
        setLogin(false);
      }
      // Update the user state
      // setLogin(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [isLogin]);

  if (isLogin && isLoaderLoading) return <Loader colorLoader={colorLoader} isLoading={isLoaderLoading} />;
  else if (!isLogin && !isLoaderLoading)
    return (
      <>
        <div className={cx('wrapper')}>
          <Grid
            container
            sx={{
              position: 'relative',
              height: '100vh',
              backgroundColor: {
                xl: 'var(--white-color)',
                lg: 'none',
                xs: 'none',
                sm: 'none',
                md: 'none',
                overflow: 'hidden',
              },
              minHeight: '100%',
              mt: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              xs={6}
              sx={{
                // position: "relative",
                display: {
                  xl: 'flex',
                  lg: 'none',
                  xs: 'none',
                  sm: 'none',
                  md: 'none',
                },
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--white-color)',
                ':before': {
                  position: 'absolute',
                  width: '50%',
                  height: '140%',
                  backgroundColor: '#d6d5e6',
                  content: `""`,
                  left: '0',
                  zIndex: 0,
                  borderTopRightRadius: '25% 50%',
                  borderBottomRightRadius: '25% 50%',
                },
                ':after': {
                  position: 'absolute',
                  width: '50%',
                  height: '140%',
                  backgroundColor: 'var(--primary-color)',
                  content: `""`,
                  left: '0',
                  zIndex: 0,
                  borderTopRightRadius: '40% 50%',
                  borderBottomRightRadius: '40% 50%',
                },
              }}
            >
              <Box sx={{ zIndex: 6 }}>
                <Typography
                  className="animate__animated animate__fadeInLeft animate__fast"
                  sx={{ top: 0, position: 'absolute', marginTop: '50px' }}
                >
                  Logo
                </Typography>
                <Box className="animate__animated animate__fadeInLeft animate__fast">
                  <img src={loginImg} alt="login" />
                  <Typography variant="h4" sx={{ maxWidth: '370px', fontWeight: '700' }}>
                    A few more clicks to sign in to your account.
                  </Typography>
                  <Typography
                    sx={{
                      maxWidth: '400px',
                      color: '#FFFFFFB3',
                      marginTop: '20px',
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-color)',
                backgroundColor: 'var(--white-color)',
                borderRadius: {
                  xl: '0',
                  lg: '30px',
                  xs: '30px',
                  sm: '30px',
                  md: '30px',
                },
                maxWidth: '472px',
                minWidth: '360px',
                height: {
                  xl: '100%',
                  lg: '534px',
                  xs: '534px',
                  sm: '534px',
                  md: '534px',
                },
                padding: '16px',
              }}
            >
              <div className="login-form animate__animated animate__fadeInRight animate__fast">
                <Typography
                  sx={{
                    marginBottom: '20px',
                    fontSize: '30px',
                    fontWeight: '600',
                    color: 'var(--black-color)',
                  }}
                >
                  Sign In
                </Typography>

                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': {
                      m: 1,
                      width: {
                        xl: '425px',
                        lg: '425px',
                        xs: '320px',
                        sm: '320px',
                        md: '320px',
                      },
                    },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  noValidate
                  autoComplete="off"
                  className="animate__animated animate__fadeInRight animate__fast"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <TextField
                    label="Email"
                    variant="outlined"
                    inputRef={emailRef}
                    error={
                      (errors.email && errors.email.type === 'required') ||
                      (errors.email && errors.email.type === 'pattern' && 'Enter a valid email')
                        ? true
                        : false
                    }
                    helperText={
                      (errors.email && errors.email.type === 'required' && 'Email is required') ||
                      (errors.email && errors.email.type === 'pattern' && 'Enter a valid email')
                    }
                    inputProps={{
                      style: {
                        padding: '11.5px 14px',
                      },
                    }}
                    sx={{
                      '& label': {
                        top: '-4px',
                      },
                      // height: "46px",
                      '& label.Mui-focused': {
                        color: 'var(--primary-color)',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'var(--primary-color)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'var(--primary-color)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--primary-color)',
                        },
                      },
                    }}
                    {...register('email', {
                      required: true,
                      pattern: /\S+@\S+\.\S+/,
                    })}
                  />
                  <TextField
                    // id="outlined-password-input"

                    error={errors.passWord && errors.passWord.type === 'required' ? true : false}
                    label="Password"
                    type="password"
                    helperText={errors.passWord && errors.passWord.type === 'required' && 'Password is required'}
                    autoComplete="off"
                    inputProps={{
                      style: {
                        padding: '11.5px 14px',
                      },
                    }}
                    sx={{
                      '& label': {
                        top: '-4px',
                      },
                      '& label.Mui-focused': {
                        color: 'var(--primary-color)',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'var(--primary-color)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'var(--primary-color)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--primary-color)',
                        },
                      },
                    }}
                    {...register('passWord', {
                      required: true,
                    })}
                  />

                  {/* {invalidEmail !== '' ? <Typography sx={{ color: 'var(--red-color)' }}>{invalidEmail}</Typography> : ''} */}

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '14px',
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            size="small"
                            sx={{
                              color: 'var(--primary-color)',
                              '&.Mui-checked': {
                                color: 'var(--primary-color)',
                              },
                            }}
                          />
                        }
                        label={<span style={{ fontSize: '14px', color: 'var(--black-color)' }}>{'Remember me'}</span>}
                        fontSize="14px"
                      />
                    </FormGroup>

                    <a href="/">Forgot Password?</a>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    {!isLoading ? (
                      <Button
                        variant="contained"
                        sx={{ width: '128px', height: '46px' }}
                        className={cx('btn-login')}
                        type="submit"
                        disabled={isLoading || isLoaderLoading}
                      >
                        Login
                      </Button>
                    ) : (
                      <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                        sx={{ width: '128px', height: '46px' }}
                      >
                        Login
                      </LoadingButton>
                    )}

                    <Button variant="outlined" sx={{ width: '128px', height: '46px' }} className={cx('btn-register')}>
                      Register
                    </Button>
                  </Stack>
                </Box>
                <Typography
                  className={cx('text-policy', 'animate__animated animate__fadeInRight animate__fast')}
                  sx={{
                    fontSize: '14px',
                    marginTop: '20px',
                    textAlign: 'center',
                    maxWidth: '100%',
                    color: 'var(--black-color)',
                    width: {
                      xl: '425px',
                      lg: '425px',
                      xs: '320px',
                      sm: '320px',
                      md: '320px',
                    },
                  }}
                >
                  By signin up, you agree to our
                  <a href="/"> Terms and Conditions & Privacy Policy</a>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    );
}
