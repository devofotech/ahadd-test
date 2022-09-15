/* eslint-disable max-len */
import Button from '@Components/Button';
import {
  Dialog, DialogTitle, DialogActions, makeStyles, DialogContent, IconButton, Tooltip,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import metro_pin_icon from '@Assets/Icons/metro-pin.svg';
import NoData from '@Assets/Images/Data-not-found5.svg';
import YellowMarker from '@Assets/Icons/Marker3.svg';

export default ({
  mainSetImage, onSubmit, mainImage, openPinLocationDialog, setOpenPinLocationDialog,
}) => {
  const classes = useStyles();
  const [mouse_coordinate, set_mouse_coordinate] = useState({ x: 50, y: 50 });
  const [image_size, set_image_size] = useState({ x: 0, y: 0 });
  const [is_ready, set_is_ready] = useState(false);

  const convertToPercent = (offset, axis) => offset / image_size[axis] * 100;
  const convertToPosition = (axis) => mouse_coordinate[axis] / 100 * image_size[axis];

  const setCoordinate = () => {
    let coordinate = { x: 50, y: 50 };
    if (!!mainImage.pin_on_main) {
      const pin = mainImage.pin_on_main.split(',');
      coordinate = { x: Number(pin[0]), y: Number(pin[1]) };
    }
    set_mouse_coordinate(coordinate);
  };

  useEffect(() => {
    if (!is_ready) return;
    setCoordinate();
  }, [mainImage]);

  const onImgLoad = ({ target: img }) => {
    if (is_ready) return;
    const { offsetHeight, offsetWidth } = img;
    set_image_size({ x: offsetWidth, y: offsetHeight });
    setCoordinate();
    set_is_ready(true);
  };

  const setPinLocation = (e) => {
    e.preventDefault();
    set_mouse_coordinate({ x: convertToPercent(e.nativeEvent.offsetX, 'x'), y: convertToPercent(e.nativeEvent.offsetY, 'y') });
  };

  const handleSubmit = () => {
    const data = { InspectionFileId: mainImage.id, pin_on_main: `${mouse_coordinate.x},${mouse_coordinate.y}` };
    onSubmit(data);
    setOpenPinLocationDialog(false);
  };

  return (
    <>
      <Tooltip title="Pin Image At Main Image">
        <IconButton
          className="color-gradient-inline"
          style={{
            padding: '0.50rem', width: '1rem', height: '1rem', borderRadius: 5,
          }}
          onClick={() => setOpenPinLocationDialog(true)}
        >
          <img src={metro_pin_icon} height="20px" width="20px" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openPinLocationDialog}
        onClose={() => setOpenPinLocationDialog(false)}
        PaperProps={{ style: { borderRadius: 10 } }}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <p style={{ color: '#022C64', fontWeight: 600, display: 'flex' }}>Pin Detections on Main Image {!mainImage.pin_on_main && <span style={{ color: 'red' }}>&nbsp;(No Set Yet)</span>}</p>
            <IconButton onClick={() => setOpenPinLocationDialog(false)}>
              <Close fontSize="small" />
            </IconButton>
          </div>
          <p className="text-secondary" style={{ fontSize: '14px' }}>Drag the marker anywhere on the map to pin a location of the detection on the main image</p>
        </DialogTitle>
        <DialogContent className="flex-standard py-0" style={{ border: '1px solid grey', height: '100vh' }}>
          {!mainSetImage ? (
            <div className="d-flex justify-content-center">
              <img src={NoData} style={{ width: '46rem', aspectRatio: '3/2', objectFit: 'cover' }} />
            </div>
          ) : (
            <div className="position-relative" style={{ cursor: 'default', height: '100%' }}>
              {is_ready && (
                <img
                  src={YellowMarker}
                  className="position-absolute"
                  style={{
                    height: 30, left: convertToPosition('x') - 10, top: convertToPosition('y') - 30, zIndex: 9999,
                  }}
                  draggable
                />
              )}
              <img
                src={`${process.env.REACT_APP_S3}/${mainSetImage?.path}`}
                style={{ height: '100%', width: '100%', display: 'block' }}
                onDrop={setPinLocation}
                onDragOver={(e) => e.preventDefault()}
                onLoad={onImgLoad}
                draggable={false}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <div className={classes.dialogAction}>
            <Button
              className="text-white"
              variant="outlined"
              style={{ border: '1px solid var(--main-color)', borderRadius: 20, backgroundColor: 'white' }}
              onClick={() => setOpenPinLocationDialog(false)}
            >
              <p style={{ color: 'var(--main-color)' }}>CANCEL</p>
            </Button>
            {!!mainSetImage && (
              <Button
                className="color-gradient-inline mx-3"
                style={{ borderRadius: 20 }}
                onClick={handleSubmit}
              >
                <p style={{ color: 'white' }}>SAVE PIN LOCATION</p>
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: { '&$checked': { color: 'rgb(30, 52, 101)' }, transform: 'scale(0.8)' },
  dialogAction: {
    display: 'flex', justifyContent: 'flex-end', padding: '10px 0', width: '100%',
  },
}));
