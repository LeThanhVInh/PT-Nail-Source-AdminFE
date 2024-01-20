import React, { useState, useEffect, useRef } from 'react';
import HashLoader from 'react-spinners/HashLoader';

import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Stack, InputBase } from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  Cancel as CancelIcon,
  DeleteSweep as DeleteSweepIcon,
} from '@mui/icons-material';

import { dataTablePadWidth } from '../../providers/constants';
import {
  SearchIconWrapperCustom,
  SearchMediumCustom,
  StyledInputBaseCustom,
} from '../../components/CustomMUI/SearchMedium';
// import Loader from '../../components/Loader/Loader';
import StoreAPI from '../../api/Stores';
import ModalEdit from '../../components/_pages/Stores/ModalEdit/ModalEdit';
import classNames from 'classnames/bind';
import styles from './Stores.module.scss';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function Stores() {
  const modalRef = useRef();
  const [rows, setRows] = useState([]);
  const [isTableLoading, setTableLoading] = useState(true);
  const columns = [
    { field: 'RowNumber', headerName: 'No.', width: 70 + dataTablePadWidth },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'Address',
      headerName: 'Address',
      width: 260 + dataTablePadWidth,
    },
    {
      field: 'POSAmount',
      headerName: 'Number of POS',
      type: 'number',
      width: 200 + dataTablePadWidth,
    },
    {
      field: 'IsActive',
      headerName: 'Active status',
      type: 'boolean',
      align: 'center',
      width: 150 + dataTablePadWidth,
      renderCell: (data) => (
        <IconButton className={cx('btn-edit')}>
          {data.value === true ? <CheckCircleIcon sx={{ color: '#43a047' }} /> : <CancelIcon sx={{ color: '#686868' }} />}
        </IconButton>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      description: 'Actions',
      sortable: false,
      disableColumnMenu: true,
      filterable: false,
      align: 'center',
      flex: 1,
      renderCell: (data) => (
        <>
          <IconButton className={cx('btn-edit')} color="blue" onClick={() => OpenModal(false, data.id)}>
            <EditIcon />
          </IconButton>
          <IconButton className={cx('btn-delete')} color="red" onClick={() => DeleteItem(data.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const LoadDataTable = async () => {
    setTableLoading(true);
    const list = await StoreAPI.GetList();

    if (list !== null) {
      setRows(list);
    }
    setTableLoading(false);
  }
  const DeleteItem = (id) => {
    Swal.fire({
      title: 'CONFIRM ?',
      text: 'Are you sure you want to delete this item?',
      icon: 'question',//question, success,error, warning, info
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonColor: '#3085d6',
      cancelButtonText: "No",
      focusConfirm: false,
      focusCancel: true,
      allowEscapeKey: true,

    }).then(async (result) => {
      if (result.value)//
      {
        const res = await StoreAPI.Delete(id);
        if (res === true) {
          LoadDataTable();

          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showClass: { popup: "animate__animated animate__fadeInDown" },
            hideClass: { popup: "animate__animated animate__fadeOutUp" },
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          }).fire('Deleted successfully !', '', 'success');
        } else {
          Swal.fire({ icon: "error", title: "Error", text: "Delete failed !" });
        }
      }
    });
  }

  const OpenModal = (isInsert, id) => {
    if (modalRef.current && modalRef.current.openModal) {
      modalRef.current.openModal(isInsert, id);
    }
  };

  useEffect(() => {
    LoadDataTable();
  }, []);

  return (
    <div className={cx('table-wrapper', 'animate__animated', 'animate__fadeInRight', 'animate__fast')}>
      <div style={{ padding: '10px', width: 'auto' }}>
        <div className={cx('action-container')}>
          <div className={cx('title')}>
            <h3>Stores</h3>
          </div>
          <div className={cx('action-wrapper')}>
            <div className={cx('action-add', 'pt-10')}>
              <Stack direction="row" spacing={1}>
                <Button variant="primary" className={cx('btn-add-new')} onClick={() => OpenModal(true, null)}  >
                  Add New Store
                </Button>
                <IconButton aria-label="Delete rows" sx={{ color: 'var(--btn-primary)' }}>
                  <DeleteSweepIcon />
                </IconButton>
              </Stack>
            </div>
            <div className={cx('action-search', 'pt-10')}>
              <SearchMediumCustom sx={{ boxShadow: '0px 0px 5px var(--grey-shadow)', margin: 0 }}>
                <SearchIconWrapperCustom>
                  <SearchIcon />
                </SearchIconWrapperCustom>
                <StyledInputBaseCustom
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </SearchMediumCustom>
            </div>
          </div>
        </div>

        <ModalEdit ref={modalRef} LoadDataTable={LoadDataTable} />

        {
          isTableLoading
            ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <HashLoader
                color="black"
                loading={true}
                size={50}
                speedMultiplier={3}
              />
            </div>
            : <div className={cx('my-datatable-custom')}>
              <DataGrid
                getRowId={(row) => row.Id}
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 20, 50, 100]}
                checkboxSelection
                density="standard" //standard, comfortable, compact
                columnHeaderHeight={70}
                loading={false}
                rowSelection={true}
                onRowDoubleClick={(data, event) => OpenModal(false, data.id)}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
              />
            </div>
        }
      </div>
    </div>
  );
}

//#region const variable 
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'var(--bg-white-color)',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: 'var(--btn-edit)',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'var(--btn-edit)',

  '& .MuiInputBase-input': {
    backgroundColor: 'var(--bg-white-item)',

    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
//#endregion


export default Stores;
