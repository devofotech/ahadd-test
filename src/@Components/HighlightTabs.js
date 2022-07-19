import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core';

export default function HighlightTabs({
  tab, setTab, items, customStyle, selectedInspection,
}) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper elevation={0}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        style={{ ...customStyle }}
      >
        {items.map(({ label, value, disabled }) => (
          <Tab
            label={tabLabel(label, selectedInspection, value)}
            value={value}
            className={classes.root}
            style={{ ...customStyle }}
            disabled={disabled}
          />
        ))}
      </Tabs>
    </Paper>
  );
}

const tabLabel = (label, selectedInspection, value) => (
  <div className="d-flex align-items-center">
    <p className="mr-1">{label}</p>
    {selectedInspection && (
      <div
        className="bg-color-primary text-white flex-standard px-1"
        style={{
          width: 'auto', height: 15, borderRadius: 5, borderWidth: 0, fontSize: 10,
        }}
      >
        {selectedInspection?.filter(inspection => inspection.ModuleId === value).length}
      </div>
    )}
  </div>
);

const useStyles = makeStyles({ root: { fontFamily: 'CeraProRegular !important' } });
