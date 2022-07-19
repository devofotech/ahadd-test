import {
  DialogTitle, Button, Dialog, DialogContent, DialogActions, Tooltip, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

const useStyles = makeStyles(() => ({
  cancelBtn: { backgroudColor: 'var(--primary-color)', color: 'var(--primary-color)' },
  submitBtn: { backgroundColor: 'red', color: '#FFFFFF' },
}));

export default ({ file, refresh }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const deleteAssetFile = () => {
    Api({
      endpoint: endpoints.deleteAssetFile(file.id),
      onSuccess: () => {
        toast('success', 'Asset File Successfully deleted');
        refresh();
      },
      onFail: () => toast('error', 'Failed to delete asset file'),
    });
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton>
          <Delete color="secondary" onClick={() => setOpen(true)} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ textAlign: 'center' }}><p className="text-bold" style={{ fontSize: 30 }}>CAUTION!!</p></DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <p className="text-light">You are about to delete important file(s) <br /> Once deleted, you will not be able to restore them</p>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" className={classes.cancelBtn}>
            Cancel
          </Button>
          <Button onClick={() => deleteAssetFile()} variant="contained" className={classes.submitBtn}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
