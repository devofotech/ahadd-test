import {
  Grid, Paper, IconButton, InputAdornment, MenuItem, TextField,
} from '@material-ui/core';
import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import ExpensesChart from './components/ExpensesChart';
import SpentTokenChart from './components/SpentTokenChart';
import LatestTransaction from './components/LatestTransaction';
import useHook from './hook';
import TransactionHistoryTable from './components/TransactionHistoryTable';

const Status = [
  { value: 'All' },
  { value: 'Success' },
  { value: 'Pending' },
  { value: 'Failed' },
];

const SearchBox = styled(TextField)(() => ({
  transform: 'scale(0.8)',
  marginLeft: -25,
  '& fieldset': {
    borderRadius: '30px',
  },
}));

export default function index(props) {
  const h = useHook(props);
  // const csvData = h.transactions.map(d => ({
  //   User: props.user?.name,
  //   Reference: `${d?.id}${d?.PaymentId}${d?.UserId} ${moment(d.updatedAt).format('DDMMYYYY')} ${moment(d.updatedAt).format('h:mm:ss a')}`,
  //   Description: `${d.Payment.currency === 'usd' ? 'Credit Card' : 'RÄISE Token'} ${capitalize(d.status)}`,
  //   Type: `${d.Payment.type === 'random' ? 'Payment' : capitalize(d.Payment.type)}`,
  //   Status: capitalize(d.status),
  //   Amount: `$${numberWithCommas(d.Payment.amount)}`,
  // }));
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <h1 className="mr-4 mt-2" style={{ fontWeight: 600, fontSize: 28, color: 'var(--primary-color)' }}>Transaction Overview</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} xl={3}>
          <LatestTransaction {...h} />
        </Grid>
        <Grid item md={9} xl={9} className="d-flex flex-column">
          <div className="d-flex flex-row" style={{ gap: 22, flex: '0 0 auto' }}>
            <ExpensesChart {...h} />
            <SpentTokenChart {...h} />
          </div>
          <Paper style={{ flex: '1 0 auto', marginTop: 20, padding: 35 }}>
            <div className="d-flex align-items-center justify-content-between">
              <h3>Transaction History</h3>
              <div className="d-flex justify-content-end align-items-center">
                <TextField
                  label={<p style={{ fontSize: '12px' }}>SELECT STATUS</p>}
                  size="small"
                  style={{ width: 150, marginBottom: 10, marginRight: 20 }}
                  select
                  value={h.status}
                  onChange={e => h.setStatus(e.target.value)}
                >
                  {Status.map((d, i) => (
                    <MenuItem value={d.value}>
                      {d.value}
                    </MenuItem>
                  ))}
                </TextField>
                <SearchBox
                  onKeyDown={h.onKeyDown}
                  label="Reference"
                  size="small"
                  variant="outlined"
                  value={h.keyword}
                  onChange={(e) => (h.handleChangeFilter(e.target.value), h.setKeyword(e.target.value))}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment><IconButton onClick={() => h.getTransactions}><Search /></IconButton></InputAdornment>),
                  }}
                />
                {/* <CsvDownload filename={`Transaction History ${props.user?.name}.csv`} data={csvData} className="border-0 p-0 bg-white">
                  <Button>
                    <GetApp style={{ color: '#045C5C' }} />
                  </Button>
                </CsvDownload> */}
              </div>
            </div>
            <TransactionHistoryTable {...h} status={h.status} />
          </Paper>
          <Paper />
        </Grid>
      </Grid>
    </div>
  );
}
