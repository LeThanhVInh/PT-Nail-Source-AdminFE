import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Sidebar from "../../components/Sidebar";
import Menubar from "../../components/Menubar";

import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <>
      <Row className={cx("wrapper")}>
        <Col sm={2} className={cx("container")}>
          {/* <Menubar /> */}
          <Sidebar />
        </Col>
        <Col sm={10} className={cx("content-layout")}>
          {children}
        </Col>
      </Row>
    </>
  );
}

export default DefaultLayout;
