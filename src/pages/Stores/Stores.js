import React, { useState, useEffect, useRef } from 'react';

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

import StoreAPI from '../../api/Stores';
import ModalEdit from '../../components/_pages/Stores/ModalEdit/ModalEdit';

import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

import classNames from 'classnames/bind';
import styles from './Stores.module.scss';

const cx = classNames.bind(styles);

function Stores() {
  const modalRef = useRef();
  const [rows, setRows] = useState([]);
  const [isTableLoading, setTableLoading] = useState(true);
  const [selectedRowsList, setSelectedRowsList] = React.useState([]);

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
          {data.value === true ? (
            <CheckCircleIcon sx={{ color: '#43a047' }} />
          ) : (
            <CancelIcon sx={{ color: '#686868' }} />
          )}
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
  };

  const DeleteItem = (id) => {
    Swal.fire({
      title: 'CONFIRM ?',
      text: 'Are you sure you want to delete this item?',
      icon: 'question', //question, success,error, warning, info
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No',
      focusConfirm: false,
      focusCancel: true,
      allowEscapeKey: true,
    }).then(async (result) => {
      if (result.value) {
        //
        const res = await StoreAPI.Delete(id);
        if (res === true) {
          LoadDataTable();

          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          }).fire('Deleted successfully !', '', 'success');
        } else {
          Swal.fire({ icon: 'error', title: 'Error', text: 'Delete failed !' });
        }
      }
    });
  };

  const DeleteMultiple = (ids) => {
    console.log('ids', ids);
    Swal.fire({
      title: 'CONFIRM ?',
      text: 'Are you sure you want to delete multiple items?',
      icon: 'question', //question, success,error, warning, info
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No',
      focusConfirm: false,
      focusCancel: true,
      allowEscapeKey: true,
    }).then(async (result) => {
      if (result) {
        const res = await StoreAPI.DeleteMultiple(ids);
        if (res === true) {
          LoadDataTable();

          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          }).fire('Deleted successfully !', '', 'success');
        } else {
          Swal.fire({ icon: 'error', title: 'Error', text: 'Delete failed !' });
        }
      }
    });
  };

  const handleSearch = async (value) => {
    setTableLoading(true);
    if (value.trim() !== '') {
      const list = await StoreAPI.GetList(value);
      if (list !== null) {
        setRows(list);
        setTableLoading(false);
      } else {
        setRows([]);
        setTableLoading(false);
      }
    } else {
      const res = await StoreAPI.GetList(null);
      setRows(res);
      setTableLoading(false);
    }
  };

  const debounced = useDebouncedCallback((value) => {
    handleSearch(value);
  }, 1000);

  const OpenModal = (isInsert, id) => {
    if (modalRef.current && modalRef.current.openModal) {
      modalRef.current.openModal(isInsert, id);
    }
  };

  const onRowsSelectionHandler = (ids) => {
    setSelectedRowsList(ids);
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
                <Button variant="primary" className={cx('btn-add-new')} onClick={() => OpenModal(true, null)}>
                  Add New Store
                </Button>
                <IconButton
                  aria-label="Delete rows"
                  sx={{ color: 'var(--btn-primary)' }}
                  onClick={() => DeleteMultiple(selectedRowsList)}
                >
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
                  onChange={(e) => debounced(e.target.value)}
                />
              </SearchMediumCustom>
            </div>
          </div>
        </div>

        <ModalEdit ref={modalRef} LoadDataTable={LoadDataTable} />

        {isTableLoading ? (
          <Loader colorLoader="#000" isLoading={isTableLoading} size={50} hasBackground={false} />
        ) : (
          <div className={cx('my-datatable-custom')}>
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
              onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Stores;
