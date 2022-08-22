import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ImageOutlined, MapOutlined } from '@material-ui/icons';
import { Tooltip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  toggleButton: {
    backgroundColor: 'white',
    color: 'var(--main-color)',
    border: '2px solid var(--main-color)',
    height: '38px',
    borderRadius: 20,
    '&.Mui-selected': {
      backgroundColor: 'var(--main-color)',
      border: '2px solid var(--main-color)',
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
      <ToggleButton className={classes.toggleButton} value="image">
        <Tooltip title="Image">
          <ImageOutlined />
        </Tooltip>
      </ToggleButton>
      <ToggleButton className={classes.toggleButton} value="map">
        <Tooltip title="Map">
          <MapOutlined />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
