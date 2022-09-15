/* eslint-disable max-len */
import React from 'react';
import {
  Typography, makeStyles, TextField, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core';
import Hook from './FormAnnotationHook';

const useStyles = makeStyles(() => ({
  radio: { margin: '-11px !important', padding: '1px !important' },
}));

export default function FormAnnotation(props) {
  const FAh = Hook(props);
  const classes = useStyles();
  return (
    [
      {
        title: 'Remark By Engineer',
        children: (
          <TextField
            placeholder="Description Here"
            multiline
            rows={5}
            variant="outlined"
            className="w-100 py-2"
            value={props.annotation?.description ?? ''}
            onChange={FAh.handleChangeDescription}
          />
        ),
      },
      {
        title: 'Severity',
        children: (
          <RadioGroup name="severity" row value={props.annotation?.SeverityId ?? 1} onChange={FAh.handleChangeSeverity} className="d-flex justify-content-around pt-2 mb-3">
            {[1, 2, 3, 4, 5].map((e) => (
              <FormControlLabel
                className={classes.radio}
                value={e}
                control={<Radio />}
                label={<Typography style={{ fontSize: '10px', color: '#022C64' }}>&nbsp;&nbsp;{e}&nbsp;&nbsp;</Typography>}
                labelPlacement="bottom"
              />
            ))}
          </RadioGroup>
        ),
      },
    ].map(form => (
      <>
        <div style={{ backgroundColor: '#022C64', padding: 10 }}>
          <p className="text-white">{form.title}</p>
        </div>
        <div className="px-4 py-2">
          {form.children}
        </div>
      </>
    ))
  );
}
