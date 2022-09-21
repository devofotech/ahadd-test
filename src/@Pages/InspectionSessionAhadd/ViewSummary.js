import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Divider,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import BarChart from '@Components/BarChart/v3';

const useStyles = makeStyles(() => ({
  closeBtn: { cursor: 'pointer', color: '#022C64' },
  root: { '&$checked': { color: 'rgb(30, 52, 101)' }, transform: 'scale(0.8)' },
}));

export default (props) => {
  const classes = useStyles();
  const [open, set_open] = useState(false);
  const [table_data, set_table_data] = useState([
    { x: 1, y1: 0, y2: 0 },
    { x: 2, y1: 0, y2: 0 },
    { x: 3, y1: 0, y2: 0 },
    { x: 4, y1: 0, y2: 0 },
    { x: 5, y1: 0, y2: 0 },
  ]);

  useEffect(() => {
    if (!props.id) return;
    if (!props.InspectionFiles.filter(e => !e.is_main).length) return;
    const inspectionList = props.InspectionFiles
      .filter(e => !e.is_main)
      .map(f => ({ ai_defect_rating: Math.floor(Math.random() * (6 - 1) + 1), ...f }));
    inspectionList.forEach(element => {
      set_table_data(prevVal => prevVal.map(ann => (ann.x === element.ai_defect_rating ? ({ ...ann, y2: ann.y2 + 1 }) : ann)));
      if (!element.Annotations.length) return;
      set_table_data(prevVal => prevVal.map(ann => (ann.x === element.Annotations[0].SeverityId ? ({ ...ann, y1: ann.y1 + 1 }) : ann)));
    });
  }, [props.InspectionFiles]);

  return (
    <>
      <Button className="color-gradient-inline px-3" style={{ borderRadius: 18, color: 'white', fontSize: 12 }} onClick={() => set_open(true)}>
        VIEW SUMMARY
      </Button>
      <Dialog
        open={open}
        onClose={() => set_open(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="m-0 p-0 pt-2 pr-2">
          <div className="w-100 d-flex justify-content-end">
            <Close className={classes.closeBtn} onClick={() => set_open(false)} />
          </div>
          <div className="w-100 d-flex justify-content-center">
            <p style={{ fontSize: 32, color: '#022C64', fontWeight: 600 }}>View Summary</p>
          </div>
        </DialogTitle>
        <DialogContent className="px-5 d-flex justify-content-center">
          <Grid container>
            {[
              { label: 'Asset ID', value: props.Asset?.name },
              { label: 'Cycle', value: `Cycle ${props?.cycle}` },
              { label: 'Year', value: moment(props?.date).format('YYYY') },
              { label: 'Date', value: moment(props?.date).format('DD MMM YYYY') },
            ].map(e => (
              <>
                <Grid xs={6} item className="my-1">
                  <p className="text-secondary" style={{ fontSize: 14 }}>{e.label}</p>
                </Grid>
                <Grid xs={6} item className="my-1">
                  <p className="text-body" style={{ textAlign: 'end', fontSize: 14, fontWeight: 600 }}>{e.value}</p>
                </Grid>
              </>
            ))}
            <Divider className="w-100 my-1" style={{ color: 'var(--secondary-color)' }} />
            {[
              { label: 'Total Image', value: `${props?.InspectionFiles.length ?? 0} Images` },
              { label: 'AI Slope Condition', value: props?.ai_slope_condition ?? 'No Record' },
              { label: 'Overall Condition', value: props?.overall_condition ?? 'No Record' },
            ].map(e => (
              <>
                <Grid xs={6} item className="my-1">
                  <p className="text-secondary" style={{ fontSize: 14 }}>{e.label}</p>
                </Grid>
                <Grid xs={6} item className="my-1">
                  <p className="text-body" style={{ textAlign: 'end', fontSize: 14, fontWeight: 600 }}>{e.value}</p>
                </Grid>
              </>
            ))}
            {!!props.InspectionFiles.length && (
              <div className="mt-2">
                <BarChart data={table_data} />
              </div>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className="color-gradient-inline" style={{ borderRadius: 18, color: 'white' }} onClick={() => set_open(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
