import { useState } from 'react';
import ScrollIntoView from 'react-scroll-into-view';

import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Box, List, ListItemButton, ListItemText, Button } from '@mui/material';

import ProductInformation from './ProductInformation';
import ProductDetail from './ProductDetail';
import UploadProduct from './UploadProduct';
import ProductManagement from './ProductManagement';
import classNames from 'classnames/bind';
import styles from './ProductEdit.module.scss';

const cx = classNames.bind(styles);

const StackCustom = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('lg')]: {
    justifyContent: 'flex-end',
  },
}));

const ListItemButtonCustom = styled(ListItemButton)({
  minWidth: '35px',
  borderLeft: '2px solid #64748b5c',
  '&.Mui-selected': {
    color: 'var(--primary-color)',
    borderLeft: '2px solid var(--primary-check)',
  },
  // "&.Mui-focusVisible": {
  //   // backgroundColor: "#2e8b57",
  // },
  // ":hover": {},
});

const ListItemTextCustom = styled(ListItemText)({
  color: 'var(--grey-color-text)',
  span: {
    fontSize: '14px',
    lineHeight: '14px',
  },
});

const ButtonCustom = styled(Button)(({ theme }) => ({
  marginBottom: '20px',
  color: 'var(--primary-check)',
  width: '208px',
  height: '46px',
  fontSize: '14px',
  textTransform: 'capitalize',
  borderColor: 'var(--gray-color)',
  // flexGrow: 1,
  marginLeft: '20px',
  ':hover': {
    borderColor: 'var(--primary-check)',
  },
  [theme.breakpoints.down('md')]: {
    flexGrow: 1,
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
  },
  [theme.breakpoints.up('lg')]: {
    flexGrow: 0,
  },
}));

function ProductEdit() {
  //Aside
  const [selectedIndex, setSelectedIndex] = useState(1);

  //Aside
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={cx('products-edit-wrapper', 'animate__animated animate__fadeInRight animate__fast')}>
      <div className={cx('title')}>
        <h3>Product Edit</h3>
      </div>
      <div className={cx('upload-product')}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid
              xs={10}
              sx={{
                width: {
                  xs: '100%',
                  md: '100%',
                  lg: '100%',
                  xl: 'calc(100% * 10 / var(--Grid-columns))',
                },
              }}
            >
              <div id="section-1" style={{ boxShadow: 'var(--box-shadow)' }}>
                <UploadProduct />
              </div>
              <div id="section-2" style={{ boxShadow: 'var(--box-shadow)' }}>
                <ProductInformation />
              </div>
              <div id="section-3" style={{ boxShadow: 'var(--box-shadow)' }}>
                <ProductDetail />
              </div>
              <div id="section-4" style={{ boxShadow: 'var(--box-shadow)' }}>
                <ProductManagement />
              </div>

              <StackCustom
                direction="row"
                sx={{
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <ButtonCustom variant="outlined" sx={{ borderColor: 'var(--primary-check)' }}>
                  Cancel
                </ButtonCustom>
                <ButtonCustom variant="outlined" sx={{ borderColor: 'var(--primary-check)' }}>
                  Save & Add New Product
                </ButtonCustom>
                <ButtonCustom
                  variant="contained"
                  sx={{
                    backgroundColor: 'var(--btn-primary)',
                    color: 'var(--white-color)',
                    ':hover': {
                      backgroundColor: 'var(--btn-primary)',
                    },
                  }}
                >
                  Save
                </ButtonCustom>
              </StackCustom>
            </Grid>
            <Grid
              xs={2}
              sx={{
                display: {
                  xs: 'none',
                  md: 'none',
                  lg: 'none',
                  xl: 'block',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '310px',
                  // bgcolor: "background.paper",
                  position: 'sticky',

                  top: 0,
                }}
              >
                <List component="nav" aria-label="menu product edit">
                  <ScrollIntoView selector="#section-1">
                    <ListItemButtonCustom
                      selected={selectedIndex === 1}
                      onClick={(event) => handleListItemClick(event, 1)}
                    >
                      <ListItemTextCustom primary="Upload Product" />
                    </ListItemButtonCustom>
                  </ScrollIntoView>
                  <ScrollIntoView selector="#section-2">
                    <ListItemButtonCustom
                      selected={selectedIndex === 2}
                      onClick={(event) => handleListItemClick(event, 2)}
                    >
                      <ListItemTextCustom primary="Product Information" />
                    </ListItemButtonCustom>
                  </ScrollIntoView>

                  <ScrollIntoView selector="#section-3">
                    <ListItemButtonCustom
                      selected={selectedIndex === 3}
                      onClick={(event) => handleListItemClick(event, 3)}
                    >
                      <ListItemTextCustom primary="Product Detail" />
                    </ListItemButtonCustom>
                  </ScrollIntoView>

                  <ScrollIntoView selector="#section-4">
                    <ListItemButtonCustom
                      selected={selectedIndex === 4}
                      onClick={(event) => handleListItemClick(event, 4)}
                    >
                      <ListItemTextCustom primary="Product Management" />
                    </ListItemButtonCustom>
                  </ScrollIntoView>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default ProductEdit;
