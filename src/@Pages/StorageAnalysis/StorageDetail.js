/* eslint-disable complexity */
import CircularProgressBar from '@Components/CircularProgressBar';
import {
  Button, Divider, Grid, Paper,
} from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { formatBytes, pluralizer } from '@Helpers';
import moment from 'moment';

export default ({
  totalAssetUsage, totalSize, user, parentUser, subscriptionData,
}) => {
  const usagePercentage = (totalAssetUsage / totalSize) * 100;
  const nextBill = moment(subscriptionData?.current_period_end * 1000);
  const nextBillDuration = nextBill.diff(moment(), 'd');
  return (
    <Paper>
      <Grid container xs={12} className="m-2 p-4">
        <Grid item xs={1}>
          <CircularProgressBar scale={1.5} x={15} value={usagePercentage} />
        </Grid>
        <Grid container item xs={3} direction="column" className="ml-1 my-auto">
          <Grid item>
            <p className="text-light">Total Asset Storage</p>
          </Grid>
          <Grid item>
            <h1 className="font-weight-bold">{formatBytes(totalAssetUsage, true, 2)}
              <span className="text-light"> / {formatBytes((totalSize), true, 1)}</span>
            </h1>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid container item xs className="ml-5 my-auto">
          <Grid container item xs={12}>
            <Grid item xs={3}>
              <p className="text-light">Your Current Plan</p>
              <h2 className="font-weight-bold color-secondary">{user?.['Organization.StoreStorage.name']}</h2>
            </Grid>
            {!!(user?.RoleId < 3) && (
              <Grid item xs={6} className="d-flex" style={{ fontSize: 12, alignItems: 'end' }}>
                <p>
                  <span className="text-light">Next bill in: </span>
                  {subscriptionData?.cancel_at_period_end || !subscriptionData ? '-'
                    : `${pluralizer('day', nextBillDuration, true)} (${nextBill.format('DD MMM YYYY')})`}
                  <br />
                  <span className="text-light">Service validity: </span>
                  {!subscriptionData ? '-' : `${pluralizer('day', nextBillDuration, true)} (${nextBill.format('DD MMM YYYY')})`}
                </p>
              </Grid>
            )}
            {!user?.['Organization.StoreStorage.is_token_unlimited'] && (
              <Grid item xs={3} className="d-flex justify-content-end align-items-center" style={{ transform: 'scale(0.8)' }}>
                {!!parentUser?.can_view_storage_plan && (
                  <Link to="/storage-plan">
                    <Button
                      className="mx-3 my-2"
                      variant="contained"
                      size="small"
                      style={{
                        color: '#FFFFFF', backgroundColor: 'var(--primary-color)', fontFamily: 'CeraProRegular', width: '12rem',
                      }}
                    >
                      <ArrowUpward style={{ width: 20, marginRight: 5 }} />
                      <p className="text-white">Upgrade Storage</p>
                    </Button>
                  </Link>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
