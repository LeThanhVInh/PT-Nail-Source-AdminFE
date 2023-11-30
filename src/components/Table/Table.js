import * as React from "react";
import { useState } from "react";
import Validation from "react-validation-framework";
import validator from "validator";
import { fieldValidatorCore } from "react-validation-framework";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import ModalAddNew from "../Modal/ModalAddNew";

const cx = classNames.bind(styles);

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "var(--white-color)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    color: "var(--text-color)",
    borderSpacing: "0 20px",
    border: 0,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderSpacing: "0 20px",
    border: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    border: 0,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(images, categoryName, slug, status, actions) {
  return { images, categoryName, slug, status, actions };
}

const rows = [
  createData(
    "https://rubick-react.left4code.com/assets/profile-3.614e7dcb.jpg",
    159,
    6.0,
    24,
    4.0
  ),
  createData(
    "https://rubick-react.left4code.com/assets/profile-10.7f88f31b.jpg",
    237,
    9.0,
    37,
    4.3
  ),
  createData(
    "https://rubick-react.left4code.com/assets/profile-6.a9037862.jpg",
    262,
    16.0,
    24,
    6.0
  ),
  createData(
    "https://rubick-react.left4code.com/assets/profile-2.21f19505.jpg",
    305,
    3.7,
    67,
    4.3
  ),
  createData(
    "https://rubick-react.left4code.com/assets/profile-2.21f19505.jpg",
    356,
    16.0,
    49,
    3.9
  ),
];

function Tables() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <div className={cx("table-wrapper")}>
        <TableContainer
          sx={{
            m: "10px",
            width: "auto",
          }}
          elevation={0}
        >
          <div className={cx("action-container")}>
            <div className={cx("title")}>
              <h3>Categories</h3>
            </div>
            <div className={cx("action-wrapper")}>
              <div className={cx("action-add", "pt-10")}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="primary"
                    className={cx("btn-add-new")}
                    onClick={handleOpenModal}
                  >
                    Add New Category
                  </Button>
                  <IconButton aria-label="Add">
                    <AddIcon />
                  </IconButton>
                </Stack>
              </div>
              <div className={cx("action-search", "pt-10")}>
                <Search sx={{ boxShadow: "20px 3px 20px #0000000b" }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </Search>
              </div>
            </div>
          </div>

          <Table
            sx={{
              minWidth: 700,
              borderSpacing: "0 10px",
              borderCollapse: "unset",
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>IMAGES</StyledTableCell>
                <StyledTableCell align="right">CATEGORY NAME</StyledTableCell>
                <StyledTableCell align="right">SLUG</StyledTableCell>
                <StyledTableCell align="center">STATUS</StyledTableCell>
                <StyledTableCell align="center">ACTIONS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.images}
                  sx={{
                    backgroundColor: "var(--white-color)",
                    borderRadius: "5px",
                    boxShadow: "20px 3px 20px #0000000b",
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={row.images}
                      alt={1}
                      className={cx("images-table")}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.categoryName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.slug}</StyledTableCell>

                  <StyledTableCell align="center">
                    <Button className={cx("btn-is-active")}>
                      <CheckBoxIcon /> Active
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    className={cx("border-right")}
                  >
                    <IconButton className={cx("btn-edit")}>
                      <CheckBoxIcon />
                    </IconButton>
                    <IconButton className={cx("btn-delete")}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ModalAddNew open={openModal} handleClose={handleCloseModal} />
    </>
  );
}
export default Tables;
