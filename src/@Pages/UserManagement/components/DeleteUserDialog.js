import {
  Button, Dialog, DialogContent, DialogActions, TextField, Tooltip, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

const useStyles = makeStyles(() => ({
  cancelBtn: { color: 'var(--primary-color)' },
  submitBtn: { backgroundColor: 'var(--primary-color)', color: '#FFFFFF' },
}));

export default ({ user, refresh }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState('');
  const isDisabled = user.email !== emailConfirm;
  const deleteUser = () => {
    Api({
      endpoint: endpoints.deleteUser(user?.id),
      onSuccess: () => {
        toast('success', 'Delete user successful');
        setEmailConfirm('');
        refresh();
        setOpen(false);
      },
      onFail: () => toast('error', 'Failed to delete user'),
    });
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton>
          <Delete color="secondary" onClick={() => setOpen(true)} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <p className="text-dark">Are you sure you want to delete user <TextBold>{user.name}</TextBold> ?</p>
          <p className="text-dark">
            This action <TextBold>cannot be undone</TextBold>, and will permanently delete the user.
          </p><br />
          <p className="text-dark">Please type the exact email of the user <TextBold>{user.email}</TextBold> to confirm.</p>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            className="mt-2"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined" className={classes.cancelBtn}>
            Cancel
          </Button>
          <Button onClick={deleteUser} variant="contained" className={classes.submitBtn} disabled={isDisabled}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const TextBold = (text) => <span className="color-secondary font-weight-bold">{text.children}</span>;
