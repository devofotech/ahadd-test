import React from 'react';
import {
  Paper, Divider, Grid,
} from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import CircularProgressBar from '@Components/CircularProgressBar';
import { Link } from 'react-router-dom';

export default function StorageCard(h) {
  const usagePercentage = (num1, num2) => (num1 / num2) * 100;
  const totalStorage = h.organizationData?.['StoreStorage.value'] * 1.024 * (1024 ** 2);
  return (
    <Grid item md={6}>
      <Paper style={{ height: 75, padding: 20, marginRight: 10 }}>
        <div className="d-flex align-items-center h-100 justify-content-around">
          <div className="m-auto">
            <CircularProgressBar scale={1.5} x={5} value={usagePercentage(h.totalUsage, totalStorage)} />
          </div>
          <div className="d-flex flex-column mr-0 ml-4">
            <p className="text-light">Your Current Plan</p>
            <h3 style={{ color: '#04847C', fontSize: '30px', marginTop: -5 }}>
              { h.organizationData?.['StoreStorage.name'] }
            </h3>
          </div>
          <Divider orientation="vertical" variant="middle" className="h-75 ml-auto" />
          <div className="d-flex flex-column m-auto">
            {h.props.user?.raise_role === 'organization_admin' && (
              <Link to="/storage-plan">
                <ArrowUpward style={{
                  width: 55, height: 55, color: '#04847C', marginLeft: 3,
                }}
                />
                <h3 style={{
                  fontSize: '12px', textAlign: 'center', color: '#04847C',
                }}
                >Upgrade <br />plan
                </h3>
              </Link>
            )}
          </div>
        </div>
      </Paper>
    </Grid>

  );
}
