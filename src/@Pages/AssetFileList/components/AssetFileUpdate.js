import React, { useState } from 'react';
import {
  Dialog, DialogContent, DialogTitle, Grid, TextField, DialogActions, Tooltip, IconButton,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import Api, { endpoints } from '@Helpers/api';
import Button from '@Components/Button';
import moment from 'moment';

export default function UserUpdateDialog({ file, refresh }) {
  const [open, setOpen] = useState(false);
  // const [type, settype] = useState();
  // const [media_type, setmedia_type] = useState();
  const [name, setname] = useState();
  const [label, setlabel] = useState();
  const [path, setpath] = useState();
  const [createdAt, setcreatedAt] = useState();
  const handleClickOpen = () => {
    setlabel(file.label);
    setname(file.name);
    setpath(file.path);
    setcreatedAt(moment(file.createdAt).format('YYYY-MM-DD'));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    const data = { label };

    if (!label) return;
    if (!!name) data.name = name;
    // if (!!media_type) data.media_type = media_type;
    // if (!!type) data.type = type;
    if (!!path) data.path = path;
    if (!!createdAt) data.createdAt = createdAt;
    Api({
      endpoint: endpoints.updateAssetFile(file.id),
      data,
      onSuccess: () => {
        handleClose();
        toast('success', 'Asset file updated successfully');
        refresh();
      },
      onFail: (err) => {
        toast('error', `Failed to update asset file: ${err.toString()}`);
      },
    });
  };

  return (
    <>
      <Tooltip title="Edit">
        <IconButton>
          <Edit style={{ color: 'var(--secondary-color)' }} onClick={handleClickOpen} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullwidth>
        <div className="d-flex justify-content-between">
          <DialogTitle>Edit Asset File</DialogTitle>
        </div>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12} className="mt-3">
              <CustomTextField
                label="Label / Name"
                required
                value={label}
                onChange={(e) => setlabel(e.target.value)}
              />
            </Grid>
            <Grid xs={12}>
              <CustomTextField
                label="Group Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </Grid>
            {file.is_external && (
              <Grid xs={12}>
                <CustomTextField
                  label="Source"
                  required
                  value={path}
                  onChange={(e) => setpath(e.target.value)}
                />
              </Grid>
            )}
            <Grid xs={12}>
              <CustomTextField
                label="Date Progress"
                value={createdAt}
                onChange={(e) => setcreatedAt(e.target.value)}
                type="date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="mt-5 mb-3 mr-3">
          <Button onClick={handleClose} variant="text">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const CustomTextField = (props) => (
  <TextField
    variant="outlined"
    fullWidth
    size="small"
    className="mb-3"
    {...props}
  />
);
