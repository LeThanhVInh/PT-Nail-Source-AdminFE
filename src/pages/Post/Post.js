import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { TextFieldNoneBorder } from "../../components/CustomMUI/TextFieldCustom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CodeIcon from "@mui/icons-material/Code";

import { ToggleButtonCustom } from "../../components/CustomMUI/ToggleButtonCustom";

import classNames from "classnames/bind";
import styles from "./Post.module.scss";
import { DefaultButton } from "../../components/CustomMUI/ButtonCustom";
import TextContent from "./TextContent";
import CaptionImage from "./CaptionImage";
import WrittenDetails from "./WrittenDetails/WrittenDetails";
import { StackCustom } from "../../components/CustomMUI/StackButtonCustom";
const cx = classNames.bind(styles);

function Post() {
  const [alignment, setAlignment] = useState("content");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className={cx("post-wrapper")}>
      <div className={cx("post-header")}>
        <div className={cx("title")}>
          <h3>Add New Post</h3>
          <StackCustom direction="row" spacing={2}>
            <DefaultButton startIcon={<KeyboardArrowDownIcon />}>
              English
            </DefaultButton>
            <DefaultButton endIcon={<VisibilityIcon />}>Preview</DefaultButton>
            <DefaultButton
              variant="contained"
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                color: "var(--white-color)",
                backgroundColor: "var(--primary-color)",
                textTransform: "capitalize",
                ":hover": {
                  backgroundColor: "var(--primary-color)",
                },
              }}
            >
              Save
            </DefaultButton>
          </StackCustom>
        </div>
      </div>
      <div className={cx("post-body")}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            <Grid
              xs={8}
              sx={{
                width: {
                  xs: "100%",
                  md: "100%",
                  lg: "calc(100% * 8 / var(--Grid-columns))",
                  xl: "calc(100% * 8 / var(--Grid-columns))",
                },
              }}
            >
              <div className={cx("title")}>
                <TextFieldNoneBorder
                  fullWidth
                  placeholder="Title"
                  id="fullWidth"
                  inputProps={{
                    style: {
                      padding: "7.5px 14px",
                    },
                  }}
                  sx={{ backgroundColor: "var(--white-color)" }}
                />
              </div>
              <div className={cx("contain")}>
                <div className={cx("contain-btn")}>
                  <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{ width: "100%", flexWrap: "wrap" }}
                  >
                    <ToggleButtonCustom value="content">
                      <DescriptionOutlinedIcon
                        sx={{ fontSize: "16px", marginRight: "5px" }}
                      />
                      Content
                    </ToggleButtonCustom>
                    <ToggleButtonCustom value="metaTitle">
                      <CodeIcon sx={{ fontSize: "16px", marginRight: "5px" }} />
                      Meta Title
                    </ToggleButtonCustom>
                    <ToggleButtonCustom value="keyWord">
                      <FormatAlignLeftIcon
                        sx={{ fontSize: "16px", marginRight: "5px" }}
                      />
                      Keywords
                    </ToggleButtonCustom>
                  </ToggleButtonGroup>
                </div>
                {alignment !== "content" ? (
                  " "
                ) : (
                  <div className={cx("content")} style={{ display: "block" }}>
                    <TextContent />
                    <CaptionImage />
                  </div>
                )}
              </div>
            </Grid>
            <Grid
              xs={4}
              sx={{
                width: {
                  xs: "100%",
                  md: "100%",
                  lg: "calc(100% * 4 / var(--Grid-columns))",
                  xl: "calc(100% * 4 / var(--Grid-columns))",
                },
              }}
            >
              <Box>
                <WrittenDetails />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Post;
