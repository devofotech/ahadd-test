import React, { useEffect, useState, useRef } from 'react';
import lottie from 'lottie-web';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default function DeleteDialog({
  open, setOpen, selected, setSelected, deleteFunction, message,
}) {
  const click = useRef(null);
  const container = useRef(null);
  const [isShow, setIsShow] = useState(true);
  const [doneCycle, setDoneCycle] = useState(false);
  const handleClose = () => { if (!!selected) setSelected(); setOpen(false); setDoneCycle(false); setIsShow(true); };
  const handleDelete = () => {
    deleteFunction();
    handleClose();
  };
  const refresh = () => click.current.click();
  const onShow = () => { if (!isShow) { setIsShow(!isShow); setDoneCycle(true); } };

  useEffect(() => {
    if (!open) return;
    if (doneCycle) return;
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('@Assets/Icons/question-lottie.json'),
    });
    setIsShow(false);
  }, [open, isShow]);

  useEffect(() => {
    if (isShow) return;
    setTimeout(refresh, 200);
  }, [isShow]);

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Are you sure you want to delete?</DialogTitle> */}
        <DialogContent className="mx-3">
          <div className="d-flex justify-content-center mx-auto" ref={container} style={{ marginTop: -20, height: '70%', width: '70%' }} />
          <h2 className="text-center mb-2" ref={click} onClick={onShow} style={{ fontSize: 20 }}>Are you sure you want to delete?</h2>
          <DialogContentText align="center">
            {!!message ? message : `Delete ${selected?.name || 'this data'}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
}

const getMuiTheme = () => createMuiTheme({
  typography: {
    fontFamily: 'CeraProRegular',
  },
});
