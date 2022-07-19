import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core';

export default function HighlightTabsWithPageAccess({
  tab, setTab, items, customStyle,
}) {
  const classes = useStyles();
  const handleChange = (event, newValue) => setTab(newValue);
  return (
    <Paper elevation={0}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        style={{ ...customStyle }}
      >
        {items.map(({ label, value, page_access }) => !!page_access && (
          <Tab label={label} value={value} className={classes.root} style={{ ...customStyle }} />
        ))}
      </Tabs>
    </Paper>
  );
}

const useStyles = makeStyles({ root: { fontFamily: 'CeraProRegular !important' } });
