import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Payment from '@Components/Payment';

export default function PaymentDialog({ open, setOpen }) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
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
        <DialogContentText>
          Item {open.imageryname}<br />
          {open.imagerytype?.twoD && <>2D Imagery <br /></>}
          {open.imagerytype?.threeD && <>3D Imagery <br /></>}
          <br />
          Quantity: {open.total_count}<br />
          Price: RM {(open.total_count ? 100 * open.total_count : 0)?.toLocaleString()}
        </DialogContentText>
        <Payment {...open} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
