import React, { useState, useRef, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./LockPage.module.scss";
import config from "../../router/config";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleOptions from "../../assets/json/particleOptions.json";

const cx = classNames.bind(styles);

export default function UnlockScreen() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [inputAnimation, setInputAnimation] = useState([]);

  const handleButtonClick = (value) => {
    setPasscode((prevPasscode) => prevPasscode + value);
  };

  const handleBackspace = () => {
    setPasscode((prevPasscode) => prevPasscode.slice(0, -1));
  };

  const handleUnlock = () => {
    if (passcode === "1234") {
      setPasscode("");
      navigate(config.routes.home);
    } else {
      Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        showClass: { popup: "animate__animated animate__fadeInDown" },
        hideClass: { popup: "animate__animated animate__fadeOutUp" },
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire('Wrong passcode !', '', 'error');
      setInputAnimation(["animate__animated animate__shakeX", "border-error"]);
      setTimeout(() => setInputAnimation([]), 3000);

      setPasscode("");
      inputRef.current.focus();

    }
  };

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


  return (
    <div className={cx("unlock-screen")}
      onKeyDown={handleKeyDown}>
      <Particles
        className={cx("the-particles-div")}
        init={useCallback(async (engine) => await loadFull(engine), [])}
        options={particleOptions}
      />
      <div className={cx("background")}></div>
      <div className={cx("form")}>
        <div className={cx("avatar")}></div>
        <input readOnly
          type="password" value={passcode}
          className={cx("passcode-display", inputAnimation)}
          ref={inputRef}
        />
        <div className={cx("button-grid")}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((buttonValue, i) => {
            if (buttonValue === "" || (buttonValue === "⌫" && passcode === ""))
              return <div key={i}></div>;

            return <button key={i}
              className="animate__animated animate__fadeIn animate__faster"
              onClick={() => {
                if (buttonValue === "⌫") {
                  handleBackspace();
                } else {
                  handleButtonClick(buttonValue);
                }
              }}
            >
              {buttonValue}
            </button>;
          })}
        </div>
        <button className={cx("unlock-button")}
          onClick={handleUnlock}>
          OK
        </button>
      </div>
    </div>
  );
}; 