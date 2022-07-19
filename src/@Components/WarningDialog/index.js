/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import lottie from 'lottie-web';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@Components/Button';

import GearLimit from '@Assets/Images/gear-limit.svg';

export default function DeleteDialog({
  open, setOpen, type, user,
}) {
  const history = useHistory();
  const click = useRef(null);
  const container = useRef(null);
  const [isShow, setIsShow] = useState(true);
  const [doneCycle, setDoneCycle] = useState(false);
  const handleClose = () => { setOpen(false); setDoneCycle(false); setIsShow(true); };
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
      animationData: require('@Assets/Images/gear-lottie.json'),
    });
    setIsShow(false);
  }, [open, isShow]);

  useEffect(() => {
    if (isShow) return;
    setTimeout(refresh, 200);
  }, [isShow]);
  const variant = type === 'asset' ? 'Asset' : type === 'user' ? 'User' : 'Data';
  const hasAccess = [2].includes(user?.RoleId);

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div className="d-flex justify-content-center mx-auto" ref={container} style={{ marginTop: -20, height: '65%', width: '70%' }} />
          <Typography ref={click} variant="h6" align="center" style={{ fontWeight: 600 }}>
            {variant} Creation Failed!
          </Typography>
          <DialogContentText align="center">
            Sorry, you have reached your {variant} Creation limit!
          </DialogContentText>
        </DialogContent>
        <DialogActions className={`mx-2 mb-2 d-flex ${hasAccess ? 'justify-content-between' : 'justify-content-end'}`}>
          {hasAccess ? (
            <>
              <Button onClick={handleClose} style={{ ...styles.strokeButton, ...styles.button }}>
                CANCEL
              </Button>
              <Button onClick={() => history.push('/storage-plan')} style={styles.button}>
                UPGRADE PLAN
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} style={{ ...styles.strokeButton, ...styles.button }}>
              CLOSE
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
}

const styles = {
  strokeButton: { backgroundColor: 'white', outline: '2px solid var(--primary-color)', color: 'var(--primary-color)' },
  button: { width: '8rem' },
};

const getMuiTheme = () => createMuiTheme({
  typography: {
    fontFamily: 'CeraProRegular',
  },
});
