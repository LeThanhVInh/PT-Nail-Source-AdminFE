import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LockPage.module.scss";
import config from "../../router/config";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleOptions from "../../assest/json/particleOptions.json";

const cx = classNames.bind(styles);

const UnlockScreen = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [notification, setNotification] = useState("");

  const handleButtonClick = (value) => {
    setPasscode((prevPasscode) => prevPasscode + value);
  };

  const handleBackspace = () => {
    setPasscode((prevPasscode) => prevPasscode.slice(0, -1));
  };

  const handleUnlock = () => {
    // Xử lý logic mở khóa ở đây, ví dụ kiểm tra passcode với một giá trị đã được thiết lập trước
    // Nếu passcode đúng, mở khóa, ngược lại, hiển thị thông báo không chính xác và xóa passcode
    // Ví dụ:
    if (passcode === "1234") {
      setNotification("Màn hình đã được mở khóa!");
      setPasscode("");
      navigate(config.routes.home);
    } else {
      setNotification("Passcode không chính xác!");
      setPasscode("");
      inputRef.current.focus();
    }
  };

  //   const [keyPressed, setKeyPressed] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Xử lý khi nhấn phím Enter
      inputRef.current.focus();
      handleUnlock();
    } else if (event.key >= "0" && event.key <= "9") {
      setPasscode((prevPasscode) => prevPasscode + event.key);
      // Xử lý khi nhấn phím số từ 0 đến 9
      //   console.log(`Number ${event.key} pressed`);
    } else if (event.key === "Backspace") {
      handleBackspace();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    function handleKeyPress(event) {
      const key = event.key;
      if (/^\d$/.test(key)) {
        inputRef.current.focus();
        const enterEvent = new KeyboardEvent("keypress", {
          key: "Enter",
          keyCode: 13,
        });
        inputRef.current.dispatchEvent(enterEvent);
      }
    }

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const particlesInit = useCallback(async engine => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
    // await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // await console.log(container);
  }, []);

  return (
    <div className={cx("unlock-screen")}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className={cx("the-particles-div")}
        options={particleOptions}
      />

      <div className={cx("unlock-screen-bg")}></div>

      <div className={cx("unlock-screen-alert")}>
        <p>{notification}</p>
      </div>
      <div className={cx("unlock-screen-btn")}>
        <input
          type="password"
          value={passcode}
          readOnly
          className={cx("passcode-display")}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <div className={cx("button-grid")}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map(
            (buttonValue, index) => (
              <button
                key={index}
                onClick={() => {
                  if (buttonValue === "⌫") {
                    handleBackspace();
                  } else if (buttonValue === "") {
                    // Nếu button không có giá trị thì không làm gì
                  } else {
                    handleButtonClick(buttonValue);
                  }
                }}
              >
                {buttonValue}
              </button>
            )
          )}
        </div>
        <button className={cx("unlock-button")} onClick={handleUnlock}>
          OK
        </button>
      </div>
    </div>
  );
};

export default UnlockScreen;
