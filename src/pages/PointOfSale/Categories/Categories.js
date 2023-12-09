import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import classNames from "classnames/bind";
import styles from "../PointOfSale.module.scss";
import { ToggleButtonCategories } from "../../../components/CustomMUI/ButtonCustom";
const cx = classNames.bind(styles);

export default function Categories(props) {
  const { categoriesList, alignment, setAlignment } = props;

  return (
    <div className={cx("categories-wrapper")}>
      <div className={cx("header-title")}>
        <h3>Categories</h3>
      </div>
      <div className={cx("categories-body")}>
        <ToggleButtonGroup
          exclusive
          color="primary"
          value={alignment}
          className={cx("button-group")}
          onChange={(event, newAlignment) => setAlignment(newAlignment)}
        >
          {categoriesList.map((item) => (
            <ToggleButtonCategories
              key={item.id}
              value={item.title}
              className={cx("button")}
            >
              <div className={cx("categories-list-item")}>
                <img src={item.imgSrc} alt={item.title} />
                <p>{item.title}</p>
              </div>
            </ToggleButtonCategories>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
