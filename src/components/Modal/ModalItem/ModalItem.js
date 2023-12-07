import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  Modal,
  Box,
  IconButton,
  Divider,
  Typography,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";

import classNames from "classnames/bind";
import styles from "./ModalItem.module.scss";
import { ToggleButtonSelectSize } from "../../CustomMUI/ButtonCustom";
import constants, {
  modalSizes,
  getSizeOfModal,
} from "../../../providers/constants";

const cx = classNames.bind(styles);

function ModalItem(props, ref) {
  const focusFix = useRef();
  const { dataItem } = props;
  const modalSize = modalSizes.medium;
  const [isOpen, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const [selectSize, setSelectSize] = useState("small");
  const [selectVariation, setSelectVariation] = useState("red");
  const [animationClass, setAnimationClass] = useState("");

  React.useImperativeHandle(ref, () => ({ openModal }));

  useEffect(() => {
    if (isOpen === false) {
      setQuantity(0);
      setTotalItem(0);
      setSelectSize("small");
      setSelectVariation("red");
    } else {
      setTimeout(() => focusFix.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (quantity === 0) {
      setTotalItem(0);
    } else if (quantity >= 1) {
      setTotalItem(`${quantity * dataItem.price}`);
    }
  }, [quantity]);

  const closeModal = () => {
    setAnimationClass([
      "animate__animated",
      "animate__zoomOut",
      "animate__fast",
    ]);
    setTimeout(() => setOpenModal(false), 250);
  };
  const openModal = () => {
    setAnimationClass([
      "animate__animated",
      "animate__zoomIn",
      "animate__fast",
    ]);
    setTimeout(() => setOpenModal(true), 100);
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        className={cx("modal-main-box", animationClass)}
        sx={{
          width: getSizeOfModal(modalSize),
          overflow: "auto",
          margin: "auto",
          //height: "100%",
        }}
      >
        <div className={cx("wrapper")}>
          <div className={cx("modal-box")}>
            <div className={cx("header")}>
              <p>Modal Item</p>
              <IconButton
                ref={focusFix}
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
                              sx={{
                                margin: "0 5px",
                                color: "var(--primary-color)",
                                backgroundColor: "var(--white-color)",
                                borderRadius: "50%",
                                border: "1px solid var(--primary-color)",
                                padding: "2px",
                                ":hover": {
                                  color: "var(--primary-color)",
                                  backgroundColor: "var(--white-color)",
                                },
                              }}
                              onClick={() => setQuantity(quantity - 1)}
                            >
                              <RemoveIcon sx={{ height: 25, width: 25 }} />
                            </IconButton>
                          ) : (
                            <IconButton
                              sx={{
                                margin: "0 5px",
                                color: "var(--primary-color)",
                                backgroundColor: "var(--white-color)",
                                borderRadius: "50%",
                                border: "1px solid transparent",
                                padding: "2px",
                              }}
                              disabled
                            >
                              <RemoveIcon sx={{ height: 25, width: 25 }} />
                            </IconButton>
                          )}

                          <Typography
                            component="div"
                            variant="h6"
                            sx={{ margin: "10px" }}
                          >
                            {" "}
                            {quantity}{" "}
                          </Typography>
                          <IconButton
                            sx={{
                              margin: "0 5px",
                              color: "var(--white-color)",
                              backgroundColor: "var(--primary-color)",
                              border: "1px solid var(--primary-color)",
                              borderRadius: "50%",
                              padding: "2px",
                              ":hover": {
                                backgroundColor: "var(--primary-color)",
                              },
                            }}
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            <AddIcon sx={{ height: 25, width: 25 }} />
                          </IconButton>
                        </Box>
                        <Box>
                          <Typography component="div" variant="h6">
                            {" "}
                            ${totalItem}{" "}
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
                        onChange={(e, newValue) => setSelectSize(newValue)}
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
                        onChange={(e, newValue) => setSelectVariation(newValue)}
                        aria-label="Platform"
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
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
                    {constants.Spacer}
                    <div className={cx("confirm-btn")}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          height: "50px",
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
export default forwardRef(ModalItem);
