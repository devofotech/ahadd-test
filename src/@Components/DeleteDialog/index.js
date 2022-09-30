import React, { useEffect, useState, useRef } from 'react';
import lottie from 'lottie-web';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

export default function DeleteDialog({
  open = false, setOpen = () => null, selected = {}, setSelected = () => null, deleteFunction = () => null, message = '', showImage = false,
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
  const refresh = () => click.current?.click();
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
        <DialogContent style={{ textAlign: 'center' }}>
          <div className="d-flex flex-column font-weight-normal">
            {!!showImage ? (
              <div className="d-flex justify-content-center mx-auto">
                <img src={`${process.env.REACT_APP_S3}/${selected.src}`} className="w-100 pb-2" />
              </div>
            ) : (
              <div className="d-flex justify-content-center mx-auto" ref={container} style={{ marginTop: -20, height: '70%', width: '70%' }} />
            )}
            <p style={{ fontSize: 20 }}><b>Are you sure you want to delete?</b></p>
            <span>{!!message ? message : `Delete ${selected?.name || 'this item'}`}</span>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
          <Button onClick={handleClose} style={{ backgroundColor: 'grey', width: 150 }}>
            <div className="d-flex align-items-center text-light">
              Cancel
            </div>
          </Button>
          <Button onClick={handleDelete} style={{ backgroundColor: 'red', width: 150 }}>
            <div className="d-flex align-items-center text-light">
              <Delete style={{ width: 12, marginRight: 5 }} />
              Delete
            </div>
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
