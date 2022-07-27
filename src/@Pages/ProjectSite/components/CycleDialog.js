import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TextField,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { Close } from '@material-ui/icons';

export default function CycleDialog({
  openCycleDialog, setOpenCycleDialog, onSave,
}) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [cycle, setCycle] = useState();
  const saveCycle = () => {
    if (!cycle) return;
    onSave(cycle, selectedDate);
    setOpenCycleDialog(false);
  };
  return (
    <Dialog
      open={openCycleDialog}
      onClose={() => setOpenCycleDialog(false)}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <p style={{ color: '#5b6272', fontWeight: 600 }}>Select Cycle</p>
          <IconButton aria-label="close" onClick={() => setOpenCycleDialog(false)}>
            <Close fontSize="small" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className="position-relative">
        <Grid container>
          {[
            {
              label: 'Cycle',
              children: (
                <TextField
                  placeholder="Enter here"
                  size="small"
                  fullWidth
                  variant="outlined"
                  select
                  value={cycle}
                  onChange={(e) => setCycle(e.target.value)}
                >
                  <MenuItem value={1} className="text-dark">Cycle 1</MenuItem>
                  <MenuItem value={2} className="text-dark">Cycle 2</MenuItem>
                  <MenuItem value={3} className="text-dark">Cycle 3</MenuItem>
                  <MenuItem value={4} className="text-dark">Cycle 4</MenuItem>
                  <MenuItem value={5} className="text-dark">Cycle 5</MenuItem>
                </TextField>
              ),
            },
            {
              label: 'Year',
              children: (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    views={['year']}
                    value={selectedDate}
                    onChange={handleDateChange}
                    inputVariant="outlined"
                    style={{ width: '100%' }}
                    size="small"
                    disableFuture
                  />
                </MuiPickersUtilsProvider>
              ),
            },
          ].map(({ label, children }) => (
            <Grid item container className="my-2">
              <Grid container item xs={3} alignItems="center">
                <p style={{ color: 'var(--dark-color)' }}>{label}</p>
              </Grid>
              <Grid item xs={9}>
                {children}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          className="text-white"
          variant="outlined"
          style={{ borderColor: 'var(--main-color)', borderRadius: 20 }}
          onClick={() => setOpenCycleDialog(false)}
        >
          <p style={{ color: 'var(--main-color)' }}>Cancel</p>
        </Button>
        <Button
          className="color-gradient-inline mx-3"
          style={{ borderRadius: 20 }}
          onClick={saveCycle}
        >
          <p style={{ color: 'white' }}>Save</p>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
