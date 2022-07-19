import React, { useState } from 'react';
import {
  Box, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import { GetApp, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import DateRange from '@Components/DateRange';

const useStyles = makeStyles(() => ({
  blueBtn: { borderRadius: '6px', width: '210px' },
  blueBtnText: { color: '#FFFFFF', fontWeight: 600, fontSize: 16 },
  outlinedBtnText: { fontWeight: 600, fontSize: 16 },
  closeBtn: { cursor: 'pointer', float: 'right' },
}));

export default function GenerateReport({ project, callback }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dateSelectionRange, setDateSelectionRange] = useState({ startDate: new Date(), endDate: new Date() });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGenerate = () => {
    const startDate = moment(dateSelectionRange.startDate).format('YYYY-MM-DD');
    const endDate = moment(dateSelectionRange.endDate).format('YYYY-MM-DD');
    callback({
      project_uuid: project.uuid,
      DivisionId: project.DivisionId,
      startDate,
      endDate,
    });
    setOpen(false);
  };

  return (
    <div>
      <Box
        component="button"
        className={`${classes.blueBtn} blue-button`}
        onClick={handleClickOpen}
      >
        <h1 className={`${classes.blueBtnText} flex-standard`}>
          <GetApp />
          Generate Report
        </h1>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { borderRadius: 10 } }}
      >
        <DialogTitle>
          Generate Report
          <Close
            className={classes.closeBtn}
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent style={{ overflowY: 'hidden' }}>
          <div style={{ padding: '0 20px' }}>
            <DateRange
              selectionRange={dateSelectionRange}
              setSelectionRange={setDateSelectionRange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="d-flex justify-content-between" style={{ padding: '0 40px', width: '100%' }}>
            <Box
              component="button"
              className="blue-button-outlined"
              onClick={handleClose}
              style={{ borderRadius: '6px', width: '120px' }}
            >
              <h1 className={`${classes.outlinedBtnText} flex-standard`}>
                Cancel
              </h1>
            </Box>
            <Box
              component="button"
              className={`${classes.blueBtn} blue-button`}
              onClick={handleGenerate}
            >
              <h1 className={`${classes.blueBtnText} flex-standard`}>
                <GetApp />
                Generate Report
              </h1>
            </Box>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
