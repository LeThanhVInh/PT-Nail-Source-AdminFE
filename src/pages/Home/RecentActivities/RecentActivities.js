import Avatar from '@mui/material/Avatar';

import classNames from 'classnames/bind';
import styles from './RecentActivities.module.scss';
const cx = classNames.bind(styles);

const WBSList = [
  {
    id: 1,
    name: 'Alex',
    activities: {
      title: 'Added 3 new photos',
    },
    avatar: 'https://cosmeticsbusiness.com/article-image-alias/vanilla-girl-beauty-is-already-the-2.jpeg',
  },
  {
    id: 2,
    name: 'Lucy',
    activities: {
      title: 'Has joined the team',
    },
    avatar:
      'https://images.squarespace-cdn.com/content/v1/5d6aacb29e0b8f0001610a06/1696903638201-WWXSFZYD87UQ8J0EGQM4/shutterstock_759361057.jpg?format=1000w',
  },
  {
    id: 3,
    name: 'Cloe',
    activities: {
      title: 'Has joined the team',
    },
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8Mxbd9IbyeBqI4nMoD-UF8FjnOcu0VbJgA&usqp=CAU',
  },
  {
    id: 4,
    name: 'Taylor',
    activities: {
      title: 'Added 2 new photos',
    },
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT35Sk9mMEcBuooCRGNUylcYn-PR6IZhDHzvA&usqp=CAU',
  },
  {
    id: 6,
    name: 'Swift',
    activities: {
      title: 'Has joined the team',
    },
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT35Sk9mMEcBuooCRGNUylcYn-PR6IZhDHzvA&usqp=CAU',
  },
];

export default function RecentActivities() {
  return (
    <div className={cx('recent-activities-wrap', 'mt-20')}>
      <div className={cx('title')}>
        <h3>Recent Activities</h3>
      </div>
      <div className={cx('ra-item-wrap')}>
        {WBSList.map((item) => (
          <div className={cx('ra-item')} key={`ra-${item.id}`}>
            <div className={cx('item-avatar')}>
              <Avatar alt={item.name} src={item.avatar} />
            </div>
            <div className={cx('ra-info-wrap', 'animate')}>
              <div className={cx('ra-info')}>
                <div className={cx('ra-info-name')}>{item.name}</div>
                <div className={cx('ra-info-time')}>07:00 PM</div>
              </div>
              <div className={cx('ra-desc')}>{item.activities.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
