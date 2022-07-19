import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import TruckIcon from '@material-ui/icons/LocalShipping';
import CarIcon from '@material-ui/icons/DriveEta';
import PersonIcon from '@material-ui/icons/Person';
import { Helmet } from '@Assets/Icons';
import BulldozerIcon from '@Assets/Icons/BulldozerIcon.svg';

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
      <Grid xs={12} className={classes.tileContainer}>
        <Grid xs={6} className={classes.container}>
          <div className={classes.label}>Machinery</div>
          <Grid xs={12} className={classes.box}>
            <TruckIcon className={classes.icon} />
            <div className={classes.text}>{props.truck_count ?? 0}</div>
          </Grid>
          <Grid xs={12} className={classes.box}>
            <CarIcon className={classes.icon} />
            <div className={classes.text}>{props.car_count ?? 0}</div>
          </Grid>
          <Grid xs={12} className={classes.box}>
            <img src={BulldozerIcon} style={{ transform: 'scaleX(-1)', paddingLeft: 5 }} width={10} />
            <div className={classes.text}>{props.machinery_count ?? 0}</div>
          </Grid>
        </Grid>
        <Grid xs={6} className={classes.container}>
          <div className={classes.label}>Manpower</div>
          <Grid xs={12} className={classes.box}>
            <Helmet style={{ paddingTop: 2 }} />
            <div className={classes.text}>{props.person_count ?? 0}</div>
          </Grid>
          <Grid xs={12} className={classes.box}>
            <PersonIcon className={classes.icon} />
            <div className={classes.text}>{props.person_no_helmet_count ?? 0}</div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    minWidth: '28%',
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
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'center',
  },
  label: {
    textAlign: 'left',
    cursor: 'default',
    color: '#d9d9d9',
    fontSize: 9,
  },
  text: {
    textAlign: 'left',
    cursor: 'default',
    color: 'white',
    fontSize: 11,
  },
  icon: {
    paddingTop: 3,
    paddingRight: 4,
    textAlign: 'left',
    cursor: 'default',
    color: '#d9d9d9',
    fontSize: 11,
  },
}));
