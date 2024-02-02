import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
const cx = classNames.bind(styles);

function NotFound() {
  const [route, setRoute] = useState([]);
  const userData = useSelector((state) => state.userSetting.authUserData);

  useEffect(() => {
    if (userData) {
      const checkRoute = userData?.AllowedScreens?.map((item) => item.RouteLink);
      setRoute(checkRoute);
    }
  }, []);

  useEffect(() => {
    function drawVisor() {
      const canvas = document.getElementById('visor');
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(5, 45);
      ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

      ctx.lineTo(55, 20);
      ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

      ctx.lineTo(15, 10);

      ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      ctx.lineTo(5, 45);

      ctx.fillStyle = '#2f3640';
      ctx.strokeStyle = '#f5f6fa';
      ctx.fill();
      ctx.stroke();
    }

    const cordCanvas = document.getElementById('cord');
    const ctx = cordCanvas.getContext('2d');

    let y1 = 160;
    let y2 = 100;
    let y3 = 100;

    let y1Forward = true;
    let y2Forward = false;
    let y3Forward = true;

    function animate(innerWidth, innerHeight) {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, 400, 400);

      ctx.beginPath();
      ctx.moveTo(130, 170);
      ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 8;
      ctx.stroke();

      if (y1 === 100) {
        y1Forward = true;
      }

      if (y1 === 300) {
        y1Forward = false;
      }

      if (y2 === 100) {
        y2Forward = true;
      }

      if (y2 === 310) {
        y2Forward = false;
      }

      if (y3 === 100) {
        y3Forward = true;
      }

      if (y3 === 317) {
        y3Forward = false;
      }

      y1Forward ? (y1 += 1) : (y1 -= 1);
      y2Forward ? (y2 += 1) : (y2 -= 1);
      y3Forward ? (y3 += 1) : (y3 -= 1);
    }

    drawVisor();
    animate();
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          backgroundColor: {
            overflow: 'hidden',
          },
          minHeight: '100%',
          mt: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className={cx('not-found')}>
          <div className={cx('moon-wrapper')}>
            <div className={cx('moon')}></div>
            <div className={cx('moon__crater', 'moon__crater1')}></div>
            <div className={cx('moon__crater', 'moon__crater2')}></div>
            <div className={cx('moon__crater', 'moon__crater3')}></div>

            <div className={cx('error')}>
              <div className={cx('error__title')}>404</div>
              <div className={cx('error__subtitle')}>Hmmm...</div>
              <div className={cx('error__description')}>It looks like one of the developers fell asleep</div>
              <Link to={route?.[1] ? route?.[1] : '/account'}>
                <button className={cx('error__button', 'error__button--active')}>BACK</button>
              </Link>
              <button className={cx('error__button')}>CONTACT</button>
            </div>
          </div>
          <div>
            <div className={cx('star', 'star1')}></div>
            <div className={cx('star', 'star2')}></div>
            <div className={cx('star', 'star3')}></div>
            <div className={cx('star', 'star4')}></div>
            <div className={cx('star', 'star5')}></div>
          </div>
          <div className={cx('astronaut')}>
            <div className={cx('astronaut__backpack')}></div>
            <div className={cx('astronaut__body')}></div>
            <div className={cx('astronaut__body__chest')}></div>
            <div className={cx('astronaut__arm-left1')}></div>
            <div className={cx('astronaut__arm-left2')}></div>
            <div className={cx('astronaut__arm-right1')}></div>
            <div className={cx('astronaut__arm-right2')}></div>
            <div className={cx('astronaut__arm-thumb-left')}></div>
            <div className={cx('astronaut__arm-thumb-right')}></div>
            <div className={cx('astronaut__leg-left')}></div>
            <div className={cx('astronaut__leg-right')}></div>
            <div className={cx('astronaut__foot-left')}></div>
            <div className={cx('astronaut__foot-right')}></div>
            <div className={cx('astronaut__wrist-left')}></div>
            <div className={cx('astronaut__wrist-right')}></div>

            <div className={cx('astronaut__cord')}>
              <canvas id="cord" height="400px" width="400px"></canvas>
            </div>

            <div className={cx('astronaut__head')}>
              <canvas id="visor" width="60px" height="60px"></canvas>
              <div className={cx('astronaut__head-visor-flare1')}></div>
              <div className={cx('astronaut__head-visor-flare2')}></div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default NotFound;
