import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogTitle, Grid, Select, MenuItem, TextField, Button,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import FileDropZone from '@Components/DropzoneBox';
import moment from 'moment';

export default function UploadScoreDialog({
  open, setOpen, project, ...props
}) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [current_progress, setCurrent_progress] = useState(0.00);
  const [schedule_progress, setSchedule_progress] = useState(0.00);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(moment().year());
  useEffect(() => {
    if (!!open) return;
    setFiles([]);
    setCurrent_progress(0);
    setSchedule_progress(0);
    setMonth(1);
    setYear(moment().year());
  }, [open]);
  const clickUpload = () => {
    props.onSave({
      current_progress, schedule_progress, month, year, files,
    });
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      PaperProps={{ style: { borderRadius: 10 } }}
    >
      <DialogTitle>
        <Grid container justify="space-between">
          <h1>Upload Monthly Progress</h1>
          <Close onClick={() => setOpen(false)} />
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid item container xs={12} spacing={3} m={5} style={{ marginBottom: 10 }}>
          <Grid item xs={8}>
            <div className="text-light">
              Upload the supporting document
            </div>
          </Grid>
          <Grid item xs={2}>
            <Select variant="outlined" value={year} style={{ padding: '0px' }} onChange={(e) => setYear(e.target.value)}>
              {[...Array(100)].map((e, i) => (<MenuItem value={i + 1980} children={i + 1980} />))}
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select variant="outlined" value={month} style={{ padding: '0px' }} onChange={(e) => setMonth(e.target.value)}>
              {moment.months().map((e, i) => (<MenuItem value={i + 1} children={e} />))}
            </Select>
          </Grid>
        </Grid>

        <Grid item md={12} lg={12}>
          <FileDropZone files={files} setFiles={setFiles} height={400} />
        </Grid>
        <Grid item container xs={12} spacing={3} style={{ marginTop: 10, marginBottom: 10 }}>
          <Grid item container xs={12} spacing={3} m={5}>
            <Grid item xs={2}>
              <div className={`${classes.centerText} text-light`}>
                Update current project status:
              </div>
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={current_progress}
                onChange={(e) => setCurrent_progress(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={2}>
              <div className={`${classes.centerText} text-light`}>
                Update schedule project status:
              </div>
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={schedule_progress}
                onChange={(e) => setSchedule_progress(Number(e.target.value))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" component="span" onClick={() => clickUpload()}>
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const useStyles = makeStyles(() => ({ centerText: { paddingTop: 15 } }));
