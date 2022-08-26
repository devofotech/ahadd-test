import React from 'react';
import {
  Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import useHook from './hook';
import InputItems from './EditBuildingInput';

const theme = createMuiTheme({ breakpoints: { values: { xxl: 2100 } } });

const useStyles = makeStyles(() => ({
  root: { [theme.breakpoints.up('xxl')]: { transform: 'scale(1.5)' } },
  blueBtn: { borderRadius: '6px', width: '150px' },
  blueBtnText: { color: '#FFFFFF', fontWeight: 600, fontSize: 16 },
  outlinedBtnText: { fontWeight: 600, fontSize: 16 },
  closeBtn: { cursor: 'pointer', float: 'right' },
  formControl: { paddingTop: 10, paddingBottom: 5 },
  wrapper: { position: 'relative' },
  buttonProgress: {
    color: 'green', position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12,
  },
}));

export default (props) => {
  const h = useHook(props);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.wrapper}>
        <Link to={`/edit-asset/${h.id}`}>
          <Button
            variant="contained"
            className="my-2"
            style={{ color: '#FFFFFF', backgroundColor: props.isLoading ? '#808080a8' : 'var(--secondary-color)' }}
            // onClick={() => h.setOpen(true)}
            disabled={props.isLoading}
          >
            <p className="text-white">Edit Asset Information</p>
          </Button>
          {props.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Link>
      </div>
    </div>
  );
};
