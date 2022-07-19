import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import AccessContainer from './AccessContainer';

import useHook from './hook';

export default ({ open, setOpen, ...props }) => {
  const h = useHook(props);
  const classes = useStyles();
  const handleClose = () => setOpen(false);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogContent>
        <AccessContainer {...h} />
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles(() => ({
  dialogPaper: {
    width: '30rem',
  },
}));
