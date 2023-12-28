import { useState } from 'react';
import { Clear as ClearIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material/';

import { IconButton, Tooltip, Button } from '@mui/material';

import { styled } from '@mui/material/styles';

import { Accordion, AccordionDetails, AccordionSummary } from '../../../components/CustomMUI/Accordion';

import classNames from 'classnames/bind';
import styles from '../ProductEdit.module.scss';
const cx = classNames.bind(styles);

///Image
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

//Custom
const ButtonCustom = styled(Button)(({ theme }) => ({
  marginBottom: '20px',
  color: 'var(--grey-color-text)',
  width: '100%',
  height: '46px',
  fontSize: '14px',
  textTransform: 'capitalize',
  borderColor: 'var(--gray-color)',
  // flexGrow: 1,
  marginLeft: '20px',
  ':hover': {
    borderColor: 'var(--primary-color)',
  },
  [theme.breakpoints.down('md')]: {
    flexGrow: 1,
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
  },
  [theme.breakpoints.up('lg')]: {
    flexGrow: 0,
  },
}));

const imageDummy = [
  {
    id: 1,
    imgSrc:
      'https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmFpbHN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    imgSrc:
      'https://media.istockphoto.com/id/1334253013/photo/close-up-manicured-womans-hands-on-pink-background.jpg?s=612x612&w=0&k=20&c=JuFZMI6Hd7iS_ZfU124XegjIFlI_ODHwpGVvNztAW4g=',
  },
  {
    id: 3,
    imgSrc:
      'https://thumbs.dreamstime.com/b/nail-design-white-dots-french-manicure-pink-varnish-various-shades-47275908.jpg',
  },
  {
    id: 4,
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmGxoq4JMhnoGLosAzKYzAdHcfQdCS8XybzU7zg47lYNtNwOXH_B5rwUmP8KLi2zJmhxA&usqp=CAU',
  },
  {
    id: 5,
    imgSrc:
      'https://imgix.bustle.com/uploads/image/2022/3/1/e9d848ee-1cfd-4844-9ef4-a663208c1cb4-e116cedc-9e3b-46b0-83ba-d2d7d97d5ef7-shutterstock-1707419269.jpeg?w=2000&h=1090&fit=crop&crop=faces&auto=format%2Ccompress',
  },
];

function UploadProduct() {
  const [expanded, setExpanded] = useState('panel1');

  const handleChangeExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  ///Upload Product
  const [imgList, SetImgList] = useState(imageDummy);
  //Upload Product
  const handleDelete = (res) => {
    const listWithTrue = imgList.filter((x) => x.id !== res.id);
    SetImgList(listWithTrue);
  };

  return (
    <div className={cx('content-items')}>
      <div className={cx('item')}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChangeExpanded('panel1')}
          sx={{ padding: 0, border: 0 }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{ backgroundColor: 'var(--white-color)' }}
          >
            <div className={cx('item-title')}>
              <p>Upload Product</p>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={cx('item-title-content')}>
              <div className={cx('item-title-content-aside')}>
                <div className={cx('aside-text-info')}>
                  <strong>Product Photos</strong>
                  <p>Required</p>
                </div>
                <div className={cx('aside-text-tip')}>
                  <p>
                    The image format is .jpg .jpeg .png and a minimum size of 300 x 300 pixels (For optimal images use a
                    minimum size of 700 x 700 pixels).
                  </p>
                  <p>
                    Select product photos or drag and drop up to 5 photos at once here. Include min. 3 attractive photos
                    to make the product more attractive to buyers.
                  </p>
                </div>
              </div>
              <div className={cx('item-title-content-main-img')}>
                <div className={cx('main-img')}>
                  {imgList.map((res) => (
                    <div key={res.id} className={cx('img-item')}>
                      <img src={res.imgSrc} alt={res.id} />
                      <Tooltip title="Remove this image?" arrow placement="top">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          sx={{
                            backgroundColor: '#b91c1c',
                            width: '20px',
                            height: '20px',
                            ':hover': {
                              backgroundColor: '#b91c1c',
                            },
                          }}
                          className={cx('img-item-icon')}
                          onClick={() => handleDelete(res)}
                        >
                          <ClearIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ))}
                </div>
                <div style={{ width: '100%' }}>
                  <ButtonCustom
                    fullWidth
                    component="label"
                    // variant="outlined"
                    startIcon={<CloudUploadIcon sx={{ color: 'var(--grey-color-text)' }} />}
                  >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </ButtonCustom>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default UploadProduct;
