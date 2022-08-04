import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { FormatListBulleted, Apps } from '@material-ui/icons';
import { Tooltip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  toggleButton: {
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    border: '2px solid var(--primary-color)',
    height: '36px',
    '&.Mui-selected': {
      backgroundColor: 'var(--primary-color)',
      border: '2px solid var(--primary-color)',
      color: 'white !important',
    },
  },
}));

export default function index(h) {
  const handleTogggle = (event, newType) => !!newType && h.setView(newType);
  const classes = useStyles();
  return (
    <ToggleButtonGroup
      value={h.view}
      exclusive
      onChange={handleTogggle}
      size="small"
      className="mr-2"
    >
      <ToggleButton className={classes.toggleButton} value="card">
        <Tooltip title="Card View">
          <Apps />
        </Tooltip>
      </ToggleButton>
      <ToggleButton className={classes.toggleButton} value="table">
        <Tooltip title="Table View">
          <FormatListBulleted />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
