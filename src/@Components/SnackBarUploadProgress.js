import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default ({ open = ['success', 'message'], setOpen = () => null }) => {
  return (
    <Snackbar open={!!open.length}>
      <MuiAlert severity={open[0]} elevation={6} variant="filled" children={open[1]} />
    </Snackbar>
  );
};
