import React, { useState } from 'react';
import {
  Dialog, DialogContent, DialogTitle, Button, Grid, IconButton, DialogContentText,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import metro_pin_icon from '@Assets/Icons/metro-pin.svg';

const useStyles = makeStyles(() => ({
  closeBtn: { cursor: 'pointer', color: '#022C64' },
  root: { '&$checked': { color: 'rgb(30, 52, 101)' }, transform: 'scale(0.8)' },
}));

export default () => {
  const classes = useStyles();
  const [open, set_open] = useState(false);
  return (
    <>
      <IconButton className="color-gradient-inline" style={{ width: 18, height: 18 }} onClick={() => set_open(true)}>
        <img src={metro_pin_icon} height="18px" width="18px" />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => set_open(false)}
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle>
          <div className="w-100 d-flex justify-content-between">
            <p style={{ fontSize: 32, color: '#022C64', fontWeight: 600 }}>Set Main Image</p>
            <Close className={classes.closeBtn} onClick={() => set_open(false)} />
          </div>
          <DialogContentText className="m-0 p-0">
            Select an image as main image. Best to select image that cover widest view of the inspection site.
          </DialogContentText>
        </DialogTitle>
        <DialogContent className="d-flex justify-content-center pb-4">
          <Grid container>
            <Grid container item xs={12} lg={7} xl={7} spacing={2} style={{ maxHeight: '70vh', overflowX: 'auto' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(() => (
                <Grid item xs={3}>
                  <div style={{}}>
                    <img
                      className="border"
                      style={{ width: '100%', borderRadius: 10, objectFit: 'cover' }}
                      src={`${process.env.REACT_APP_S3}/static/media/defaultAssetImg-01.png`}
                      alt="asset"
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
            <Grid container item xs={12} lg={5} xl={5} className="py-3 pl-3">
              <Grid item xs={12} className="border flex-standard position-relative" style={{ height: '50vh' }}>
                <img
                  loading="lazy"
                  style={{ objectFit: 'contain', borderRadius: 10, height: '100%' }}
                  src={`${process.env.REACT_APP_S3}/static/media/defaultAssetImg-01.png`}
                  alt="asset"
                />
              </Grid>
              <Grid item xs={12} className="d-flex" direction="column" style={{ alignItems: 'flex-end' }}>
                <p style={{ color: '#022C64', fontSize: 18 }}>Title</p>
                <p className="text-light">{moment().format('DD MMM YYYY')}</p>
                <p className="text-light">{moment().format('h:mm A')}</p>
              </Grid>
              <Grid item xs={12} className="d-flex justify-content-end" style={{}}>
                <div>
                  <Button className="color-gradient-inline" style={{ borderRadius: 18, color: 'white' }} onClick={() => set_open(false)}>
                    Set Main Image
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
