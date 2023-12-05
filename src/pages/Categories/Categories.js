import React, { } from "react";

import { styled } from "@mui/material/styles";
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Stack, InputBase, } from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./Categories.module.scss";
import { dataTablePadWidth } from "../../providers/constants";

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

const renderCellWithButtons = () => {
  return <>
    <IconButton className={cx("btn-edit")} color="blue"><EditIcon /></IconButton>
    <IconButton className={cx("btn-delete")} color="red"><DeleteIcon /></IconButton>
  </>;
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 + dataTablePadWidth },
  { field: 'firstName', headerName: 'First name', width: 130 + dataTablePadWidth },
  { field: 'lastName', headerName: 'Last name', width: 130 + dataTablePadWidth },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90 + dataTablePadWidth,
  },
  {
    field: 'actions',
    headerName: '',
    description: "Actions",
    sortable: false,
    disableColumnMenu: true,
    filterable: false,
    align: 'right',
    flex: 1,
    renderCell: renderCellWithButtons
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 11, },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, },
];
//#endregion


function Categories() {
  return <div
    className={cx(
      "table-wrapper",
      "animate__animated",
      "animate__fadeInRight",
      "animate__fast"
    )}
  >
    <div style={{ padding: "10px", width: "auto" }}  >
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
              // onClick={}
              >
                Add New Category
              </Button>
              <IconButton aria-label="Add">
                <AddIcon />
              </IconButton>
            </Stack>
          </div>
          <div className={cx("action-search", "pt-10")}>
            <Search sx={{ boxShadow: "20px 3px 20px #0000000b", margin: 0 }}>
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

      <div className={cx("my-datatable-custom")}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          density="standard"//standard, comfortable, compact
          columnHeaderHeight={70}
          loading={false}
          rowSelection={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
      </div>
    </div>
  </div>;
}

export default Categories;
