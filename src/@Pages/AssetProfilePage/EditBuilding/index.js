import React from 'react';
import {
  Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import useHook from './hook';
import InputItems from './EditBuildingInput';

const theme = createMuiTheme({ breakpoints: { values: { xxl: 2100 } } });

const useStyles = makeStyles(() => ({
  root: { [theme.breakpoints.up('xxl')]: { transform: 'scale(1.5)' } },
  blueBtn: { borderRadius: '6px', width: '150px' },
  blueBtnText: { color: '#FFFFFF', fontWeight: 600, fontSize: 16 },
  outlinedBtnText: { fontWeight: 600, fontSize: 16 },
  closeBtn: { cursor: 'pointer', float: 'right' },
  formControl: { paddingTop: 10, paddingBottom: 5 },
  wrapper: { position: 'relative' },
  buttonProgress: {
    color: 'green', position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12,
  },
}));

export default (props) => {
  const h = useHook(props);
  const classes = useStyles();

  return (
    <div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          className="my-2"
          style={{ color: '#FFFFFF', backgroundColor: props.isLoading ? '#808080a8' : 'var(--secondary-color)' }}
          onClick={() => h.setOpen(true)}
          disabled={props.isLoading}
        >
          <p className="text-white">Edit Asset Information</p>
        </Button>
        {props.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      <Dialog
        open={h.open}
        onClose={() => h.setOpen(false)}
        PaperProps={{ style: { borderRadius: 10, maxHeight: '40rem', width: 'auto' } }}
        fullWidth
        maxWidth="md"
        className={classes.root}
      >
        <DialogTitle>
          Edit Asset Information
          <Close className={classes.closeBtn} onClick={() => { h.setOpen(false); h.resetForm(); }} />
        </DialogTitle>
        <DialogContent style={{ overflowY: 'hidden' }}>
          <InputItems {...h} styles={classes.formControl} />
        </DialogContent>
        <DialogActions>
          <div className="d-flex justify-content-between w-100 px-3">
            <Box
              component="button"
              className="blue-button-outlined"
              onClick={() => { h.setOpen(false); h.resetForm(); }}
              style={{ borderRadius: '6px', width: '120px', padding: 6 }}
            >
              <h1 className={`${classes.outlinedBtnText} flex-standard`}>
                Cancel
              </h1>
            </Box>
            <Box
              component="button"
              className={`${classes.blueBtn} blue-button`}
              onClick={h.handleSubmit}
            >
              <h1 className={`${classes.blueBtnText} flex-standard`}>
                Update
              </h1>
            </Box>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
