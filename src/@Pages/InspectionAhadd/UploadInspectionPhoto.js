import React, { useState, useEffect } from 'react';
import {
  Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip,
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import FileDropZone from '@Components/DropzoneBox';
import UploadProgress from '@Components/UploadProgress';

const useStyles = makeStyles(() => ({
  blueBtn: { borderRadius: '6px', width: '150px' },
  blueBtnText: { color: '#FFFFFF', fontWeight: 600, fontSize: 16 },
  outlinedBtnText: { fontWeight: 600, fontSize: 16 },
  closeBtn: { cursor: 'pointer', float: 'right' },
}));

export default function UploadInspectionPhoto(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const clickUpload = () => {
    props.onSave({ files });
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

  return (
    <div>
      <Tooltip title="Upload Image">
        <IconButton
          className="color-gradient-inline mx-2"
          style={{
            padding: '0.50rem', width: '1rem', height: '1rem', borderRadius: 5,
          }}
          onClick={() => setOpen(true)}
        >
          <Add className="text-white" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: { borderRadius: 10, maxHeight: '40rem', width: 'auto' } }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Upload Inspection Media
          <Close className={classes.closeBtn} onClick={() => { setOpen(false); setFiles([]); }} />
        </DialogTitle>
        <DialogContent>
          <FileDropZone files={files} setFiles={setFiles} height={400} type="imageVideo" />
        </DialogContent>
        <DialogActions>
          <div style={{
            display: 'flex', justifyContent: 'space-between', padding: '0 20px', width: '100%',
          }}
          >
            <Box
              component="button"
              className="blue-button-outlined"
              onClick={() => { setOpen(false); setFiles([]); }}
              style={{ borderRadius: '6px', width: '120px', padding: 6 }}
            >
              <h1 className={`${classes.outlinedBtnText} flex-standard`}>
                Cancel
              </h1>
            </Box>
            <Box
              component="button"
              className={`${classes.blueBtn} blue-button`}
              onClick={() => clickUpload()}
              style={{ borderRadius: '6px', width: '160px', marginLeft: '5rem' }}
            >
              <h1 className={`${classes.blueBtnText} flex-standard`}>
                <CloudUploadIcon style={{ marginRight: 3 }} />
                Upload Media
              </h1>
            </Box>
          </div>
        </DialogActions>
      </Dialog>
      {!!files.length && (
        <UploadProgress
          title="Upload Progress"
          files={files}
          setFiles={setFiles}
          percentages={props.uploadPercentages}
          uploadFiles={props.uploadFiles}
        />
      )}
    </div>
  );
}
