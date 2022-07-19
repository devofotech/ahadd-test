import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Grid } from '@material-ui/core';

export default (props) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Grid xs={12} className={classes.tileContainer}>
        <Grid xs={6} className={classes.container}>
          <div className={classes.label}>Date</div>
          <div className={classes.text}>{moment(props.createdAt).format('DD MMM YYYY')}</div>
        </Grid>
        <Grid xs={6} className={classes.container}>
          <div className={classes.label}>Time</div>
          <div className={classes.text}>{moment(props.createdAt).format('h:mm A')}</div>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    minWidth: '22%',
    background: 'rgba(44, 36, 0, 0.5)',
    borderRadius: 5,
    position: 'absolute',
    top: '8px',
    left: '15px',
    justifyContent: 'space-between',
  },
  tileContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    padding: '5px 15px',
  },
  label: {
    textAlign: 'left',
    cursor: 'default',
    color: '#d9d9d9',
    fontSize: 10,
  },
  text: {
    textAlign: 'left',
    cursor: 'default',
    color: 'white',
    fontSize: 12,
  },
}));
