/* eslint-disable max-len */
import Button from '@Components/Button';
import {
  Dialog, DialogTitle, DialogActions, makeStyles, DialogContent, IconButton, Tooltip,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import metro_pin_icon from '@Assets/Icons/metro-pin.svg';

export default ({ images }) => {
  const classes = useStyles();
  const [open, set_open] = useState(false);

  return (
    <>
      <Tooltip title="Pin Image At Main Image">
        <IconButton
          className="color-gradient-inline"
          style={{
            padding: '0.50rem', width: '1rem', height: '1rem', borderRadius: 5,
          }}
          onClick={() => set_open(true)}
        >
          <img src={metro_pin_icon} height="20px" width="20px" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => set_open(false)}
        PaperProps={{ style: { borderRadius: 10 } }}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <p style={{ color: '#022C64', fontWeight: 600 }}>Pin Detections on Main Image</p>
            <IconButton onClick={() => set_open(false)}>
              <Close fontSize="small" />
            </IconButton>
          </div>
          <p className="text-light" style={{ fontSize: '14px' }}>Click anywhere on the map to pin a location of the detection on the main image</p>
        </DialogTitle>
        <DialogContent className="flex-standard py-0" style={{ border: '1px solid grey', height: '100vh' }}>
          {!images[0]?.src ? 'No Data' : <img src={`${process.env.REACT_APP_S3}/${images[0]?.src}`} style={{ maxHeight: '100%', maxWidth: '100%', display: 'block' }} />}
        </DialogContent>
        <DialogActions>
          <div className={classes.dialogAction}>
            <Button
              className="text-white"
              variant="outlined"
              style={{ border: '1px solid var(--main-color)', borderRadius: 20, backgroundColor: 'white' }}
              onClick={() => set_open(false)}
            >
              <p style={{ color: 'var(--main-color)' }}>CANCEL</p>
            </Button>
            <Button
              className="color-gradient-inline mx-3"
              style={{ borderRadius: 20 }}
              onClick={() => set_open(false)}
            >
              <p style={{ color: 'white' }}>SAVE PIN LOCATION</p>
            </Button>
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
