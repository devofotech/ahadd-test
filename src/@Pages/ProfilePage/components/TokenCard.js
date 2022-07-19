import React from 'react';
import { Paper, Divider, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TokenIcon from '@Assets/Icons/icon_raise_coin.png';
import TokenPlusIcon from '@Assets/Icons/raise_token_plus.png';
import CoinWallet from '@Components/CoinWallet';

export default function TokenCard(props) {
  return (
    <Grid item md={6}>
      <Paper style={{ height: 75, padding: 20, marginLeft: 10 }}>
        <div className="d-flex align-items-center h-100 justify-content-around">
          <div className="m-auto">
            <img
              src={TokenIcon}
              alt="Raise token icon"
              height={70}
              width={70}
            />
          </div>
          <div className="d-flex flex-column mr-auto">
            <p className="text-light">geoRÄISE Token</p>
            <h3 style={{ color: '#FEB019', fontSize: '30px', marginTop: -5 }}><CoinWallet valueOnly /></h3>
          </div>
          <Divider orientation="vertical" variant="middle" className="h-75 ml-auto" />
          <div className="d-flex flex-column m-auto">
            {!!props.user?.can_view_purchase_token && (
              <Link to="/purchase-token">
                <img
                  src={TokenPlusIcon}
                  alt="Raise token with plus icon"
                  height={50}
                  width={55}
                  className="ml-1"
                />
                <h3 style={{
                  fontSize: '12px', textAlign: 'center', color: '#04847C', marginTop: 5,
                }}
                >Purchase <br />Token
                </h3>
              </Link>
            )}
          </div>
        </div>
      </Paper>
    </Grid>
  );
}
