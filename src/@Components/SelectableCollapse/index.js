import React from 'react';
import {
  Grid, ListItem, ListItemText, List, Collapse, Typography,
} from '@material-ui/core';

const customStyle = (is_active) => (
  {
    backgroundColor: is_active ? 'var(--primary-color)' : '#fff',
    color: is_active ? '#fff' : 'var(--primary-color)',
  }
);

export default function SelectableCollapse({ data, selected, callback }) {
  const [open, setOpen] = React.useState(Object.assign({}, ...data.map(x => ({ [`compliance-${x.id}`]: true }))));
  const handleClickOpenClose = (item) => {
    console.log('parent click', item);
    setOpen({ ...open, [`compliance-${item.id}`]: !open[`compliance-${item.id}`] });
    callback({ compliance: item.id, category: null });
  };
  const handleClick = (item, parendId) => {
    console.log('child click', item, parendId);
    callback({ compliance: parendId, category: item.id });
  };

  const parentItems = (item) => {
    const is_active = item.id === selected?.compliance && !selected?.category;
    return (
      <ListItem
        button
        onClick={() => handleClickOpenClose(item)}
        style={{ borderRadius: 15, ...customStyle(is_active) }}
      >
        <ListItemText primary={
          <Typography style={{ fontWeight: 700, ...customStyle(is_active) }}>{item.name}</Typography>
        }
        />
        <ListItemText primary={item.value} style={{ display: 'flex', justifyContent: 'flex-end' }} />
      </ListItem>
    );
  };
  const childItems = ({ items, id: parendId }) => (
    <Collapse in={open[`compliance-${parendId}`]} timeout="auto" unmountOnExit style={{ width: '100%' }}>
      <List component="div" disablePadding>
        {items.map(item => (
          <ListItem
            button
            onClick={() => handleClick(item, parendId)}
            style={{
              borderRadius: 15,
              ...customStyle((parendId === selected?.compliance) && (item.id === selected?.category)),
            }}
          >
            <ListItemText primary={item.name ?? 'No Category'} />
            <ListItemText primary={item.value} style={{ display: 'flex', justifyContent: 'flex-end' }} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
  return (
    <>
      <Grid container spacing={2} style={{ padding: '5px' }}>
        {!!data.length && data.map(total => [parentItems(total), childItems(total)])}
      </Grid>
    </>
  );
}
