import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ImageOutlined, MapOutlined } from '@material-ui/icons';
import { Tooltip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  toggleButton: {
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    border: '2px solid var(--primary-color)',
    height: '38px',
    '&.Mui-selected': {
      backgroundColor: 'var(--primary-color)',
      border: '2px solid var(--primary-color)',
      color: 'white !important',
    },
  },
}));

export default function index({ inspectionType, setInspectionType }) {
  const handleTogggle = (event, newType) => !!newType && setInspectionType(newType);
  const classes = useStyles();
  return (
    <ToggleButtonGroup
      value={inspectionType}
      exclusive
      onChange={handleTogggle}
      size="small"
    >
      <ToggleButton className={classes.toggleButton} value="Image">
        <Tooltip title="On-Image Annotation">
          <ImageOutlined />
        </Tooltip>
      </ToggleButton>
      <ToggleButton className={classes.toggleButton} value="Map">
        <Tooltip title="On-Map Annotation">
          <MapOutlined />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
