import React from 'react';
import {
  Box, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@material-ui/core';
import { Close, AddOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import useHook from './hook';
import InputItems from './CreateInspectionInput';

const useStyles = makeStyles(() => ({
  blueBtn: { borderRadius: '6px', width: '150px' },
  blueBtnText: { color: '#FFFFFF', fontWeight: 600, fontSize: 16 },
  outlinedBtnText: { fontWeight: 600, fontSize: 16 },
  closeBtn: { cursor: 'pointer', float: 'right' },
  fontLabel: { fontSize: '10px' },
  formControl: { paddingTop: 10, paddingBottom: 5 },
  root: { '&$checked': { color: 'rgb(30, 52, 101)' }, transform: 'scale(0.8)' },
  dialogAction: {
    display: 'flex', justifyContent: 'space-between', padding: '0 20px', width: '100%',
  },
}));

export default function CreateInspection({
  project, onSave, projectPhase, user, modules, inspectionType,
}) {
  const h = useHook({
    project, onSave, user, inspectionType,
  });
  const classes = useStyles();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          style={{ color: '#FFFFFF', backgroundColor: 'var(--primary-color)', fontFamily: 'CeraProRegular' }}
          onClick={() => h.set_open(true)}
        >
          <AddOutlined />
          <p className="text-white">Add Inspection</p>
        </Button>
      </div>
      <Dialog
        open={h.open}
        onClose={h.handleClose}
        PaperProps={{ style: { borderRadius: 10, maxHeight: '40rem', width: 'auto' } }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Create New Inspection
          <Close className={classes.closeBtn} onClick={h.handleClose} />
        </DialogTitle>
        <DialogContent style={{ overflowY: 'hidden' }}>
          <InputItems
            {...h}
            styles={classes.formControl}
            projectPhase={projectPhase}
            module={modules}
          />
        </DialogContent>
        <DialogActions>
          <div className={classes.dialogAction}>
            <Box
              component="button"
              className="blue-button-outlined"
              onClick={h.handleClose}
              style={{ borderRadius: '6px', width: '120px' }}
            >
              <h1 className={`${classes.outlinedBtnText} flex-standard`}>
                Cancel
              </h1>
            </Box>
            <Box
              component="button"
              className={`${classes.blueBtn} blue-button`}
              onClick={h.handleSubmit}
              style={{ borderRadius: '6px', width: '180px' }}
            >
              <h1 className={`${classes.blueBtnText} flex-standard`}>
                Create Inspection
              </h1>
            </Box>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
