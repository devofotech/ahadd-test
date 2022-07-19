import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

export default function AfterPayment({ open, setOpen, intents }) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  useEffect(() => {
    if (intents) {
      switch (intents.status) {
        case 'requires_source':
          console.log('requires_source');
          setIsSuccess(false);
          break;
        case 'succeeded':
          console.log('succeeded');
          setIsSuccess(true);
          break;
        default:
          break;
      }
    }
  }, [intents, open]);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle id="form-dialog-title">Order Summary</DialogTitle>
      <DialogContent>
        {isSuccess ? (
          <div style={{ textAlign: 'center' }}>
            <CheckCircleIcon />
            Payment & Upload Successful !!! <br />
            Estimated time: 2Days
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <CancelIcon />
            Payment & Upload unssuccessful, please retry in a moment !!!
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
