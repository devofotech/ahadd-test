import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Dialog, DialogActions, DialogContent, DialogContentText
} from '@material-ui/core';
import Button from '@Components/Button';

export default function UnauthorizedLogin(h) {
  const handleClose = () => h.setError(false);
  return (
    <Dialog open={h.error} onClose={handleClose}>
      <DialogContent>
        <Typography ariant="h6" align="center" className="mb-4" style={{ fontWeight: 600, color: 'red' }}>
          There was an error to connect your account with Microsoft
        </Typography>
        <DialogContentText align="center">
          Please try again in a few minutes.
        </DialogContentText>
        <DialogContentText align="center" className="mt-1">
          If the problem does not solve, please contact your team.
        </DialogContentText>
      </DialogContent>
      <DialogActions className={'mx-2 mb-2 d-flex \'justify-content-end\'}'}>
        <Button onClick={handleClose} className="color-gradient-inline" style={{ width: '8rem' }}>
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
