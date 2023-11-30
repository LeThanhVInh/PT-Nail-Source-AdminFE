import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../../components/CustomMUI/Accordion";
import { TextFieldCustom } from "../../../components/CustomMUI/TextFieldCustom";

import classNames from "classnames/bind";
import styles from "./CaptionImage.module.scss";

const cx = classNames.bind(styles);

///Image
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

//Custom
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

function CaptionImage() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChangeExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChangeExpanded("panel1")}
          sx={{ padding: 0, border: 0 }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{ backgroundColor: "var(--white-color)" }}
          >
            <div className={cx("item-title")}>
              <p>Caption & Images</p>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={cx("item-title-content")}>
              <div className={cx("content-caption")}>
                <Typography sx={{ margin: "15px 0", fontSize: "14px" }}>
                  Caption
                </Typography>
                <TextFieldCustom
                  fullWidth
                  placeholder="Write caption"
                  id="fullWidth"
                  inputProps={{
                    style: {
                      padding: "7.5px 14px",
                    },
                  }}
                />
              </div>

              <div className={cx("content-image")}>
                <Typography sx={{ margin: "15px 0", fontSize: "14px" }}>
                  Upload Image
                </Typography>

                <div className={cx("item-title-content-main-img")}>
                  <div className={cx("main-img")}>
                    {imgList.map((res) => (
                      <div key={res.id} className={cx("img-item")}>
                        <img src={res.imgSrc} alt={res.id} />
                        <Tooltip
                          title="Remove this image?"
                          arrow
                          placement="top"
                        >
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
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default CaptionImage;
