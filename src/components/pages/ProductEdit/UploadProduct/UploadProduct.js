import { useState } from "react";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import classNames from "classnames/bind";
import styles from "../ProductEdit.module.scss";
const cx = classNames.bind(styles);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ButtonCustom = styled(Button)(({ theme }) => ({
  marginBottom: "20px",
  color: "var(--grey-color)",
  width: "100%",
  height: "46px",
  fontSize: "14px",
  textTransform: "capitalize",
  borderColor: "var(--gray-color)",
  // flexGrow: 1,
  marginLeft: "20px",
  ":hover": {
    borderColor: "var(--primary-color)",
  },
  [theme.breakpoints.down("md")]: {
    flexGrow: 1,
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
  },
  [theme.breakpoints.up("lg")]: {
    flexGrow: 0,
  },
}));

const imageDummy = [
  {
    id: 1,
    imgSrc: "https://rubick-react.left4code.com/assets/profile-10.7f88f31b.jpg",
  },
  {
    id: 2,
    imgSrc: "https://rubick-react.left4code.com/assets/profile-6.a9037862.jpg",
  },
  {
    id: 3,
    imgSrc: "https://rubick-react.left4code.com/assets/profile-2.21f19505.jpg",
  },
  {
    id: 4,
    imgSrc: "https://rubick-react.left4code.com/assets/profile-3.614e7dcb.jpg",
  },
  {
    id: 5,
    imgSrc: "https://rubick-react.left4code.com/assets/profile-2.21f19505.jpg",
  },
];

function UploadProduct() {
  ///Upload Product
  const [imgList, SetImgList] = useState(imageDummy);
  //Upload Product
  const handleDelete = (res) => {
    const listWithTrue = imgList.filter((x) => x.id !== res.id);
    SetImgList(listWithTrue);
  };

  return (
    <div className={cx("content-items")}>
      <div className={cx("item")}>
        <div className={cx("item-title")}>
          <p>Upload Product</p>
        </div>

        <Divider />

        <div className={cx("item-title-content")}>
          <div className={cx("item-title-content-aside")}>
            <div className={cx("aside-text-info")}>
              <strong>Product Photos</strong>
              <p>Required</p>
            </div>
            <div className={cx("aside-text-tip")}>
              <p>
                The image format is .jpg .jpeg .png and a minimum size of 300 x
                300 pixels (For optimal images use a minimum size of 700 x 700
                pixels).
              </p>
              <p>
                Select product photos or drag and drop up to 5 photos at once
                here. Include min. 3 attractive photos to make the product more
                attractive to buyers.
              </p>
            </div>
          </div>
          <div className={cx("item-title-content-main-img")}>
            <div className={cx("main-img")}>
              {imgList.map((res) => (
                <div key={res.id} className={cx("img-item")}>
                  <img src={res.imgSrc} alt={res.id} />
                  <Tooltip title="Remove this image?" arrow placement="top">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      sx={{
                        backgroundColor: "#b91c1c",
                        width: "20px",
                        height: "20px",
                        ":hover": {
                          backgroundColor: "#b91c1c",
                        },
                      }}
                      className={cx("img-item-icon")}
                      onClick={() => handleDelete(res)}
                    >
                      <ClearIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}
            </div>
            <div style={{ width: "100%" }}>
              <ButtonCustom
                fullWidth
                component="label"
                // variant="outlined"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadProduct;
