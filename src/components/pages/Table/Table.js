import * as React from "react";

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
    "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/279010736_2344780688996019_4166994336824590836_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MyW08_XuaxEAX84VnV2&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDgstXKJcOVVKhVkaZQeTwTXO5xMsa2NHoYTc7xTo0yuQ&oe=65638800",
    159,
    6.0,
    24,
    4.0
  ),
  createData(
    "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/278865349_161336839629250_6774608535506922596_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qYlXWqcpIuMAX8V_EVr&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfA9jtcYmQl25tqUD4YASGiAzk1qmsZOqIA7of4rjlkCgA&oe=65639CB7",
    237,
    9.0,
    37,
    4.3
  ),
  createData(
    "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/272012476_2273064789500943_3135069605339884067_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9O1-YA8z7KwAX9R4XJZ&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfDzm5qjDs9LJ3NLlx5-TVepWWkn4uIaxKyEqosdJ4i40Q&oe=65636F75",
    262,
    16.0,
    24,
    6.0
  ),
  createData(
    "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/150859384_2016340621840029_6005421481631494320_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=COIOtd54DkkAX8zLV-u&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfC-N9rJ6uGY8Ns825hgDgO0cEvOhsztJ1UP0LCWp8TIWQ&oe=65865838",
    305,
    3.7,
    67,
    4.3
  ),
  createData(
    "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/61034573_1407251922748905_6084097512979824640_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=n_AbJ88Q9roAX-qSXpJ&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfCZnAH_0mE8E3Ge0RL37V6AAkilfOIKtK-whxcILw3Jlg&oe=658635A4",
    356,
    16.0,
    49,
    3.9
  ),
];

function Tables() {
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
                  <Button variant="primary" className={cx("btn-add-new")}>
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
    </>
  );
}
export default Tables;
