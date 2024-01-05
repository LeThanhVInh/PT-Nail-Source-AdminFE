import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchDarkMode } from '../../features/appSetting/appSettingSlice';

import classNames from 'classnames/bind';
import styles from './Switch.module.scss';
const cx = classNames.bind(styles);

export default function SwitchMode() {
  const dispatch = useDispatch();
  const switchMode = useSelector((state) => state.appSetting.isDarkModeOn);
  const mainTheme = useSelector((state) => state.appSetting.mainTheme);

  // const root = document.documentElement;

  // const [darkMode, setDarkMode] = useState(switchMode);
  const bodyRoot = document.getElementById('body-root');

  // useEffect(() => {
  //   setDarkMode(switchMode);
  // }, []);

  useEffect(() => {
    if (switchMode === true) {
      // document.body.classList.remove('light-theme');
      bodyRoot.className = '';
      bodyRoot.classList.add('dark-theme');
    } else {
      bodyRoot.classList.remove('dark-theme');
      bodyRoot.classList.add(`${mainTheme}`);
    }
  }, [switchMode]);

  const toggleDarkMode = (event) => {
    dispatch(switchDarkMode());
    // if (event.target.checked) {
    //   setDarkMode(true);
    // } else {
    //   setDarkMode(false);
    // }
  };

  // useEffect(() => {
  //   if (switchMode === true) {
  //     root.style.setProperty('--primary-color', '#2c3135');
  //     root.style.setProperty('--primary-icon', '#f6f6f6');
  //     root.style.setProperty('--primary-light', '#18191a');
  //     root.style.setProperty('--primary-light2', '#202528');
  //     root.style.setProperty('--primary-dark', '#24282a');
  //     root.style.setProperty('--primary-white', '#fff');
  //     root.style.setProperty('--primary-bold', '#042248');
  //     root.style.setProperty('--divider-primary', 'rgba(255, 255, 255, 0.3)');
  //     root.style.setProperty('--black-color', '#18191a');
  //     root.style.setProperty('--bg-white-color', 'rgb(32, 37, 41)');
  //     root.style.setProperty('--text-color', 'white');
  //     root.style.setProperty('--white-color', '#fff');
  //     root.style.setProperty('--white-dark', '#202529');
  //     root.style.setProperty('--bg-white-item', '#2c3135');
  //     root.style.setProperty('--btn-edit', '#f6f6f6');
  //     root.style.setProperty('--btn-primary', '#203f65');
  //     root.style.setProperty('--red-color', '#ff4428');
  //     root.style.setProperty('--green-color', '#3aa240');
  //     root.style.setProperty('--blue-color', 'rgb(29, 78, 216)');
  //     root.style.setProperty('--pending-color', 'rgb(249, 115, 22)');
  //     root.style.setProperty('--warning-color-2', 'rgb(250, 204, 21)');
  //     root.style.setProperty('--success-color', 'rgb(132, 204, 22)');
  //     root.style.setProperty('--grey-color-text', '#b2b2b2');
  //     root.style.setProperty('--grey-border', 'rgba(255, 255, 255, 0.3)');
  //     root.style.setProperty('--grey-border-item', 'rgba(226, 232, 240, 0.1)');
  //     root.style.setProperty('--grey-border-dash', 'rgba(179, 179, 179, 0.3)');
  //     root.style.setProperty('--grey-border-input', 'rgba(226, 232, 240, 0.6)');
  //     root.style.setProperty('--grey-bg', '#202529');
  //     root.style.setProperty('--grey', '#808080');
  //     root.style.setProperty('--primary-check', 'rgb(255, 255, 255)');
  //     root.style.setProperty('--background-modal', '#252a2e');
  //     root.style.setProperty('--white-color-outline', '#2c3135');
  //     root.style.setProperty('--required-bg', 'rgb(226, 232, 240)');
  //     root.style.setProperty('--input-color', '#181a1b');
  //     root.style.setProperty('--box-shadow-item', 'none');
  //     root.style.setProperty('--grey-shadow', 'none');
  //   } else {
  //     root.style.setProperty('--primary-color', 'rgba(49, 46, 129, 1)');
  //     root.style.setProperty('--primary-icon', 'rgba(49, 46, 129, 1)');
  //     root.style.setProperty('--primary-light', 'rgba(129, 127, 199, 0.314)');
  //     root.style.setProperty('--divider-primary', 'rgba(129, 127, 199, 0.314)');
  //     root.style.setProperty('--primary-light2', 'rgba(129, 127, 199, 0.5)');
  //     root.style.setProperty('--primary-dark', 'rgba(44, 41, 116)');
  //     root.style.setProperty('--primary-white', 'rgba(49, 46, 129, 1)');
  //     root.style.setProperty(' --primary-bold', 'rgb(44, 41, 116)');

  //     root.style.setProperty('--black-color', '#000');
  //     root.style.setProperty('--text-color', '#1e293b');
  //     root.style.setProperty('--bg-white-color', '#f6f6f6');
  //     root.style.setProperty('--white-color', '#fff');
  //     root.style.setProperty('--white-dark', '#fff');
  //     root.style.setProperty('--bg-white-item', '#f6f6f6');
  //     root.style.setProperty('--btn-primary', '#44418c');
  //     root.style.setProperty('--btn-edit', '#1e293b');
  //     root.style.setProperty('--red-color', '#d32f2f');
  //     root.style.setProperty('--green-color', '#2e7d32');
  //     root.style.setProperty('--blue-color', '#1e40af;');
  //     root.style.setProperty('--pending-color', 'rgb(249, 115, 22)');
  //     root.style.setProperty('--warning-color-2', 'rgb(250, 204, 21)');
  //     root.style.setProperty('--success-color', 'rgb(132, 204, 22)');
  //     root.style.setProperty('--grey', '#808080');
  //     root.style.setProperty('--grey-border', '#b3b3b3');
  //     root.style.setProperty('--grey-border-dash', '#b3b3b3');
  //     root.style.setProperty('--grey-border-item', 'rgba(226, 232, 240, 0.9)');
  //     root.style.setProperty('--grey-border-input', 'rgba(49, 46, 129, 1)');
  //     root.style.setProperty('--grey-color-text', '#64748b');
  //     root.style.setProperty('--grey-bg', '#e2e8f0');
  //     root.style.setProperty('--primary-check', 'rgb(49, 46, 129)');
  //     root.style.setProperty('--background-modal', '#f6f6f6');
  //     root.style.setProperty('--white-color-outline', '#fff');
  //     root.style.setProperty('--input-color', '#fff');
  //     root.style.setProperty('--box-shadow-item', '1px 1px 20px rgba(0, 0, 0, 0.1) !important');
  //     root.style.setProperty('--grey-shadow', '#cdcdcd');
  //   }
  // }, [switchMode]);

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
