import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Tabs, Tab, List, ListItem, ListItemText, ListItemAvatar, Avatar,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxHeight: '35vh',
    overflow: 'auto',
  },
}));

const colors = ['#2ECCA9', '#FF4560'];

export default function Compliance({ title, data }) {
  const [tab_value, set_tab_value] = useState(0);
  const handleChange = (event, newValue) => { set_tab_value(newValue); };

  return (
    <div style={{ background: '#fff', borderRadius: '10px', marginBottom: '20px' }}>
      <Paper square style={{ boxShadow: 'none' }}>
        <Tabs
          value={tab_value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {data.map(e => <Tab label={e.id} />)}
        </Tabs>
      </Paper>
      <h3 style={{ padding: '16px 16px 0' }}>{title ? title[tab_value] : data[tab_value].name}</h3>
      {!!data.length && (<CustomList data={data[tab_value].items} color={colors[tab_value]} />)}
    </div>
  );
}

function CustomList({ data, color }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {data?.sort((a, b) => b.value - a.value).map(e => (
        <ListItem>
          <ListItemAvatar>
            <Avatar src={e.image} />
          </ListItemAvatar>
          <ListItemText primary={e.name} secondary={e.division_name} />
          <p style={{ color, fontWeight: 600 }}>{e.value.toLocaleString()}</p>
        </ListItem>
      ))}
    </List>
  );
}
