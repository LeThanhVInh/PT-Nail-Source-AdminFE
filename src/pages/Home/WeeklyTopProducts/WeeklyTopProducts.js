import React, { useState, useRef } from 'react';

import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Stack,
  Checkbox,
  Chip,
} from '@mui/material';

import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, TaskAlt as TaskAltIcon } from '@mui/icons-material';

import classNames from 'classnames/bind';
import styles from './WeeklyTopProducts.module.scss';
const cx = classNames.bind(styles);

//#region const variable

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: 'var(--text-color)',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'transparent',
    color: 'var(--text-color)',
    borderSpacing: '0 20px',
    border: 0,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderSpacing: '0 20px',
    border: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    border: 0,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CheckboxTable = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: 'var(--primary-white)',
  },
  '&.MuiCheckbox-indeterminate': {
    color: 'var(--primary-white)',
  },
}));

const rows = [
  {
    id: 1,
    images:
      'https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmFpbHN8ZW58MHx8MHx8fDA%3D',
    categoryName: '11111111111111111',
    slug: '1',
    status: 'active',
  },
  {
    id: 2,
    images:
      'https://media.istockphoto.com/id/1334253013/photo/close-up-manicured-womans-hands-on-pink-background.jpg?s=612x612&w=0&k=20&c=JuFZMI6Hd7iS_ZfU124XegjIFlI_ODHwpGVvNztAW4g=',
    categoryName: '222222222222222222',
    slug: '2',
    status: 'active',
  },
  {
    id: 3,
    images:
      'https://thumbs.dreamstime.com/b/nail-design-white-dots-french-manicure-pink-varnish-various-shades-47275908.jpg',
    categoryName: '33333333333333333333',
    slug: '3',
    status: 'deactive',
  },
  {
    id: 4,
    images:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmGxoq4JMhnoGLosAzKYzAdHcfQdCS8XybzU7zg47lYNtNwOXH_B5rwUmP8KLi2zJmhxA&usqp=CAU',
    categoryName: '4444444444444444',
    slug: '4',
    status: 'deactive',
  },
  {
    id: 5,
    images:
      'https://imgix.bustle.com/uploads/image/2022/3/1/e9d848ee-1cfd-4844-9ef4-a663208c1cb4-e116cedc-9e3b-46b0-83ba-d2d7d97d5ef7-shutterstock-1707419269.jpeg?w=2000&h=1090&fit=crop&crop=faces&auto=format%2Ccompress',
    categoryName: '55555555555555555',
    slug: '5',
    status: 'deactive',
  },
  {
    id: 6,
    images:
      'https://media.istockphoto.com/id/1334253013/photo/close-up-manicured-womans-hands-on-pink-background.jpg?s=612x612&w=0&k=20&c=JuFZMI6Hd7iS_ZfU124XegjIFlI_ODHwpGVvNztAW4g=',
    categoryName: '66666666666666666',
    slug: '6',
    status: 'active',
  },
  {
    id: 7,
    images:
      'https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmFpbHN8ZW58MHx8MHx8fDA%3D',
    categoryName: '7777777777777777',
    slug: '7',
    status: 'active',
  },
];
//#endregion

export default function WeeklyTopProducts() {
  const modalRef = useRef();
  const [isCheckedItem, setIsCheckedItem] = useState([]);

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
    <div className={cx('weekly-top-products-wrapper', 'mt-20')}>
      <div className={cx('title')}>
        <h3>Weekly Top Products</h3>
      </div>
      <div className={cx('table-wrapper', 'animate__animated', 'animate__fadeInRight', 'animate__fast')}>
        <TableContainer sx={{ m: '10px', width: 'auto' }} elevation={1}>
          <div style={{ overflow: 'auto' }}>
            <Table
              stickyHeader
              sx={{
                minWidth: 700,
                borderSpacing: '0 10px',
                borderCollapse: 'unset',
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ width: '70px' }}>
                    <CheckboxTable
                      checked={isCheckedItem.length === rows.length}
                      indeterminate={isCheckedItem.length !== rows.length && isCheckedItem.length > 0}
                      onChange={(event) => checkAllRow(event.target.checked)}
                      sx={{ color: 'var(--grey-color)' }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ width: '90px' }}>
                    IMAGES
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ minWidth: '100px' }}>
                    PRODUCT NAME
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ minWidth: '100px' }}>
                    STOCK
                  </StyledTableCell>
                  <StyledTableCell align="center">STATUS</StyledTableCell>
                  <StyledTableCell align="center">ACTIONS</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow
                    hover
                    key={row.id}
                    sx={{
                      boxShadow: 'var(--box-shadow)',
                      backgroundColor: 'var(--white-color-outline)',
                    }}
                  >
                    <StyledTableCell align="left">
                      <CheckboxTable
                        sx={{ color: 'var(--grey-color)' }}
                        key={rows.id}
                        checked={isCheckedItem.includes(row.id)}
                        onChange={(event) => checkOneRow(event.target.checked, row.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <img src={row.images} alt={1} className={cx('images-table')} />
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.categoryName}</StyledTableCell>
                    <StyledTableCell align="left">{row.slug}</StyledTableCell>

                    <StyledTableCell align="center">
                      {row.status === 'active' ? (
                        <Chip
                          sx={{
                            backgroundColor: 'var(--bg-white-color)',
                            color: 'var(--text-color)',
                          }}
                          icon={<TaskAltIcon sx={{ color: 'var(--green-color) !important' }} />}
                          label="Active"
                        />
                      ) : (
                        <Chip
                          sx={{
                            backgroundColor: 'var(--bg-white-color)',
                            color: 'var(--text-color)',
                          }}
                          icon={<TaskAltIcon sx={{ color: 'var(--red-color) !important' }} />}
                          label="Inactive"
                        />
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="center" className={cx('border-right')}>
                      <IconButton className={cx('btn-edit')}>
                        <EditIcon />
                      </IconButton>
                      <IconButton className={cx('btn-delete')}>
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
    </div>
  );
}
