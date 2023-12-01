import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home-wrapper", "animate__animated animate__fadeInRight animate__fast")}>
      <div className={cx("item-wrapper")}>
        <div className={cx("item")}>A</div>
        <div className={cx("item")}>A</div>
        <div className={cx("item")}>A</div>
        <div className={cx("item")}>A</div>
        <div className={cx("item")}>A</div>
        <div className={cx("item")}>A</div>
        <div className={cx("item")}>A</div>
        <div className={cx("item")}>A</div>
      </div>
    </div>
  );
}

export default Home;
