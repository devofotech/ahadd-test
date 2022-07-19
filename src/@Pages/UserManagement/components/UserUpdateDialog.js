import React, { useState, useEffect } from 'react';
import {
  Dialog, FormControl, MenuItem, DialogContent, DialogTitle, Grid, TextField, Select, DialogActions, Tooltip, IconButton,
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import Api, { endpoints } from '@Helpers/api';
import Button from '@Components/Button';
import EditProfileImage from './EditProfileImage';

export default function UserUpdateDialog({ user, refresh }) {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(user?.id);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [new_password, setnew_password] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const [role, setRole] = useState(user?.RoleId);
  const [image, setImage] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    const data = {
      name, email, new_password, confirm_password, RoleId: role,
    };
    if (!name) return;
    if (!email) return;
    if (!role) return;
    if (new_password !== confirm_password) {
      alert("Passwords don't match!");
      return;
    }
    Api({
      endpoint: endpoints.updateUser(userId),
      data,
      files: image,
      onSuccess: () => {
        setnew_password('');
        setconfirm_password('');
        handleClose();
        toast('success', 'User updated successfully');
        refresh();
      },
      onFail: (err) => {
        toast('error', `Failed to update user: ${err.toString()}`);
      },
    });
  };

  useEffect(() => {
    if (!open) return;
    setUserId(user?.id);
    setName(user?.name);
    setEmail(user?.email);
    setRole(user?.RoleId);
  }, [open]);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton>
          <Edit color="primary" onClick={handleClickOpen} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullwidth maxWidth="400">
        <div className="d-flex justify-content-between">
          <DialogTitle>Update User</DialogTitle>
          <Close style={{ color: '#EA0000', padding: 20 }} onClick={handleClose} />
        </div>
        <DialogContent>
          <Grid className="d-flex flex-column align-items-center justify-content-center m-5">
            <div>
              <EditProfileImage currentImage={`${process.env.REACT_APP_S3}/${user?.image}`} setPhoto={setImage} />
            </div>
            {[
              { inputProps: { style: { textAlign: 'center' } }, value: name, onChange: (e) => setName(e.target.value) },
              {
                textLabel: 'Email', value: email, type: 'email', onChange: (e) => setEmail(e.target.value),
              },
              {
                textLabel: 'New Password', value: new_password, type: 'password', onChange: (e) => setnew_password(e.target.value),
              },
              {
                textLabel: 'Confirm Password', value: confirm_password, type: 'password', onChange: (e) => setconfirm_password(e.target.value),
              },
            ].map(d => (
              <Grid container>
                <h3 style={{ color: 'grey', fontSize: '15px' }}>{d.textLabel}</h3>
                <TextField
                  fullWidth
                  {...d}
                  className="mb-4"
                  color="warning"
                />
              </Grid>
            ))}
            <FormControl className="mt-2" fullWidth>
              <h3 style={{ color: 'grey', marginBottom: 5, fontSize: '15px' }}>Asset Role</h3>
              <Select
                variant="outlined"
                id="role"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <MenuItem value={1}>Super Admin</MenuItem>
                <MenuItem value={2}>Admin</MenuItem>
                <MenuItem value={3}>User</MenuItem>
              </Select>
            </FormControl>
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
