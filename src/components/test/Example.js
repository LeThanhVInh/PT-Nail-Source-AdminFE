import React, { useState } from "react";
import styles from "./Example.module.scss";

const Example = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div className={` ${styles.div1} ${isActive ? styles.active : ""}`}>
        1
      </div>
      <div className={styles.div2} onClick={handleClick}>
        2
      </div>
      <div className={styles.div2} onClick={handleClick}>
        3
      </div>
      <div className={styles.div2} onClick={handleClick}>
        4
      </div>
    </div>
  );
};

export default Example;
