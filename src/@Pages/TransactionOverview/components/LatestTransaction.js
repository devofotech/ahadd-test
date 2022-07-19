import {
  ListItem, ListItemText, Paper, List, CircularProgress,
} from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { capitalize, numberWithCommas } from '@Helpers';
import RaiseToken from '@Assets/Icons/icon_raise_coin.png';

export default function LatestTransaction(h) {
  console.log('asdasd', h.transactions);
  return (
    <Paper style={{
      flex: '1 0 auto', marginTop: 15, padding: 35, height: !!h.transactions.length ? 'auto' : '100vh',
    }}
    >
      <h3 className="mb-3">Latest Transactions</h3>
      <List className="transaction-list" style={{ maxHeight: 800 }}>
        {!!h.transactions.length ? (
          h.isLoading ? (
            <CircularProgress
              size={75}
              className="position-absolute"
              style={{
                top: '50%', left: '50%', marginTop: -20, marginLeft: -40, color: 'var(--primary-color)',
              }}
            />
          ) : h.transactions?.map(d => (
            <ListItem ContainerComponent="div" style={{ paddingInline: 0 }}>
              <ListItemText
                primary={d?.Payment?.currency === 'usd' ? (
                  <div className="d-flex justify-content-between">
                    <h3 style={{ fontSize: '14px' }}>Credit Card</h3>
                    <h3 style={{ fontSize: '14px' }}>
                      ${numberWithCommas(d?.Payment?.amount ?? d.value)}
                    </h3>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between">
                    <h3 style={{ fontSize: '14px' }}>geoRÄISE Token</h3>
                    <h3 style={{ fontSize: '14px' }}>
                      <img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} />{numberWithCommas(d?.Payment?.amount ?? d.value)}
                    </h3>
                  </div>
                )}
                secondary={(
                  <div className="d-flex justify-content-between">
                    <p style={{ fontSize: '12px' }}>{d?.Payment?.type === 'random' ? 'payment' : d.Payment?.type ?? 'payment'}</p>
                    <p style={{ fontSize: '12px' }}>{moment(d?.updatedAt).format('DD MMM, hh:mm')}</p>
                  </div>
                )}
              />
            </ListItem>
          ))
        ) : (
          <span>No latest transaction data</span>
        )}
      </List>
    </Paper>
  );
}
