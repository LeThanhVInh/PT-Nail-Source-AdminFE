import { useState } from 'react';
import { FormControlLabel, FormGroup, Typography } from '@mui/material';

import { Accordion, AccordionSummary, AccordionDetails } from '../../../components/CustomMUI/Accordion';
import { TextFieldProductEdit } from '../../../components/CustomMUI/ProductEdit/TextFieldProductEdit';
import { IOSSwitch } from '../../../components/CustomMUI/IOSSwitch';

import classNames from 'classnames/bind';
import styles from '../ProductEdit.module.scss';
const cx = classNames.bind(styles);

function ProductManagement() {
  //Accordion
  const [expanded, setExpanded] = useState('panel1');

  const handleChangeExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
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
              <p>Product Management</p>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={cx('item-title-content')}>
              <div className={cx('item-title-content-aside')}>
                <div className={cx('aside-text-info')}>
                  <strong>Condition</strong>
                  <p>Required</p>
                </div>
                <div className={cx('aside-text-tip')}>
                  <p>If the status is active, your product can be searched for by potential buyers.</p>
                </div>
              </div>
              <div className={cx('item-title-content-main', 'fl-start')}>
                <FormGroup sx={{ marginLeft: '10px' }}>
                  <FormControlLabel
                    control={<IOSSwitch defaultChecked />}
                    label={
                      <Typography
                        style={{
                          marginLeft: '10px',
                          fontSize: '14px',
                          color: 'var(--text-color)',
                        }}
                      >
                        Active
                      </Typography>
                    }
                  />
                </FormGroup>
              </div>
            </div>

            <div className={cx('item-title-content')}>
              <div className={cx('item-title-content-aside')}>
                <div className={cx('aside-text-info')}>
                  <strong>Product Stock</strong>
                  <p>Required</p>
                </div>
              </div>
              <div className={cx('item-title-content-main')}>
                <TextFieldProductEdit
                  fullWidth
                  placeholder="Input Product Stock"
                  id="fullWidth"
                  inputProps={{
                    style: {
                      padding: '7.5px 14px',
                    },
                  }}
                />
              </div>
            </div>

            <div className={cx('item-title-content')}>
              <div className={cx('item-title-content-aside')}>
                <div className={cx('aside-text-info')}>
                  <strong>SKU (Stock Keeping Unit)</strong>
                </div>
                <div className={cx('aside-text-tip')}>
                  <p>Add a video so that buyers are more interested in your product.Learn more.</p>
                </div>
              </div>
              <div className={cx('item-title-content-main')}>
                <TextFieldProductEdit
                  fullWidth
                  placeholder="Input SKU"
                  id="fullWidth"
                  inputProps={{
                    style: {
                      padding: '7.5px 14px',
                    },
                  }}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default ProductManagement;
