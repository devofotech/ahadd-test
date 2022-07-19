import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    color: '#04847C', fontWeight: 700,
  },
}));

export default function FolderList({ details }) {
  const classes = useStyles();

  return (
    <>
      <h2 className="text-light primary" style={{ fontWeight: 400, fontSize: '1.2rem' }}>ASSETS WITH HIGHEST ISSUES </h2>

      <List className={classes.root}>
        { details.map(({ name, image, issues }) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <img src={`${process.env.REACT_APP_S3}/${image}`} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={issues} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
