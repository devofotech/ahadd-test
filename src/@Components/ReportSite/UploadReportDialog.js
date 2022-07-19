import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Box, DialogTitle, Grid, Typography, Select, MenuItem, TextField, Button,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import FileDropZone from '@Components/DropzoneBox';
import SimpleImageTile from '@Components/SimpleImageTile';
import moment from 'moment';

export default function UploadReportDialog({ open, setOpen, ...props }) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('open');
  const [dueDate, setDueDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  useEffect(() => {
    if (!!open) return;
    setFiles([]);
    setStatus('open');
    setDueDate(moment(new Date()).format('YYYY-MM-DD'));
  }, [open]);
  useEffect(() => {
    if (!props.selectedInspection) return;
    setStatus(props.selectedInspection.status);
  }, [props.selectedInspection]);

  const clickUpload = () => {
    const input = { status, delayAt: dueDate, files };
    if (props.selectedInspections) input.InspectionId = props.selectedInspections;
    props.onSave(input);
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
          <h1>Upload &#8220;Borang Tindakan Pembaikan&#8221;</h1>
          <Close onClick={() => setOpen(false)} />
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Typography component="div">
          <Box fontSize="h6.fontSize" m={1}>
            <div className="text-light">
              Upload the document to verify and close the cases
            </div>
          </Box>
        </Typography>
        <Grid item md={12} lg={12}>
          <FileDropZone files={files} setFiles={setFiles} height={400} />
        </Grid>
        <Grid item container xs={12} spacing={3} style={{ marginTop: 10, marginBottom: 10 }}>
          <Grid item xs={7}>
            <Grid item container xs={12} spacing={3} m={5}>
              <Grid item xs={5}>
                <div className={`${classes.centerText} text-light`}>
                  Upload case status to:
                </div>
              </Grid>
              <Grid item xs={4}>
                <Select variant="outlined" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {[
                    { value: 'open', children: 'Open' },
                    { value: 'closed', children: 'Closed' },
                    { value: 'delayed', children: 'Delayed' },
                    { value: 'not_fully_closed', children: 'Not Fully Closed' },
                  ].map(e => (<MenuItem {...e} />))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            {!!!(status === 'close') && (
              <Grid item container xs={12} spacing={3} m={5}>
                <Grid item xs={5}>
                  <div className={`${classes.centerText} text-light`}>
                    New Due Date:
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="date"
                    variant="outlined"
                    size="small"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Button variant="contained" color="primary" component="span" onClick={() => clickUpload()}>
            Upload
          </Button>
        </Grid>
        {!!props.inspectionFiles?.length && (
          <div style={{ padding: '0 16px', marginTop: 20 }}>
            <h2 style={{ fontWeight: 600 }}>Open Cases</h2>
            <h4 style={{ fontWeight: 600, marginBottom: 20 }} className="text-light">Inspection July W1 open case list</h4>
            <SimpleImageTile images={props.inspectionFiles?.map(x => ({ ...x, path: x['InspectionFile.path'] }))} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const useStyles = makeStyles(() => ({ centerText: { paddingTop: 15 } }));
