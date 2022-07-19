/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import Api, { endpoints } from '@Helpers/api';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Grid, Divider, CircularProgress, Button, Tooltip,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import { GetApp, Info, InfoOutlined } from '@material-ui/icons';
import { initialsFromUser, isValidHttpUrl } from '@Helpers';
import CsvDownload from 'react-json-to-csv';

const avstyle = {
  width: '2em',
  height: '2em',
  borderRadius: '50%',
  fontSize: '12px',
  backgroundColor: '#506288',
  color: 'white',
  objectFit: 'cover',
  paddingBottom: '1px',
  boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.1)',
};

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activityLog, setActivityLog] = useState({});

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    Api({
      endpoint: activityLog.nextpage ? ['GET', activityLog.nextpage] : endpoints.activityLog(),
      onSuccess: (response) => {
        if (activityLog.data) {
          const prev_data = [...activityLog.data];
          const prev_data_ids = prev_data.map((id) => id);
          const filtered_response_data = response.data.filter(f => !prev_data_ids.includes(f.id));
          setActivityLog({ ...response, data: [...prev_data, ...filtered_response_data] });
          setIsLoading(false);
          return;
        }
        setActivityLog(response);
        setIsLoading(false);
      },
      onFail: () => setIsLoading(false),
    });
  };

  const reloadActivityLog = () => {
    if (isLoading) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.activityLog(),
      onSuccess: (response) => {
        setActivityLog(response);
        setIsLoading(false);
      },
      onFail: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    reloadActivityLog();
  }, [props.isLogUpdated]);

  const csvData = activityLog.data?.map(log => {
    const Date = moment(log.createdAt).format('DD-MMMM-YY');
    const Time = moment(log.createdAt).format('hh:mm A');
    const User = log.User.name;
    const User_Id = log.UserId;
    const Description = log.description;
    const Ip_Address = log.ip_address;
    const Asset = !!log.Asset ? log.Asset.name : '';
    return {
      Date, Time, User, User_Id, Description, Ip_Address, Asset,
    };
  });
  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={!!activityLog.nextpage}
      loader={(
        <Grid container justify="center">
          <CircularProgress size={25} />
        </Grid>
      )}
      useWindow={false}
    >
      <Grid container direction="column" style={{ width: 'auto', padding: '20px 15px' }}>
        <div className="d-flex justify-content-around align-items-center">
          <h3 className="mx-auto mb-2">Activity Log</h3>
        </div>
        {props.profile && (
          <div className="d-flex justify-content-around mb-2">
            <Tooltip title="View Detail">
              <Button size="small" variant="contained" className="text-white" style={{ backgroundColor: 'var(--primary-color)' }} onClick={() => props.h.setActivePage(1)}>
                <Info style={{ fontSize: 14 }} />
              </Button>
            </Tooltip>
            <CsvDownload filename={`Activity Log ${moment().format('DD-MM-YYYY-hh-mm-ss')}.csv`} data={csvData} className="border-0 p-0 bg-color-primary" style={{ borderRadius: 4 }}>
              <Tooltip title="Download">
                <Button size="small" variant="contained" className="text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
                  <GetApp style={{ fontSize: 14 }} />
                </Button>
              </Tooltip>
            </CsvDownload>
          </div>
        )}
        <div className="hide-scroll" style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '46rem' }}>
          {!isLoading && activityLog.data?.map(m => (
            <>
              <Divider />
              <div className="d-flex flex-column px-0 py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <InfoOutlined className="color-secondary" />
                    <p className="color-secondary">{m.description}</p>
                  </div>
                  <Tooltip title={m.User.name}>
                    {m.User?.image ? (
                      <img
                        src={m.User.image ? isValidHttpUrl(m.User.image) ? m.User.image : `${process.env.REACT_APP_S3}/${m.User.image}` : `https://d37bxaq5q1mz6s.cloudfront.net/User/${m.User.EMPLOYEE_NUMBER}.jpg`}
                        style={avstyle}
                      />
                    ) : (
                      <div className="flex-standard" style={avstyle}>{initialsFromUser({ name: m.User.name })}</div>
                    )}
                  </Tooltip>
                </div>
                <small>
                  <Grid container className="d-flex justify-content-between">
                    <Grid item><p className="pr-4">{moment(m.createdAt).format('DD/MM/YYYY hh:mm a')}</p></Grid>
                    <Grid item><p>{moment(m.createdAt).fromNow()}</p></Grid>
                  </Grid>
                </small>
              </div>
            </>
          ))}
        </div>
      </Grid>
    </InfiniteScroll>
  );
};
