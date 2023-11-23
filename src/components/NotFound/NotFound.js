import styles from "./NotFound.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cx("not-found")}>
      <h1>404</h1>
      <h3>Page Not Found</h3>
    </div>
  );
}

export default NotFound;
