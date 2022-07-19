import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, Box, ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import MaterialTable from '@Components/MaterialTable';

const useStyles = makeStyles(() => ({
  blueBtn: {
    borderRadius: '6px',
    width: '17em',
    marginRight: '2em',
    position: 'absolute',
    top: '0px',
    right: '50px',
  },
  blueBtnText: { color: '#FFFFFF', fontWeight: 600, fontSize: 16 },
  closeBtn: {
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
}));

const columns = [
  {
    name: 'PROJECT',
    selector: 'project',
    align: 'left',
    minWidth: 100,
  },
  {
    name: 'YEAT',
    selector: 'year',
    align: 'center',
    minWidth: 100,
  },
  {
    name: 'PREQLASSIC',
    selector: 'preqlassic_score',
    align: 'right',
    minWidth: 100,
  },
  {
    name: 'CIDB QLASSIC',
    selector: 'cidb_score',
    align: 'right',
    minWidth: 100,
  },
];

export default ({ open, setOpen }) => {
  const classes = useStyles();
  return (
    <Dialog fullWidth open={open} maxWidth="lg">
      <DialogTitle>
        <ListItemText primary={open[0]?.contractors} secondary="Contractor's project history" />

        <Close
          className={classes.closeBtn}
          onClick={() => setOpen(false)}
        />
        {/* <Box component="button" className={`${classes.blueBtn} blue-button`} onClick={() => setOpen(true)}>
          <h1 className={`${classes.blueBtnText} flex-standard`}> + Add Data </h1>
        </Box> */}
      </DialogTitle>
      <DialogContent>
        <MaterialTable
          tableHead
          columns={columns}
          tableData={open}
        />
      </DialogContent>
    </Dialog>
  );
};
