import { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Divider,
  ToggleButtonGroup,
} from '@mui/material';

import {
  Remove as RemoveIcon,
  Payments as PaymentsIcon,
  Payment as PaymentIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import HeaderPOS from '../../components/HeaderPOS';
import { ToggleButtonPayment } from '../../components/CustomMUI/ButtonCustom';
import ModalItem from '../../components/Modal/ModalItem/ModalItem';
import {
  BoxSpaceBetween,
  TypographyMediumBold,
  TypographySmallBold,
} from '../../components/CustomMUI/PosMuiCustom/PosMuiCustom';
import Categories from './Categories';
import ProductsPos from './ProductsPos/ProductsPos';
import CartPos from './CartPos';

import { categoriesList, menuList } from '../../providers/data/data';

import classNames from 'classnames/bind';
import styles from './PointOfSale.module.scss';
const cx = classNames.bind(styles);

function PointOfSale() {
  const modalRef = useRef();
  const [alignment, setAlignment] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [dataItem, setDataItem] = useState({});
  // const [productListColumnAmount, setProductListColumnAmount] = useState(4);
  const [newData, setNewData] = useState([]);

  const dataSort = () => {
    let newData = [...menuList];

    if (alignment === 'All') {
      setNewData([...menuList]);
    } else if (alignment) {
      let newDataSort = [...newData];
      const filteredArray = newDataSort.filter((res) => res.categorize === alignment);
      setNewData(filteredArray);
    }
  };

  useEffect(() => {
    setNewData([...newData]);
    dataSort();
  }, [alignment]);

  const handleLearnMore = (item) => {
    setDataItem(item);
    openModal();
  };

  const openModal = () => {
    if (modalRef.current && modalRef.current.openModal) {
      modalRef.current.openModal();
    }
  };

  const count = useSelector((state) => state.appSetting.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className={cx('wrapper')}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              xs={9}
              sx={{
                width: {
                  xs: '100%',
                  md: '100%',
                  lg: 'calc(100% * 9 / var(--Grid-columns))',
                  xl: 'calc(100% * 9 / var(--Grid-columns))',
                },
              }}
            >
              <HeaderPOS />
              <div className={cx('body')}>
                <Categories alignment={alignment} categoriesList={categoriesList} setAlignment={setAlignment} />
                <ProductsPos alignment={alignment} newData={newData} handleLearnMore={handleLearnMore} />
              </div>
            </Grid>
            <Grid
              xs={3}
              sx={{
                width: {
                  xs: '100%',
                  md: '100%',
                  lg: 'calc(100% * 3 / var(--Grid-columns))',
                  xl: 'calc(100% * 3 / var(--Grid-columns))',
                },
              }}
            >
              <div className={cx('aside')}>
                <div className={cx('aside-wrapper')}>
                  <div className={cx('header-title')}>
                    <h3>Detail Items</h3>
                  </div>
                  <div className={cx('body')}>
                    <CartPos />
                    <div className={cx('total-payment')}>
                      <div className={cx('total')}>
                        <BoxSpaceBetween>
                          <Typography component="div" variant="subtitle2" sx={{ color: 'var(--text-color)' }}>
                            Item
                          </Typography>
                          <TypographySmallBold>X (Items)</TypographySmallBold>
                        </BoxSpaceBetween>

                        <BoxSpaceBetween>
                          <Typography component="div" variant="subtitle2" sx={{ color: 'var(--text-color)' }}>
                            Subtotal
                          </Typography>
                          <TypographySmallBold>$9999</TypographySmallBold>
                        </BoxSpaceBetween>

                        <BoxSpaceBetween>
                          <Typography component="div" variant="subtitle2" sx={{ color: 'var(--text-color)' }}>
                            Discount
                          </Typography>
                          <TypographySmallBold>-$9999</TypographySmallBold>
                        </BoxSpaceBetween>

                        <BoxSpaceBetween>
                          <Typography component="div" variant="subtitle2" sx={{ color: 'var(--text-color)' }}>
                            Tax (15%)
                          </Typography>
                          <TypographySmallBold>$99</TypographySmallBold>
                        </BoxSpaceBetween>

                        <Divider
                          sx={{
                            margin: '10px 0',
                            borderColor: 'var(--grey-border-item)',
                          }}
                        />

                        <BoxSpaceBetween>
                          <TypographyMediumBold>Total</TypographyMediumBold>
                          <TypographyMediumBold>$99</TypographyMediumBold>
                        </BoxSpaceBetween>
                      </div>

                      <div className={cx('payment')}>
                        <div className={cx('header-title-payment')}>
                          <TypographyMediumBold>Payment Method</TypographyMediumBold>
                        </div>
                        <div>
                          <ToggleButtonGroup
                            color="primary"
                            value={paymentMethod}
                            exclusive
                            onChange={(e, newAlignment) => setPaymentMethod(newAlignment)}
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              justifyContent: 'center',
                            }}
                          >
                            <ToggleButtonPayment value="cash">
                              <PaymentsIcon sx={{ width: '30px', height: '30px' }} />
                              <Typography>Cash</Typography>
                            </ToggleButtonPayment>

                            <ToggleButtonPayment value="debit">
                              <PaymentIcon sx={{ width: '30px', height: '30px' }} />
                              <Typography>Debit</Typography>
                            </ToggleButtonPayment>

                            <ToggleButtonPayment value="qris">
                              <QrCodeScannerIcon sx={{ width: '30px', height: '30px' }} />
                              <Typography>QRIS</Typography>
                            </ToggleButtonPayment>
                          </ToggleButtonGroup>
                        </div>
                      </div>
                      <div className={cx('footer')}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            fontWeight: 600,
                            height: '50px',
                            backgroundColor: 'var(--btn-primary)',
                            ':hover': {
                              backgroundColor: 'var(--btn-primary)',
                            },
                          }}
                        >
                          Process Transaction
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>

      <ModalItem ref={modalRef} dataItem={dataItem} />
    </>
  );
}

export default PointOfSale;
