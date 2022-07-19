import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import ActivityLog from '@Components/ActivityLog';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import ProfileCard from './components/ProfileCard';
import StorageCard from './components/StorageCard';
import TokenCard from './components/TokenCard';
import PaymentMethod from './components/PaymentMethod';
import useHook from './hook';
import AssetSummary from './components/AssetSummary';
import ActivityLogAdmin from './ActivityLogAdmin';

export default function index(props) {
  const h = useHook(props);

  return (
    <Grid container md={12} spacing={2} className="mt-1 mb-2">
      {h.isLoading ? <CenteredLoadingContainer height="80vh" size={75} hasText text="data" />
        : (
          <>
            <Grid item xs={12} md={3}>
              <ProfileCard {...props} {...h} />
            </Grid>
            {{
              0: <UserProfile h={h} props={props} />,
              1: <ActivityLogAdmin h={h} props={props} />,
            }[h.activePage]}
          </>
        )}
    </Grid>
  );
}

const UserProfile = ({ h, props }) => {
  return (
    <>
      <Grid item md={7}>
        <h1
          style={{
            fontWeight: 600,
            fontSize: 28,
            color: 'var(--primary-color)',
          }}
        >
          User Profile
        </h1>
        {!h.isOrgUnlimited && (
          <>
            <div className="d-flex mt-3 justify-content-between">
              <StorageCard {...h} />
              <TokenCard {...props} />
            </div>
            <PaymentMethod {...h} />
          </>
        )}
        <AssetSummary {...h} />
      </Grid>
      <Grid item xs={12} md={2}>
        <Paper className="bg-white rounded-xl mb-2 h-100" style={{ overflow: 'hidden' }}>
          <ActivityLog profile {...props} h={h} isLogUpdated={h.isLogUpdated} setIsLogUpdated={h.setIsLogUpdated} />
        </Paper>
      </Grid>
    </>
  );
};
