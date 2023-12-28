import { Box, Card, CardContent, CardMedia, Typography, IconButton, Divider } from '@mui/material';

import { Remove as RemoveIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

import classNames from 'classnames/bind';
import styles from '../PointOfSale.module.scss';
const cx = classNames.bind(styles);

export default function CartPos() {
  return (
    <div className={cx('cart')}>
      {[1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
        <>
          <Card key={i} className={cx('data-card')}>
            <CardMedia
              component="img"
              image="https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267-500x500.jpg"
              className={cx('image')}
              sx={{
                width: {
                  xs: '15%',
                  md: '15%',
                  lg: '20%',
                  xl: '20%',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
              }}
            >
              <CardContent className={cx('content')}>
                <Typography component="div" variant="h6" sx={{ color: 'var(--text-color)' }}>
                  <b>Cappuccino 2</b>
                </Typography>
                <Typography component="div" variant="subtitle2" sx={{ color: 'var(--text-color)' }}>
                  Size XXL, không đường
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  pl: 1,
                  pb: 1,
                }}
              >
                <Box
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton
                    sx={{
                      margin: '0 5px',
                      color: 'var(--white-color)',
                      backgroundColor: 'var(--btn-primary)',
                      borderRadius: '50%',
                      border: '1px solid var(--btn-primary)',
                      padding: '2px',
                      ':hover': {
                        color: 'var(--btn-primary)',
                        backgroundColor: 'var(--white-color)',
                      },
                    }}
                  >
                    <DeleteIcon sx={{ height: 22, width: 22 }} />
                  </IconButton>
                  <Typography component="div" variant="subtitle1" sx={{ margin: '5px', color: 'var(--text-color)' }}>
                    <strong>6</strong>
                  </Typography>
                  <IconButton
                    sx={{
                      margin: '0 5px',
                      color: 'var(--white-color)',
                      backgroundColor: 'var(--btn-primary)',
                      border: '1px solid var(--btn-primary)',
                      borderRadius: '50%',
                      padding: '2px',
                      ':hover': {
                        backgroundColor: 'var(--btn-primary)',
                      },
                    }}
                  >
                    <AddIcon sx={{ height: 22, width: 22 }} />
                  </IconButton>
                </Box>

                <Box component="div">
                  <Typography component="div" variant="subtitle1" sx={{ color: 'var(--text-color)' }}>
                    6 x $21
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
          <Divider
            sx={{
              margin: '10px 0',
              borderColor: 'var(--grey-border)',
            }}
          />
        </>
      ))}
    </div>
  );
}
