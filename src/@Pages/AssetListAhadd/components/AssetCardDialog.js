import {
  DialogTitle, Dialog, DialogContent, DialogActions, Tooltip, IconButton,
} from '@material-ui/core';
import Button from '@Components/Button';
import { Delete, Edit, Cancel } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import modalImage from '@Assets/Images/undraw_processing_re_tbdu 1.svg';

export default ({
  open, setOpen, selected, setOpenDeleteDialog,
}) => {
  const history = useHistory();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="d-flex justify-content-between">
        <DialogTitle>
          <h3>{selected?.name}</h3>
        </DialogTitle>
        <IconButton style={{ backgroundColor: 'transparent', padding: 0 }}>
          <Cancel style={{ color: 'grey', padding: 20 }} onClick={() => setOpenDeleteDialog(false)} />
        </IconButton>
      </div>
      <DialogContent style={{ textAlign: 'center' }}>
        <div className="d-flex flex-column font-weight-normal">
          <img src={modalImage} style={{ marginBottom: 20, height: '15vh', width: 'auto', padding: 10 }} />
          <p style={{ fontSize: 20, color: 'grey'}}><b>Take a moment to decide</b></p>
          <span>Please choose which action you want to take</span>
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
        <Button onClick={() => history.push(`/edit-asset/${selected.id}`)} style={{ backgroudColor: 'var(--primary-color)', width: 150 }}>
          <div className="d-flex align-items-center">
            <Edit style={{ width: 12, marginRight: 5 }} />
            Edit Asset
          </div>
        </Button>
        <Button onClick={() => (setOpenDeleteDialog(true), setOpen(false))} style={{ backgroundColor: 'red', width: 150 }}>
          <div className="d-flex align-items-center">
            <Delete style={{ width: 12, marginRight: 5 }} />
            Delete
          </div>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
