import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';

import classNames from 'classnames/bind';
import styles from './StoreLocate.module.scss';
const cx = classNames.bind(styles);

const WBSList = [
  {
    id: 1,
    name: 'Alex',
    sales: '100',
    avatar: 'https://cosmeticsbusiness.com/article-image-alias/vanilla-girl-beauty-is-already-the-2.jpeg',
  },
  {
    id: 2,
    name: 'Lucy',
    sales: '132',
    avatar:
      'https://images.squarespace-cdn.com/content/v1/5d6aacb29e0b8f0001610a06/1696903638201-WWXSFZYD87UQ8J0EGQM4/shutterstock_759361057.jpg?format=1000w',
  },
  {
    id: 3,
    name: 'Cloe',
    sales: '154',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8Mxbd9IbyeBqI4nMoD-UF8FjnOcu0VbJgA&usqp=CAU',
  },
  {
    id: 4,
    name: 'Taylor',
    sales: '113',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT35Sk9mMEcBuooCRGNUylcYn-PR6IZhDHzvA&usqp=CAU',
  },
];

export default function StoreLocate() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className={cx('locate-wrapper', 'mt-20')}>
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Grid
            xs={8}
            sx={{
              width: {
                xs: '100%',
                md: '100%',
                lg: 'calc(100% * 8 / var(--Grid-columns))',
                xl: 'calc(100% * 8 / var(--Grid-columns))',
              },
            }}
          >
            <div className={cx('store-locate-wrap')}>
              <div className={cx('title')}>
                <h3>Sales Report</h3>
              </div>
              <div className={cx('map-wrap')}>
                <span className={cx('map-desc')}>Click the marker to see location details.</span>
                <div className={cx('map')}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.505760841449!2d106.69544587615162!3d10.772522059263544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f3129e64d%3A0x8d6b2d79522c7f30!2sBen%20Thanh%20Market!5e0!3m2!1sen!2s!4v1703825019937!5m2!1sen!2s"
                    width={'100%'}
                    height={'95%'}
                    style={{ borderRadius: '10px', border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="map"
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            xs={4}
            sx={{
              width: {
                xs: '100%',
                md: '100%',
                lg: 'calc(100% * 4 / var(--Grid-columns))',
                xl: 'calc(100% * 4 / var(--Grid-columns))',
              },
            }}
          >
            <div className={cx('weekly-best-seller')}>
              <div className={cx('title')}>
                <h3>Weekly Best Sellers</h3>
              </div>
              <div className={cx('wbs-wrap')}>
                {WBSList.map((res) => (
                  <div className={cx('wbs-item', 'animate')} key={res.id}>
                    <Avatar alt={res.name} src={res.avatar} />
                    <div className={cx('wbs-desc')}>
                      <span className={cx('wbs-name')}>{res.name}</span>
                      <span className={cx('wbs-date')}>18 May 2020</span>
                    </div>
                    <div className={cx('wbs-sales')}>{res.sales} Sales</div>
                  </div>
                ))}
                <div className={cx('wbs-item', '_more')}>
                  <button>View More</button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
