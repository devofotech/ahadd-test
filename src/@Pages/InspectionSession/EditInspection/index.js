import React from 'react';
import {
  Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Grid, TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { EditIcon } from '@Assets/Icons';
import { todayDateTime } from '@Helpers';
import useHook from './hook';

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

export default function CreateInspection(props) {
  const h = useHook(props);
  const classes = useStyles();

  return (
    <div>
      <IconButton
        variant="contained"
        style={{ width: 24, height: 24 }}
        onClick={() => h.set_open(true)}
      >
        <EditIcon width="18px" height="18px" />
      </IconButton>
      <Dialog
        open={h.open}
        onClose={() => h.set_open(false)}
        PaperProps={{ style: { borderRadius: 10, maxHeight: '40rem', width: 'auto' } }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Edit Inspection
          <Close className={classes.closeBtn} onClick={() => h.set_open(false)} />
        </DialogTitle>
        <DialogContent style={{ overflowY: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container>
              {[
                {
                  label: 'Date',
                  input: (
                    <TextField
                      type="datetime-local"
                      variant="outlined"
                      size="small"
                      className={classes.formControl}
                      value={h.date}
                      onChange={(e) => h.set_date(e.target.value)}
                      inputProps={{ max: todayDateTime }}
                    />
                  ),
                },
                {
                  label: 'Inspection Name',
                  input: (
                    <TextField
                      placeholder={props.inspectionName}
                      variant="outlined"
                      fullWidth
                      required
                      size="small"
                      className={classes.formControl}
                      value={h.name}
                      onChange={(e) => h.set_name(e.target.value)}
                    />
                  ),
                },
                {
                  label: 'Description',
                  input: (
                    <TextField
                      placeholder={props.inspectionDescription}
                      multiline
                      fullWidth
                      required
                      rows={4}
                      variant="outlined"
                      className={classes.formControl}
                      value={h.description}
                      onChange={(e) => h.set_description(e.target.value)}
                    />
                  ),
                },
              ].map(e => (
                !e.show && (
                  <Grid item container>
                    <Grid item xs={3}>
                      <p style={{ padding: '15px 10px' }}>{e.label}</p>
                    </Grid>
                    <Grid item xs={9}>
                      {e.input}
                    </Grid>
                  </Grid>
                )
              ))}
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <div className={classes.dialogAction}>
            <Box
              component="button"
              className="blue-button-outlined"
              onClick={() => h.set_open(false)}
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
                Save
              </h1>
            </Box>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
