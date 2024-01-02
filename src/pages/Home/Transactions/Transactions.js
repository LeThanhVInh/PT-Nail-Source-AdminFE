import Avatar from '@mui/material/Avatar';

import classNames from 'classnames/bind';
import styles from './Transactions.module.scss';
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

export default function Transactions() {
  return (
    <div className={cx('transactions-wrap')}>
      <div className={cx('title')}>
        <h3>Transactions</h3>
      </div>

      <div className={cx('wbs-wrap')}>
        {WBSList.map((res) => (
          <div className={cx('wbs-item', 'animate')}>
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
  );
}
