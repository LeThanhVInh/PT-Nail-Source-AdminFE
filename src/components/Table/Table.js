import * as React from "react";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  IconButton,
  Stack,
  InputBase,
  Checkbox,
  Chip,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
  TaskAlt as TaskAltIcon,
} from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import ModalEdit from "../Modal/ModalEdit";

const cx = classNames.bind(styles);

//#region const variable
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

const CheckboxTable = styled(Checkbox)(({ theme }) => ({
  "&.Mui-checked": {
    color: "var(--primary-color)",
  },
  "&.MuiCheckbox-indeterminate": {
    color: "var(--primary-color)",
  },
}));

const rows = [
  {
    id: 1,
    images: "https://rubick-react.left4code.com/assets/profile-3.614e7dcb.jpg",
    categoryName: "11111111111111111",
    slug: "1",
    status: "active",
  },
  {
    id: 2,
    images: "https://rubick-react.left4code.com/assets/profile-10.7f88f31b.jpg",
    categoryName: "222222222222222222",
    slug: "2",
    status: "active",
  },
  {
    id: 3,
    images: "https://rubick-react.left4code.com/assets/profile-6.a9037862.jpg",
    categoryName: "33333333333333333333",
    slug: "3",
    status: "deactive",
  },
  {
    id: 4,
    images: "https://rubick-react.left4code.com/assets/profile-6.a9037862.jpg",
    categoryName: "4444444444444444",
    slug: "4",
    status: "deactive",
  },
  {
    id: 5,
    images: "https://rubick-react.left4code.com/assets/profile-2.21f19505.jpg",
    categoryName: "55555555555555555",
    slug: "5",
    status: "deactive",
  },
  {
    id: 6,
    images: "https://rubick-react.left4code.com/assets/profile-10.7f88f31b.jpg",
    categoryName: "66666666666666666",
    slug: "6",
    status: "active",
  },
  {
    id: 7,
    images: "https://rubick-react.left4code.com/assets/profile-3.614e7dcb.jpg",
    categoryName: "7777777777777777",
    slug: "7",
    status: "active",
  },
];
//#endregion

export default function Tables() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isCheckedItem, setIsCheckedItem] = React.useState([]);

  const checkAllRow = (isChecked) => {
    if (isChecked) return setIsCheckedItem(rows.map((row) => row.id));
    else setIsCheckedItem([]);
  };

  const checkOneRow = (isChecked, id) => {
    const index = isCheckedItem.indexOf(id);

    if (isChecked) return setIsCheckedItem((state) => [...state, id]);

    if (!isChecked && index > -1)
      return setIsCheckedItem((state) => {
        state.splice(index, 1);
        return JSON.parse(JSON.stringify(state));
      });
  };

  return (
    <>
      <div
        className={cx(
          "table-wrapper",
          "animate__animated",
          "animate__fadeInRight",
          "animate__fast"
        )}
      >
        <TableContainer sx={{ m: "10px", width: "auto" }} elevation={0}>
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
                    onClick={() => setOpenModal(true)}
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

          <div style={{ overflow: "auto" }}>
            <Table
              stickyHeader
              sx={{
                minWidth: 700,
                borderSpacing: "0 10px",
                borderCollapse: "unset",
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ width: "70px" }}>
                    <CheckboxTable
                      checked={isCheckedItem.length === rows.length}
                      indeterminate={
                        isCheckedItem.length !== rows.length &&
                        isCheckedItem.length > 0
                      }
                      onChange={(event) => checkAllRow(event.target.checked)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ width: "90px" }}>
                    IMAGES
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ minWidth: "100px" }}>
                    CATEGORY NAME
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ minWidth: "100px" }}>
                    SLUG
                  </StyledTableCell>
                  <StyledTableCell align="center">STATUS</StyledTableCell>
                  <StyledTableCell align="center">ACTIONS</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{
                      backgroundColor: "var(--white-color)",
                      borderRadius: "5px",
                      boxShadow: "20px 3px 20px #0000000b",
                    }}
                  >
                    <StyledTableCell align="left">
                      <CheckboxTable
                        key={rows.id}
                        checked={isCheckedItem.includes(row.id)}
                        onChange={(event) =>
                          checkOneRow(event.target.checked, row.id)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <img
                        src={row.images}
                        alt={1}
                        className={cx("images-table")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.categoryName}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.slug}</StyledTableCell>

                    <StyledTableCell align="center">
                      {row.status === "active" ? (
                        <Chip
                          sx={{ backgroundColor: "var(--white-color)" }}
                          icon={<TaskAltIcon color="success" />}
                          label="Active"
                        />
                      ) : (
                        <Chip
                          sx={{ backgroundColor: "var(--white-color)" }}
                          icon={<TaskAltIcon color="error" />}
                          label="Inactive"
                        />
                      )}
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      className={cx("border-right")}
                    >
                      <IconButton className={cx("btn-edit")}>
                        <EditIcon />
                      </IconButton>
                      <IconButton className={cx("btn-delete")}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </div>
      <ModalEdit isOpen={isOpenModal} closeModal={() => setOpenModal(false)} />
    </>
  );
}
