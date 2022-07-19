/* eslint-disable object-curly-newline */
/* eslint-disable complexity */
/* eslint-disable max-len */
import React from 'react';
import {
  Paper, Typography, makeStyles, TextField,
} from '@material-ui/core';
import Hook from './FormAnnotationHook';
import { DynamicHeader, DynamicSelect, DynamicRadio, CustomRadioSeverity } from './FormAnnotationComponent';

const useStyles = makeStyles(() => ({
  normalSelect: { width: '100%', padding: 5, fontSize: '10px' },
  normalSelectNoItem: { padding: 5, fontSize: '10px', borderRadius: 0, textTransform: 'uppercase' },
  outlineSelect: {
    width: '100%', padding: 5, fontSize: '10px', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '5px',
  },
  outlineInput: { width: '100%', backgroundColor: 'white', borderRadius: '5px' },
  annotationPaperOutline: { width: '100%', marginBottom: 10 },
}));
const actbg = { backgroundColor: '#FAFFFD', color: 'black' };
const actbgchild = { backgroundColor: 'white', color: 'black' };

export default function FormAnnotation(props) {
  const FAh = Hook(props);
  const classes = useStyles();
  const selectedStyle = props.isselected ? { actbg, actbgchild } : {};
  return (
    <Paper variant="outlined" className={classes.annotationPaperOutline} style={{ ...(selectedStyle.actbg) }}>
      {props.isDeveloper && (
        <Typography gutterBottom style={{ fontSize: '8px', padding: 10, ...(selectedStyle.actbg) }}>
          <strong>(ID){props.annotation.id}:</strong>&nbsp;
          (L) {JSON.parse(props.annotation.points).left.toFixed(2)},
          (T) {JSON.parse(props.annotation.points).top.toFixed(2)},
          (W) {JSON.parse(props.annotation.points).width.toFixed(2)},
          (H) {JSON.parse(props.annotation.points).height.toFixed(2)}
        </Typography>
      )}
      <DynamicHeader {...{ classes, selectedStyle, FAh, props }} />
      <div style={{ padding: 10 }}>
        {!props.inspection_module?.is_general && !!props.inspection_module.ModuleParameters?.length && <DynamicSelect {...{ classes, selectedStyle, FAh, props }} />}
        {props.inspection_module.settings?.includes('compliance') && <DynamicRadio {...{ classes, selectedStyle, FAh, props }} />}
        <TextField
          value={props.annotation.description}
          onChange={FAh.handleChangeDescription}
          placeholder="Descriptions here"
          variant="outlined"
          className={classes.outlineInput}
          inputProps={{ style: { fontSize: '10px' } }}
          InputLabelProps={{ style: { fontSize: '10px' } }}
        />
        {props.inspection_module.settings?.includes('severity') && (
          <>
            <div className="bg-white w-100 mt-2 mb-3">Severity</div>
            <CustomRadioSeverity name="severity" items={props.severity} {...{ classes, selectedStyle, FAh, props }} />
          </>
        )}
      </div>
    </Paper>
  );
}
