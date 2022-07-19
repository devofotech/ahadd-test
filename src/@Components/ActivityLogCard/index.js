/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */

import { initialsFromUser, isValidHttpUrl } from '@Helpers';
import {
  DateRange, Public, Schedule, Timeline,
} from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import moment from 'moment';

const avstyle = {
  width: '5em',
  height: '5em',
  borderRadius: '50%',
  fontSize: '16px',
  backgroundColor: '#506288',
  color: 'white',
  objectFit: 'cover',
  paddingBottom: '1px',
  boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.1)',
};

export default (props) => {
  return (
    <>
      <Grid container className="d-flex align-items-center px-2 py-4" xs={12}>
        <Grid item>
          {props.User?.image ? (
            <img
              src={props.User.image ? isValidHttpUrl(props.User.image) ? props.User.image : `${process.env.REACT_APP_S3}/${props.User.image}` : `https://d37bxaq5q1mz6s.cloudfront.net/User/${props.User.EMPLOYEE_NUMBER}.jpg`}
              style={avstyle}
            />
          ) : (
            <div className="flex-standard" style={avstyle}>{initialsFromUser({ name: props.User.name })}</div>
          )}
        </Grid>
        <Grid item className="d-flex flex-column" xs={9}>
          <p className="ml-4 mt-1 color-secondary">
            <span className="font-weight-bold">
              {props.User.name}
            </span>
            &nbsp;{props?.description}
            {!!props.Asset?.name && (
              <>
                &nbsp;for&nbsp;
                <span span className="font-weight-bold">{props.Asset?.name}</span>
              </>
            )}
          </p>
          <Grid container>
            <Grid item xs={7}><TextLabel><Public />&nbsp;IP address:&nbsp;<span className="color-secondary">{props?.ip_address}</span></TextLabel></Grid>
            <Grid item><TextLabel><Schedule />&nbsp;Time: {moment(props.createdAt).format('hh:mm a')}</TextLabel></Grid>
          </Grid>
          <Grid container>
            <Grid item xs={7}><TextLabel><DateRange />&nbsp;Date: {moment(props.createdAt).format('DD/MM/YYYY')}</TextLabel></Grid>
            <Grid item>{!!props.Asset?.name && <TextLabel><Timeline />&nbsp;Asset: {props.Asset?.name}</TextLabel>}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const TextLabel = (props) => {
  return (
    <p className="d-flex align-items-center ml-4 my-1 color-tertiary">{props.children}</p>
  );
};
