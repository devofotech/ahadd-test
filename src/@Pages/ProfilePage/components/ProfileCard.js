import React from 'react';
import {
  Avatar, Typography, Paper, Grid,
} from '@material-ui/core';
import Button from '@Components/Button';
import { Link } from 'react-router-dom';
import CircularProgressBar from '@Components/CircularProgressBar';
import TokenIcon from '@Assets/Icons/icon_raise_coin.png';
import { formatBytes } from '@Helpers';
import moment from 'moment';
import { AllInclusive } from '@material-ui/icons';
import CoinWallet from '@Components/CoinWallet';

export default function ProfileCard(props) {
  const usagePercentage = (num1, num2) => (num1 / num2) * 100;
  const totalStorage = props.organizationData?.['StoreStorage.value'] * 1.024 * (1024 ** 2);
  const nextBill = moment(props.organizationData.subscription?.current_period_end * 1000);
  return (
    <Paper className="bg-white rounded-xl px-4 h-100">
      <div className="w-100 flex-standard">
        <Avatar src={`${process.env.REACT_APP_S3}/${props.user?.image}`} style={{ height: 120, width: 120, marginTop: 20 }} />
      </div>
      <div>
        {[
          { variant: 'h4', className: 'text-center my-2 color-primary font-weight-bold', value: props.user?.name },
          {
            variant: 'subtitle1', className: 'text-center mb-2', value: props.user?.['Organization.name'], style: { color: '#1F3566' },
          },
          {
            variant: 'subtitle1', className: 'text-center mb-3', value: props.user?.['Role.name'], style: { color: '#1F3566' },
          },
        ].map(d => (
          <Typography {...d}>{d.value}</Typography>
        ))}
      </div>
      <div>
        <p className="text-secondary" style={{ fontSize: 14 }}>Account Information</p>
        <h2 className="color-secondary my-2 font-weight-bold">{props.organizationData?.['StoreStorage.name']} Plan</h2>
        {[
          {
            title: 'Next bill',
            value: (props.organizationData.subscription?.cancel_at_period_end || !props.organizationData.subscription
              ? '-' : nextBill.format('DD MMM YYYY')),
          },
          { title: 'Service validity', value: !props.organizationData.subscription ? '-' : nextBill.format('DD MMM YYYY') },
          { title: 'Features', value: `${!!props.organizationData?.['StoreStorage.is_full_access'] ? 'Full' : 'Partial'} Access` },
          { title: 'Support', value: `${!!props.organizationData?.['StoreStorage.email_support'] ? 'Standard' : 'Basic'} Email Support` },
        ].map(e => (
          <Grid container className="justify-content-between my-1">
            <Grid item xs={6}><p className="text-secondary" style={{ fontSize: 12 }}>{e.title}:</p></Grid>
            <Grid item xs={6} className="d-flex justify-content-end">
              <p className="color-primary text-right font-weight-bold" style={{ fontSize: 12 }}>{e.value}</p>
            </Grid>
          </Grid>
        ))}
      </div>
      <Grid container spacing={1} style={{ flexWrap: 'wrap', justifyContent: 'center' }} className="mt-3">
        {[
          {
            title: 'Storage',
            data: (
              <>
                {formatBytes(props.totalUsage, true, 1)}<span className="color-tertiary">/{formatBytes(totalStorage, true, 1)}</span>
              </>
            ),
            show: false,
            value: usagePercentage(props.totalUsage, totalStorage),
          },
          {
            title: 'Asset',
            data: (
              <>
                {props.organizationData.assets?.length}<span className="color-tertiary">/{props.organizationData?.['StoreStorage.asset_limit']}</span>
              </>
            ),
            show: false,
            value: usagePercentage(props.organizationData.assets?.length, props.organizationData?.['StoreStorage.asset_limit']),
          },
          {
            title: 'Team User',
            data: (
              <>
                {props.organizationData?.['Organization.UserCount']}<span className="color-tertiary">/{props.organizationData?.['StoreStorage.user_limit']}</span>
              </>
            ),
            show: false,
            value: usagePercentage(props.organizationData?.['Organization.UserCount'], props.organizationData?.['StoreStorage.user_limit']),
          },
          {
            title: 'geoRÄISE Token',
            data: props.isOrgUnlimited ? (<AllInclusive style={{ color: '#FEB019' }} />) : <CoinWallet valueOnly />,
            showToken: true,
          },
        ].map(e => (
          <Grid item xs={12} sm={6} md={12} lg={6}>
            <Grid
              container
              style={{
                backgroundColor: '#F5FAFF', marginBottom: 1, marginLeft: 1, padding: 2, borderRadius: 5, height: 60, overflowY: 'auto',
              }}
            >
              <Grid item xs="auto" justifyContent="center" alignItems="center">
                <div className="d-flex ml-2 align-items-center" style={{ color: 'var(--tertiary-color)' }}>
                  {!e.showToken && <CircularProgressBar scale={1} value={e.value} />}
                  {e.showToken && <img src={TokenIcon} alt="geoRaise token icon" height={40} width={40} style={{ marginTop: 10 }} />}
                </div>
              </Grid>
              <Grid item xs={7} xl="auto" justifyContent="center" alignItems="center" className="pl-1 d-flex">
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.6em', color: 'var(--tertiary-color)' }}>{e.title}</p>
                  <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--secondary-color)' }}>{e.data}</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <div className="d-flex justify-content-center">
        <Link to={`/user/${props.user?.id}`}>
          <Button size="small" style={{ marginTop: '70px' }}>Edit Profile Information</Button>
        </Link>
      </div>
      <div className="d-flex justify-content-center">
        {/* todo show button on active subscription only */}
        <Link to="/unsubscribe-plan">
          <Button
            size="small"
            style={{ marginTop: '15px', backgroundColor: 'transparent', color: 'var(--primary-color)' }}
          >
            Unsubscribe Plan
          </Button>
        </Link>
      </div>
    </Paper>
  );
}
