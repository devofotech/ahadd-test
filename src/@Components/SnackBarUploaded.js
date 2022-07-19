import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default ({ open = ['success', 'message'], setOpen = () => null }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen([]);
  };

  return (
    <Snackbar open={!!open.length} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={open[0]} elevation={6} variant="filled" children={open[1]} />
    </Snackbar>
  );
};
