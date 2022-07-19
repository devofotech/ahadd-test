import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Box, DialogTitle, Grid, Select, MenuItem, TextField, Button,
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
  const [score, setScore] = useState(0.00);
  const [year, setYear] = useState(moment().year());
  useEffect(() => {
    if (!!open) return;
    if (!project[`${open}_score`]) {
      setScore(0);
      return;
    }
    setScore(project[`${open}_score`]);
    setYear(moment().year());
  }, [project]);

  useEffect(() => {
    if (!!open) return;
    setFiles([]);
    setScore(0);
  }, [open]);
  const clickUpload = () => {
    props.onSave({
      score, files, score_type: open, year,
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
          <h1>Upload {open ?? ''} Score</h1>
          <Close onClick={() => setOpen(false)} />
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid item container xs={12} spacing={3} m={5} style={{ marginBottom: 10 }}>
          <Grid item xs={10}>
            <div className="text-light">
              Upload the supporting document
            </div>
          </Grid>
          <Grid item xs={2}>
            <Select variant="outlined" value={year} style={{ padding: '0px' }} onChange={(e) => setYear(e.target.value)}>
              {[...Array(100)].map((e, i) => (<MenuItem value={i + 1980} children={i + 1980} />))}
            </Select>
          </Grid>
        </Grid>
        <Grid item md={12} lg={12}>
          <FileDropZone files={files} setFiles={setFiles} height={400} />
        </Grid>
        <Grid item container xs={12} spacing={3} style={{ marginTop: 10, marginBottom: 10 }}>
          <Grid item xs={7}>
            <Grid item container xs={12} spacing={3} m={5}>
              <Grid item xs={5}>
                <div className={`${classes.centerText} text-light`}>
                  Upload {open} score to:
                </div>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                />
              </Grid>
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
