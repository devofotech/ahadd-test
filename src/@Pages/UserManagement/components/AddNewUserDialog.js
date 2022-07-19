import React, { useEffect, useState } from 'react';
import Button from '@Components/Button';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, CircularProgress, Button as BUTTON,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import Dropzone from '@Components/DropzoneBox';
import WarningDialog from '@Components/WarningDialog';
import Api, { endpoints } from '@Helpers/api';

export default ({ OrganizationId, user, ...h }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const createUser = (current, limit) => {
    if (current < limit) return handleClickOpen();
    setOpenDialog(true);
  };

  const onSubmit = () => {
    if (!name) return;
    if (!email) return;
    if (!password) return;
    if (!OrganizationId) return;

    const data = {
      name, phone, email, password, OrganizationId,
    };

    setIsLoading(true);
    Api({
      endpoint: endpoints.createUser(),
      data,
      files: image,
      onSuccess: () => {
        handleClose();
        setIsLoading(false);
        toast('success', 'Create user successful');
        h.getUsers();
      },
      onFail: (err) => {
        const isString = typeof err === 'string';
        toast('error', `Failed create user: ${isString ? err : ''}`);
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    if (image.length <= 1) return;
    toast('error', 'Only 1 image allowed');
    setImage(images => [images.shift()]);
  }, [image]);

  return (
    <>
      <Button
        variant="contained"
        style={{ color: '#FFFFFF', backgroundColor: 'var(--primary-color)' }}
        onClick={() => createUser(h.totalData, user?.['Organization.StoreStorage.user_limit'])}
      >
        <AddOutlined />
        Add User
      </Button>
      <WarningDialog
        open={openDialog}
        setOpen={setOpenDialog}
        type="user"
        user={user}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Grid container>
            {[
              {
                label: 'Name',
                input: (
                  <CustomTextField
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ),
              },
              {
                label: 'Phone number',
                input: (
                  <CustomTextField
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ),
              },
              {
                label: 'Email',
                input: (
                  <CustomTextField
                    autoComplete="new-password"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ),
              },
              {
                label: 'Password',
                input: (
                  <CustomTextField
                    autoComplete="new-password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ),
              },
              {
                label: 'Image',
                input: (
                  <Dropzone files={image} setFiles={setImage} height={300} />
                ),
              },
            ].map(e => (
              <Grid item container>
                <Grid item xs={3}>
                  <p className="pt-2">{e.label}</p>
                </Grid>
                <Grid item xs={9}>
                  {e.input}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading && <CircularProgress size={24} className="mr-2" />}
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const CustomTextField = (props) => (
  <TextField
    variant="outlined"
    fullWidth
    required
    size="small"
    className="mb-3"
    {...props}
  />
);
