import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, CardContent, Card, Typography,
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    marginBottom: '5px',
    padding: '10px',
  },
  content: {
    padding: '0px!important',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  label: {
    color: '#04847C', fontWeight: 700,
  },
});

export default function SimpleCard({
  label, percent, indicator_rise, value,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent className={classes.content}>
        <Grid container>
          <Grid item xs={8}>
            <Typography children={label} className={classes.label} style={{ fontSize: '1.2rem' }} />
            <Typography color={indicator_rise ? 'error' : 'primary'} style={{ fontSize: '0.7rem' }}>
              {indicator_rise ? <TrendingUpIcon /> : <TrendingDownIcon />} {percent} % last month
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography children={value ?? 322} className={classes.label} style={{ fontSize: '2.4rem' }} />
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
}
