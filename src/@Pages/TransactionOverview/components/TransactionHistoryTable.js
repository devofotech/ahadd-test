import React from 'react';
import { Grid, Box, CircularProgress } from '@material-ui/core';
import Table from '@Components/MaterialTable';
import moment from 'moment';
import { capitalize, numberWithCommas } from '@Helpers';

const columns = [
  {
    name: 'Reference',
    selector: 'reference',
    align: 'left',
    minWidth: 50,
  },
  {
    name: 'Time',
    selector: 'time',
    align: 'left',
    minWidth: 80,
  },
  {
    name: 'Description',
    selector: 'description',
    align: 'left',
    minWidth: 150,
  },
  {
    name: 'Type',
    selector: 'type',
    align: 'left',
    minWidth: 80,
  },
  {
    name: 'Status',
    selector: 'status',
    align: 'left',
    minWidth: 90,
  },
  {
    name: 'Amount',
    selector: 'amount',
    align: 'left',
    minWidth: 100,
  },
];

export default function TransactionHistoryTable(h) {
  const transactionData = !!h.status
    ? h?.transactions?.filter(stat => (h.status === 'All' ? stat : stat.status === (h?.status.toLowerCase())))
    : h?.transactions;

  // const sortedTransactions = transactionData.slice(0).reverse().map(trans => trans);

  const statusIndicator = (status) => {
    const color = { success: '#34D2B2', fail: '#EA1601', pending: '#FEB019' };
    return (
      <div className="d-flex align-items-center">
        <Box style={{
          backgroundColor: color[status], width: 10, height: 10, borderRadius: 50, marginRight: 10,
        }}
        />
        <p style={{ color: color[status] }}>{status}</p>
      </div>
    );
  };

  return (
    <>
      <Grid item md={12}>
        {h.isLoading ? (
          <CircularProgress
            size={75}
            className="position-absolute"
            style={{
              top: '50%', left: '50%', marginTop: -20, marginLeft: -40, color: 'var(--primary-color)',
            }}
          />
        ) : (
          <Table
            tableHead
            columns={columns}
            tableData={transactionData.map(d => ({
              reference: `${d?.id}-${d?.PaymentId}-${d?.UserId}-${moment(d.updatedAt).format('DDMMYYYY')}`,
              time: moment(d.updatedAt).format('h:mm:ss a'),
              description: `${d.Payment?.currency === 'usd' ? 'Credit Card' : 'geoRÄISE Token'} ${(d?.status)}`,
              type: `${d.Payment?.type === 'random' ? 'payment' : d.Payment?.type ?? 'payment'}`,
              status: statusIndicator(d.status),
              amount: d.Payment?.currency === 'usd'
                ? `$${numberWithCommas(d?.Payment?.amount ?? d.value)}`
                : `RC${numberWithCommas(d?.Payment?.amount ?? d.value)}`,
            }))}
            tableMinWidth={300}
            tableMaxHeight={450}
          />
        )}

      </Grid>
    </>
  );
}
