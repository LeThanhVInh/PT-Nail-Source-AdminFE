import {
  Modal,
  Box,
  IconButton,
  Divider,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { modalSizes } from "../../../providers/constants";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";

import classNames from "classnames/bind";
import styles from "./ModalItem.module.scss";
import { useEffect, useState } from "react";
import { ToggleButtonSelectSize } from "../../CustomMUI/ButtonCustom";
const cx = classNames.bind(styles);

export default function ModalItem(props) {
  const { closeModal, isOpen, dataItem } = props;
  const [quantity, setQuantity] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const [selectSize, setSelectSize] = useState("small");
  const [selectVariation, setSelectVariation] = useState("red");

  useEffect(() => {
    if (isOpen === false) {
      setQuantity(0);
      setTotalItem(0);
      setSelectSize("small");
      setSelectVariation("red");
    }
  }, [isOpen]);

  useEffect(() => {
    if (quantity === 0) {
      setTotalItem(0);
    } else if (quantity >= 1) {
      setTotalItem(`${quantity * dataItem.price}`);
    }
  }, [quantity]);

  const handleChangeSelectSize = (event, newAlignment) => {
    setSelectSize(newAlignment);
  };

  const handleChangeSelectVariation = (event, newAlignment) => {
    setSelectVariation(newAlignment);
  };

  const modalSize = modalSizes.medium;

  const getSizeOfModal = (type) => {
    if (type === modalSizes.mini && window.innerWidth < 360)
      return modalSizes.full;
    else if (type === modalSizes.tiny && window.innerWidth < 540)
      return modalSizes.full;
    else if (type === modalSizes.medium && window.innerWidth < 720)
      return modalSizes.full;
    else if (type === modalSizes.large && window.innerWidth < 1080)
      return modalSizes.full;
    else return type.toString();
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        className={cx(
          "main-box",
          "animate__animated animate__zoomIn animate__fast"
        )}
        sx={{
          width: getSizeOfModal(modalSize),
          overflow: "auto",
          height: "100%",
          margin: "auto",
        }}
      >
        <div className={cx("wrapper")}>
          <div className={cx("modal-box")}>
            <div className={cx("header")}>
              <p>Modal Item</p>
              <IconButton
                // disableElevation
                // disableRipple
                aria-label="Close"
                sx={{
                  ":hover": {
                    color: "var(--primary-color)",
                  },
                }}
                onClick={closeModal}
              >
                <ClearIcon fontSize="inherit" />
              </IconButton>
            </div>
            <Divider sx={{ margin: "10px 0" }} />
            <div className={cx("contents")}>
              <Grid container spacing={2}>
                <Grid
                  xs={6}
                  sx={{
                    width: {
                      xs: "100%",
                      md: "100%",
                      lg: "calc(100% * 6 / var(--Grid-columns))",
                      xl: "calc(100% * 6 / var(--Grid-columns))",
                    },
                  }}
                >
                  <div className={cx("contents")}>
                    <img src={dataItem.img} alt={dataItem.name} />
                    <div className={cx("info")}>
                      <h3>{dataItem.name}</h3>
                      <h4>${dataItem.price}</h4>
                    </div>
                    <div className={cx("description")}>
                      <span>{dataItem.description}</span>
                    </div>
                    <div className={cx("description")}>
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {quantity >= 1 ? (
                            <IconButton
                              sx={{ color: "var(--primary-color)" }}
                              onClick={() => setQuantity(quantity - 1)}
                            >
                              <RemoveIcon sx={{ height: 25, width: 25 }} />
                            </IconButton>
                          ) : (
                            <IconButton
                              sx={{ color: "var(--primary-color)" }}
                              disabled
                            >
                              <RemoveIcon sx={{ height: 25, width: 25 }} />
                            </IconButton>
                          )}

                          <Typography component="div" variant="h6">
                            {quantity}
                          </Typography>
                          <IconButton
                            sx={{ color: "var(--primary-color)" }}
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            <AddIcon sx={{ height: 25, width: 25 }} />
                          </IconButton>
                        </Box>
                        <Box>
                          <Typography component="div" variant="h6">
                            ${totalItem}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  </div>
                </Grid>
                <Grid
                  xs={6}
                  sx={{
                    width: {
                      xs: "100%",
                      md: "100%",
                      lg: "calc(100% * 6 / var(--Grid-columns))",
                      xl: "calc(100% * 6 / var(--Grid-columns))",
                    },
                  }}
                >
                  <div className={cx("title-aside")}>
                    <p>Select Option</p>
                  </div>
                  <div className={cx("action")}>
                    <div className={cx("select-btn-item")}>
                      <p>Size</p>
                      <ToggleButtonGroup
                        color="primary"
                        value={selectSize}
                        exclusive
                        onChange={handleChangeSelectSize}
                        aria-label="Platform"
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <ToggleButtonSelectSize value="small" size="small">
                          <Typography variant="subtitle2">Small</Typography>
                        </ToggleButtonSelectSize>

                        <ToggleButtonSelectSize value="medium" size="small">
                          <Typography variant="subtitle2">Medium</Typography>
                        </ToggleButtonSelectSize>

                        <ToggleButtonSelectSize value="larger" size="small">
                          <Typography variant="subtitle2">Larger</Typography>
                        </ToggleButtonSelectSize>
                      </ToggleButtonGroup>
                    </div>
                    <div className={cx("select-btn-item")}>
                      <p>Variation</p>
                      <ToggleButtonGroup
                        color="primary"
                        value={selectVariation}
                        exclusive
                        onChange={handleChangeSelectVariation}
                        aria-label="Platform"
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          //   justifyContent: "center",
                        }}
                      >
                        <ToggleButtonSelectSize value="red">
                          <Typography variant="subtitle2">Red</Typography>
                        </ToggleButtonSelectSize>

                        <ToggleButtonSelectSize value="green">
                          <Typography variant="subtitle2">
                            Greenssssssssss
                          </Typography>
                        </ToggleButtonSelectSize>

                        <ToggleButtonSelectSize value="blue">
                          <Typography variant="subtitle2">Blue</Typography>
                        </ToggleButtonSelectSize>
                        <ToggleButtonSelectSize value="yellow">
                          <Typography variant="subtitle2">Yellow</Typography>
                        </ToggleButtonSelectSize>

                        <ToggleButtonSelectSize value="Pink">
                          <Typography variant="subtitle2">Pink</Typography>
                        </ToggleButtonSelectSize>

                        <ToggleButtonSelectSize value="black">
                          <Typography variant="subtitle2">Black</Typography>
                        </ToggleButtonSelectSize>
                      </ToggleButtonGroup>
                    </div>

                    <div className={cx("confirm-btn")}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: "var(--primary-color)",
                          ":hover": {
                            backgroundColor: "var(--primary-color)",
                          },
                        }}
                      >
                        Add to Bucket
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
