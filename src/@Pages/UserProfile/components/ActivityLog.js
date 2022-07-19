import { Divider, Grid, CircularProgress } from '@material-ui/core';
import Button from '@Components/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import CsvDownload from 'react-json-to-csv';

export default ({
  activityLog, isLoadingActivityLog, user, isLoadingPageAccess, isNotSelf = false,
}) => {
  const ActivityLogs = () => (
    activityLog?.sort((a, b) => b.id - a.id).map((log) => (
      <>
        <Grid container>
          <Grid item xs={8}><p>{log.description}</p></Grid>
          <Grid item direction="column">
            <Grid><small style={{ fontFamily: 'CeraProRegular' }}>{moment(log.createdAt).format('DD/MM/YYYY')}</small></Grid>
            <Grid><small style={{ fontFamily: 'CeraProRegular' }}>{moment(log.createdAt).format('hh:mm A')}</small></Grid>
          </Grid>
        </Grid>
        <Divider className="my-2" />
      </>
    ))
  );

  const NoData = () => (
    <h1 className="flex-standard mt-5" style={{ color: '#e5e5e5' }}>No data</h1>
  );

  const Loading = () => (
    <div className="flex-standard mt-5"><CircularProgress style={{ color: 'var(--primary-color)' }} /></div>
  );

  const csvData = activityLog.map(log => {
    const Date = moment(log.createdAt).format('DD-MMM-YY');
    const Time = moment(log.createdAt).format('hh:mm A');
    return {
      User: user?.name,
      Description: log.description,
      'IP Address': log.ip_address,
      Date,
      Time,
    };
  });

  return (
    <Grid className="bg-white shadow rounded-xl px-4 h-100 w-100">
      <Grid container justify="space-between" className="mt-4">
        <h3>Activity Log</h3>
        {!!activityLog.length ? (
          <CsvDownload filename={`Activity Log ${user?.name}.csv`} data={csvData} className="rounded-xl bg-transparent border-0 p-0">
            <Button>
              <GetAppIcon style={{ width: '15%' }} /> DOWNLOAD
            </Button>
          </CsvDownload>
        ) : (
          <Button disabled>
            <GetAppIcon style={{ width: '15%' }} /> DOWNLOAD
          </Button>
        )}
      </Grid>
      <Grid
        className="mt-3 pr-3 overflow-auto w-100 mb-3"
        style={{
          height: !isNotSelf
            ? '35em'
            : (!user.TeamId && !isLoadingPageAccess) ? '168rem' : '35rem'
        }}
      >
        {isLoadingActivityLog
          ? <Loading />
          : activityLog?.length ? <ActivityLogs /> : <NoData />}
      </Grid>
    </Grid>
  );
};
