import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import Dropzone from '@Components/DropzoneBox';
import UploadProgress from '@Components/UploadProgress';

export default function UploadDialogProcessing({ open, setOpen, ...props }) {
  const [files, setFiles] = useState([]);
  const onSave = () => {
    props.uploadFile(open.id, files);
    setOpen(false);
  };

  useEffect(() => {
    if (!files.length) return;
    const isUploadCompleted = !props.uploadPercentages.some(e => e !== 100);
    if (isUploadCompleted) {
      setFiles([]);
      props.setUploadPercentages([0]);
    }
  }, [props.uploadPercentages]);
  // useEffect(() => {
  //   props.setuploadedfiles(0);
  //   // turn off tracker
  //   // setUploadPercentages([...Array(files.length)].map(() => 0));
  // }, [files]);
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          <h2 style={{ fontSize: 30, fontWeight: 600, margin: '5px 0' }}>Upload</h2>
          <h4 style={{ fontSize: 14, color: 'gray' }}>Upload {props.title}</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container className="mb-4">
              <Grid container item xs={12}>
                <Grid item md={12} lg={12}>
                  <Dropzone files={files} setFiles={setFiles} height={185} type="compress" />
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => (!!files.length ? onSave() : console.log('No files'))}
            style={{ background: !!files.length ? 'var(--primary-color)' : 'gray', color: 'white' }}
            autoFocus
            children="Save"
          />
          <Button onClick={() => setOpen(false)} autoFocus children="Cancel" />
        </DialogActions>
      </Dialog>
      {!!files.length && !!props.withProgress && (
        <UploadProgress
          title="Upload Progress"
          files={files}
          setFiles={setFiles}
          percentages={props.uploadPercentages}
        />
      )}
    </div>
  );
}
