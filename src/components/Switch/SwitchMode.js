import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchDarkMode } from '../../features/appSetting/appSettingSlice';

import classNames from 'classnames/bind';
import styles from './Switch.module.scss';
const cx = classNames.bind(styles);

export default function SwitchMode() {
  const dispatch = useDispatch();
  const switchMode = useSelector((state) => state.appSetting.isDarkModeOn);
  const mainTheme = useSelector((state) => state.appSetting.mainTheme);
  const bodyRoot = document.getElementById('body-root');

  useEffect(() => {
    if (switchMode === true) {
      bodyRoot.className = '';
      bodyRoot.classList.add('dark-theme');
    } else {
      bodyRoot.classList.remove('dark-theme');
      bodyRoot.classList.add(`${mainTheme}`);
    }
  }, [switchMode]);

  const toggleDarkMode = (event) => {
    dispatch(switchDarkMode());
  };

  return (
    <div className={cx('switch-wrapper')}>
      <svg display="none">
        <symbol id="light" viewBox="0 0 24 24">
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="17" x2="12" y2="20" transform="rotate(0,12,12)" />
            <line x1="12" y1="17" x2="12" y2="20" transform="rotate(45,12,12)" />
            <line x1="12" y1="17" x2="12" y2="20" transform="rotate(90,12,12)" />
            <line x1="12" y1="17" x2="12" y2="20" transform="rotate(135,12,12)" />
            <line x1="12" y1="17" x2="12" y2="20" transform="rotate(180,12,12)" />
            <line x1="12" y1="17" x2="12" y2="20" transform="rotate(225,12,12)" />
            <line x1="12" y1="17" x2="12" y2="20" transform="rotate(270,12,12)" />
            <line x1="12" y1="17" x2="12" y2="20" transform="rotate(315,12,12)" />
          </g>
          <circle fill="currentColor" cx="12" cy="12" r="5" />
        </symbol>
        <symbol id="dark" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15.1,14.9c-3-0.5-5.5-3-6-6C8.8,7.1,9.1,5.4,9.9,4c0.4-0.8-0.4-1.7-1.2-1.4C4.6,4,1.8,7.9,2,12.5c0.2,5.1,4.4,9.3,9.5,9.5c4.5,0.2,8.5-2.6,9.9-6.6c0.3-0.8-0.6-1.7-1.4-1.2C18.6,14.9,16.9,15.2,15.1,14.9z"
          />
        </symbol>
      </svg>
      <label className={cx('switch')}>
        <input
          className={cx('switch__input')}
          type="checkbox"
          role="switch"
          name="dark"
          onChange={toggleDarkMode}
          checked={switchMode}
        />
        <svg className={cx('switch__icon')} width="24px" height="24px" aria-hidden="true">
          <use href="#light" />
        </svg>
        <svg className={cx('switch__icon')} width="24px" height="24px" aria-hidden="true">
          <use href="#dark" />
        </svg>
        <span className={cx('switch__inner')}></span>
        <span className={cx('switch__inner-icons')}>
          <svg className={cx('switch__icon')} width="24px" height="24px" aria-hidden="true">
            <use href="#light" />
          </svg>
          <svg className={cx('switch__icon')} width="24px" height="24px" aria-hidden="true">
            <use href="#dark" />
          </svg>
        </span>
        <span className={cx('switch__sr')}>Dark Mode</span>
      </label>
    </div>
  );
}
