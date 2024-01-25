import React, { useState, useEffect, useRef } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Stack, FormControlLabel } from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  DeleteForever as DeleteForeverIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

import { dataTablePadWidth } from '../../providers/constants';
import {
  SearchIconWrapperCustom,
  SearchMediumCustom,
  StyledInputBaseCustom,
} from '../../components/CustomMUI/SearchMedium';

import CategoryAPI from '../../api/Categories';
import ModalEdit from '../../components/_pages/Categories/ModalEdit/ModalEdit';
import constants from '../../providers/constants';

import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { useDebouncedCallback } from 'use-debounce';
import { Android12Switch } from '../../components/Switch/AndroidSwitch/AndroidSwitch';
import noImage from '../../assets/images/no-image-available.png';

import classNames from 'classnames/bind';
import styles from './Categories.module.scss';
const cx = classNames.bind(styles);

export default function Categories() {
  const modalRef = useRef();
  const searchRef = useRef();
  const [rows, setRows] = useState([]);
  const [isTableLoading, setTableLoading] = useState(true);
  const [selectedRowsId, setSelectedRowsId] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const columns = [
    { field: 'RowNumber', headerName: 'No.', width: 70 + dataTablePadWidth },
    {
      field: 'RepresentationImageLink',
      headerName: 'Image',
      sortable: false,
      disableColumnMenu: true,
      filterable: false,
      align: 'center',
      width: 150,
      renderCell: (data) => {
        let src = noImage;
        if (data.value !== null)
          src = constants.apiUrl + '/' + data.value;
        return <img src={src} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />;
      },
    },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'Slug',
      headerName: 'Slug',
      flex: 1,
    },
    {
      field: 'IsActive',
      headerName: 'Active status',
      type: 'number',
      align: 'center',
      width: 150 + dataTablePadWidth,
      renderCell: (data) => (
        <FormControlLabel
          control={
            <Android12Switch
              defaultChecked={data.value}
              onChange={async (event, isChecked) => await CategoryAPI.UpdateActiveStatus(data.id, isChecked)}
            />
          }
          label="Active"
        />
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

  const LoadDataTable = async (searchValue) => {
    setTableLoading(true);
    const list = await CategoryAPI.GetList(searchValue);
    if (list !== null) {
      setRows(list);
    } else {
      setRows([]);
    }
    setSelectedRowsId([]);
    setTableLoading(false);
  };

  useEffect(() => {
    LoadDataTable(searchValue);
  }, [searchValue]);

  const DeleteItem = (id) => {
    Swal.fire({
      title: 'CONFIRM',
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
        const res = await CategoryAPI.Delete(id);
        if (res === true) {
          LoadDataTable(searchValue);

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
    Swal.fire({
      title: 'CONFIRM',
      text: 'Are you sure you want to delete selected items?',
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
        const res = await CategoryAPI.DeleteMultiple(ids);
        if (res === true) {
          LoadDataTable(searchValue);
          setSelectedRowsId([]);

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

  const debounced = useDebouncedCallback((value) => {
    handleSearch(value);
  }, 500);

  const handleSearch = async (value) => {
    setSearchValue(value);
    setTableLoading(true);
    if (value.trim() !== '') {
      const list = await CategoryAPI.GetList(value);
      if (list !== null) {
        setRows(list);
        setTableLoading(false);
      } else {
        setRows([]);
        setTableLoading(false);
      }
    } else {
      const res = await CategoryAPI.GetList(null);
      setRows(res);
      setTableLoading(false);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    searchRef.current.value = '';
  };

  const OpenModal = (isInsert, id) => {
    if (modalRef.current && modalRef.current.openModal) {
      modalRef.current.openModal(isInsert, id);
    }
  };

  return (
    <div className={cx('table-wrapper', 'animate__animated', 'animate__fadeInRight', 'animate__fast')}>
      <div style={{ padding: '10px', width: 'auto' }}>
        <div className={cx('action-container')}>
          <div className={cx('title')}>
            <h3>Categories</h3>
          </div>
          <div className={cx('action-wrapper')}>
            <div className={cx('action-add', 'pt-10')}>
              <Stack direction="row" spacing={1}>
                <Button variant="primary" className={cx('btn-add-new')} onClick={() => OpenModal(true, null)}>
                  Add New Category
                </Button>
                {selectedRowsId.length <= 0 ? (
                  <div></div>
                ) : (
                  <IconButton
                    aria-label="Delete rows"
                    sx={{ color: 'var(--btn-delete)' }}
                    onClick={() => DeleteMultiple(selectedRowsId)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                )}
              </Stack>
            </div>
            <div className={cx('action-search', 'pt-10')}>
              <SearchMediumCustom
                sx={{ boxShadow: '0px 0px 5px var(--grey-shadow)', margin: 0, backgroundColor: 'var(--input-color)' }}
              >
                <SearchIconWrapperCustom>
                  <SearchIcon />
                </SearchIconWrapperCustom>
                <StyledInputBaseCustom
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => debounced(e.target.value)}
                  onBlur={(e) => setSearchValue(e.target.value)}
                  inputRef={searchRef}
                  sx={{ paddingRight: '35px' }}
                />
                {searchValue === '' ? null : (
                  <IconButton
                    aria-label="clear"
                    onClick={handleClear}
                    sx={{ position: 'absolute', right: 0, color: 'var(--text-color)' }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </SearchMediumCustom>
            </div>
          </div>
        </div>

        <ModalEdit ref={modalRef} LoadDataTable={() => LoadDataTable(searchValue)} />

        {
          isTableLoading
            ? <Loader colorLoader="#000" isLoading={isTableLoading} size={50} hasBackground={false} />
            : (
              <div className={cx('my-datatable-custom')}>
                <DataGrid
                  getRowId={(row) => row.Id}
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[10, 20, 50, 100]}
                  checkboxSelection
                  density="standard" //standard, comfortable, compact
                  columnHeaderHeight={70}
                  rowHeight={100}
                  loading={false}
                  rowSelection={true}
                  onRowDoubleClick={(data, event) => OpenModal(false, data.id)}
                  onRowSelectionModelChange={setSelectedRowsId}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                />
              </div>
            )
        }
      </div>
    </div>
  );
}