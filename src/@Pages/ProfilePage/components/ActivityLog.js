import {
  Paper, ListItem, ListItemText, List, Divider,
} from '@material-ui/core';
import React from 'react';
import { GetApp } from '@material-ui/icons';
import moment from 'moment';
import CsvDownload from 'react-json-to-csv';
import Button from '@Components/Button';

export default function ActivityLog(h) {
  const ActivityLogs = () => (
    h.activityLog?.sort((a, b) => b.id - a.id).map((log) => (
      <List className="transaction-list" style={{ maxHeight: 300, width: 'auto' }}>
        <ListItem>
          <ListItemText
            primary={(
              <p style={{ fontSize: '14px' }}>{log.description}</p>
            )}
            secondary={(
              <small>{moment(log.createdAt).format('DD/MM/YYYY')}<br />{moment(log.createdAt).format('hh:mm A')}</small>
            )}
          />
        </ListItem>
        <Divider className="my-2" />
      </List>
    ))
  );

  const csvData = h.activityLog?.map(log => {
    const Date = moment(log.createdAt).format('DD-MMM-YY');
    const Time = moment(log.createdAt).format('hh:mm A');
    return {
      User: h.user?.name,
      Description: log.description,
      'IP Address': log.ip_address,
      Date,
      Time,
    };
  });

  const NoData = () => <h1 className="flex-standard mt-5" style={{ color: '#e5e5e5' }}>No data</h1>;

  return (
    <Paper className="bg-white rounded-xl px-4 h-100">
      <div className="d-flex justify-content-between">
        <p className="text-light mt-3">Activity Log</p>
        {!!h.activityLog?.length ? (
          <CsvDownload filename={`Activity Log ${h.props.user?.name}.csv`} data={csvData} className="rounded-xl border-0 p-0">
            <Button size="small" className="mt-2">
              <GetApp style={{ width: '15%' }} /> DOWNLOAD
            </Button>
          </CsvDownload>
        ) : (
          <Button disabled size="small" className="mt-2">
            <GetApp style={{ width: '15%' }} /> DOWNLOAD
          </Button>
        )}
      </div>
      {h.activityLog?.length ? <ActivityLogs /> : <NoData />}
    </Paper>
  );
}
