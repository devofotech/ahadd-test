import React, { useState, useEffect } from 'react';
import Button from '@Components/Button';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip,
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
  dialogAction: {
    display: 'flex', justifyContent: 'flex-end', padding: '10px 0', width: '100%',
  },
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
        PaperProps={{ style: { borderRadius: 10, maxHeight: '40rem', width: '100%' } }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <p style={{ color: '#022C64', fontWeight: 600 }}>Upload Inspection Media</p>
            <IconButton onClick={() => { setOpen(false); setFiles([]); }}>
              <Close fontSize="small" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <FileDropZone files={files} setFiles={setFiles} height={400} type="imageVideo" />
        </DialogContent>
        <DialogActions>
          <div className={classes.dialogAction}>
            <Button
              className="text-white"
              variant="outlined"
              style={{ border: '1px solid var(--main-color)', borderRadius: 20, backgroundColor: 'white' }}
              onClick={() => { setOpen(false); setFiles([]); }}
            >
              <p style={{ color: 'var(--main-color)' }}>CANCEL</p>
            </Button>
            <Button
              className="color-gradient-inline mx-3"
              style={{ borderRadius: 20 }}
              onClick={() => clickUpload()}
            >
              <p style={{ color: 'white' }}>
                <CloudUploadIcon style={{ marginRight: 3 }} />
                Upload Media
              </p>
            </Button>
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
