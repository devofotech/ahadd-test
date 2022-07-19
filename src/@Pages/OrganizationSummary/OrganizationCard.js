import React from 'react';
import {
  CircularProgress, Button,
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { truncateString } from '@Helpers';

export default ({ data, ...props }) => {
  return (
    <Link to={`/organization-summary/${data?.id}`}>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-center" style={{ marginBottom: 41, padding: 10, marginTop: 20 }}>
          {props.isLoading
            ? <LoadingCircle />
            : <img src={`${process.env.REACT_APP_S3}/static/media/defaultAssetImg-01.png`} style={{ width: '100%', height: '100%' }} />}
        </div>
        <div className="d-flex align-items-end">
          <Button
            style={{
              borderRadius: '0 0 5px 5px !important',
              width: '100%',
              backgroundColor: 'var(--primary-color)',
              color: '#FFF',
              fontWeight: 'bold',
              height: '50px',
              fontFamily: 'CeraProRegular',
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <span className="d-flex align-items-center justify-content-between w-100">
              {truncateString(data.name, 25)}
              <ChevronRight />
            </span>
          </Button>
        </div>
      </div>
    </Link>
  );
};

const LoadingCircle = () => (
  <div className="d-flex flex-standard w-100">
    <CircularProgress size={100} style={{ color: 'var(--primary-color)', marginTop: 10, marginBottom: 47 }} />
  </div>
);
