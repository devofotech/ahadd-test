import Button from '@Components/Button';
import {
  Dialog, DialogTitle, DialogActions, makeStyles, DialogContent, IconButton, withStyles, Checkbox, Grid, Tooltip,
} from '@material-ui/core';
import { AddOutlined, Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

export default ({ images, mainSetImage }) => {
  const classes = useStyles();
  const [open, set_open] = useState(false);
  const [selected_image, set_selected_image] = useState({});
  const handleChange = (event) => set_selected_image({ ...selected_image, [event.target.name]: event.target.checked });
  const main_image = images.find(e => !!e.is_main);

  useEffect(() => {
    if (!open) set_selected_image({});
  }, [open]);

  return (
    <>
      <Tooltip title="Coming Soon">
        <Button className="color-gradient-disabled" disabled style={{ borderRadius: 18 }} onClick={() => set_open(false)}>
          <AddOutlined style={{ color: 'white' }} />
          <p className="text-white">GENERATE REPORT</p>
        </Button>
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
            <p style={{ color: '#022C64', fontWeight: 600 }}>Generate Report</p>
            <IconButton onClick={() => set_open(false)}>
              <Close fontSize="small" />
            </IconButton>
          </div>
          <p className="text-secondary" style={{ fontSize: '14px' }}>Please select inspections to be included:</p>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'hidden' }}>
          <Grid container xs={12}>
            <Grid item xs={6} className="p-1">
              <Grid container xs={12} spacing={2} style={{ maxHeight: '65vh', overflow: 'auto' }}>
                {images.filter(e => !e.is_main).map((item) => (
                  <Grid item xs={4}>
                    <div className="position-relative">
                      <GreenCheckbox
                        className="position-absolute"
                        style={{ zIndex: 999, top: 0, right: 0 }}
                        checked={selected_image[item.id]}
                        onChange={handleChange}
                        name={item.id}
                      />
                      <div
                        style={{
                          ...styles.image,
                          backgroundImage: `url(${process.env.REACT_APP_S3}/${item?.src})`,
                        }}
                        loading="lazy"
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={6} className="flex-standard" style={{ border: '1px solid grey', borderRadius: 15, height: '65vh' }}>
              <img src={`${process.env.REACT_APP_S3}/${mainSetImage?.src}`} className="w-100" loading="lazy" />
            </Grid>
          </Grid>
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
              <p style={{ color: 'white' }}>GENERATE REPORT</p>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles(() => ({
  blueBtn: { borderRadius: '6px', width: '5rem' },
  blueBtnText: { color: '#FFFFFF', fontWeight: 600, fontSize: 16 },
  outlinedBtnText: { fontWeight: 600, fontSize: 16 },
  closeBtn: { cursor: 'pointer', float: 'right' },
  root: { '&$checked': { color: 'rgb(30, 52, 101)' }, transform: 'scale(0.8)' },
  dialogAction: {
    display: 'flex', justifyContent: 'flex-end', padding: '10px 0', width: '100%',
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: 'white',
    '&$checked': { color: 'var(--primary-color)' },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const styles = {
  image: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4/3',
    backgroundSize: 'cover',
  },
};
