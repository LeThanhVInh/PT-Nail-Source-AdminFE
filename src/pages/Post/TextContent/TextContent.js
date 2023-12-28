import { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import { Accordion, AccordionSummary, AccordionDetails } from '../../../components/CustomMUI/Accordion';

import classNames from 'classnames/bind';
import styles from './TextContent.module.scss';
const cx = classNames.bind(styles);

function TextContent() {
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
            sx={{ backgroundColor: 'var(--white-color-outline)' }}
          >
            <div className={cx('item-title')}>
              <p>Text Content</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={cx('item-title-content')}>
              <div className={cx('item-title-content-main')}>
                <SunEditor defaultValue="<p>Content of the editor.</p>" height="100%" />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default TextContent;
