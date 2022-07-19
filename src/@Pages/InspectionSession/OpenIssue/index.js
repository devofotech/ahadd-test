import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import Button from '@Components/Button';
import AutoRotatingCarouselModal from '@Components/PhotoSlider';
import ImageTilesDialog from './ImageTilesDialog';

import useHook from './hook';

export default (props) => {
  const h = useHook(props);
  const [openTiles, setOpenTiles] = useState(false);
  const [openCarousel, setOpenCarousel] = useState({ open: false });
  const handleClickCarousel = (idx) => { setOpenCarousel({ open: true, idx }); setOpenTiles(false); };
  const handleCloseCarousel = () => { setOpenCarousel({ open: false, idx: null }); setOpenTiles(true); h.setFiles([]); };
  const onHandleClose = () => { setOpenTiles(false); h.setSelectedInspectionId(); props.setIsUpdated(prev => prev + 1); };
  return (
    <div className="flex-standard mx-auto" style={{ height: '3rem' }}>
      {!props.has_non_compliance ? (
        <div>Compliance</div>
      ) : (
        <div className="position-relative mx-3 w-100">
          <Button
            className="w-100"
            style={{ fontSize: 13, height: '2rem', fontFamily: 'CeraProRegular' }}
            onClick={() => { setOpenTiles(true); h.setSelectedInspectionId(props.id); }}
          >
            {!!props.open_case ? 'Open' : 'Closed'}
          </Button>
          {!!props.open_case && (
            <Chip
              label={props.open_case}
              size="small"
              className="position-absolute"
              style={{
                backgroundColor: 'red', color: 'white', top: -7, right: -7, transform: 'scale(0.8)',
              }}
            />
          )}
          <ImageTilesDialog
            open={openTiles}
            setOpen={setOpenTiles}
            onClose={onHandleClose}
            annotations={h.annotations}
            onClickImage={handleClickCarousel}
          />
          <AutoRotatingCarouselModal
            image={h.annotations}
            handleOpen={openCarousel}
            setHandleOpen={setOpenCarousel}
            handleClose={handleCloseCarousel}
            files={h.files}
            setFiles={h.setFiles}
            onUpload={h.onUploadCloseIssue}
            currentUser={props.currentUser}
            {...h}
          />
        </div>
      )}
    </div>
  );
};
