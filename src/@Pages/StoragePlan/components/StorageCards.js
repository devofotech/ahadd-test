/* eslint-disable complexity */
import React, { useState } from 'react';
import {
  Grid, Box, Paper, Button,
} from '@material-ui/core';
import { numberWithCommas } from '@Helpers';
import BestValue from '@Assets/Images/best-value.png';
import SelectButton from './SelectButton';

const storageConverter = (d) => (
  d / 1000 < 2000 ? `${d / 1000}GB` : `${d / 1000000}TB`
);

const emailSupport = {
  1: 'Standard Email Support',
  2: 'Standard Email Support',
  3: 'Standard Email and Chat Support',
  4: 'Prioritized Email and Chat Support',
};

export default function StorageCards(props) {
  const [onHover, setOnHover] = useState(false);
  return (
    <Grid item xs={3} style={{ position: 'relative' }}>
      {!!props.is_best && (
        <img
          src={BestValue}
          style={{
            position: 'absolute',
            zIndex: 99,
            top: 0,
            right: 20,
            transform: onHover ? 'scale(0.94)' : 'scale(0.8)',
            transition: 'all .25s',
          }}
        />
      )}
      <Paper
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        style={{
          transform: onHover && 'scale(1.01)',
          transition: 'all .25s',
          minHeight: '31rem',
          position: 'relative',
          outline: onHover && '1px solid var(--primary-color)',
        }}
      >
        <Box className="p-3">
          {!!props.image ? (
            <img
              className="card-img-top my-4 d-flex mx-auto"
              src={`${process.env.REACT_APP_S3}/${props.image}`}
              alt={`${process.env.REACT_APP_S3}/${props.image}`}
              height="70rem"
              style={{ objectFit: 'cover', width: '10rem' }}
            />
          ) : (
            <div style={{ height: '13.5vh', backgroundColor: 'transparent' }} />
          )}
          <h3 className="text-center mt-4">{props.name}</h3>
          {!!props.price ? (
            <Box className="my-3 d-flex justify-content-center align-items-end">
              <h3 style={{ fontSize: '30px' }} className="text-center">${numberWithCommas(props[`price_${props.mode}`].unit_amount / 100)}</h3>
              <div style={{ color: 'var(--tertiary-color)', fontSize: 12, marginBottom: 2 }}>/{props.mode === 'monthly' ? 'month' : 'year'}</div>
            </Box>
          ) : (
            <Box className="my-3 d-flex justify-content-center align-items-end">
              <h3 style={{ fontSize: '30px' }} className="text-center">Free</h3>
            </Box>
          )}
          <Box className="text-center mt-3" style={{ fontWeight: 600 }}>
            <TextDisplayGreen textGray="Up to&nbsp;" textGreen={`${props.user_limit} Team User${!!props.price ? 's' : ''}`} position={2} />
            <TextDisplayGreen textGray="Up to&nbsp;" textGreen={`${props.asset_limit} Asset${!!props.price ? 's' : ''} Creation`} position={2} />
            <TextDisplayGreen textGray="&nbsp;Storage" textGreen={`${numberWithCommas(props.value / 1000)}GB `} position={1} />
            <TextDisplayGreen textGray={emailSupport[props.id]} />
            {!!props.free_token && (
              <TextDisplayGreen textGray="Free&nbsp;" textGreen={`${numberWithCommas(props.free_token)} geoRÄISE Token`} position={2} />
            )}
            <TextDisplayGreen textGray="Full Access to geoRÄISE Features" />
          </Box>
          {/* <p className="mt-5 text-center">Cancel anytime. <Link to="/privacy-policy">Terms apply</Link></p> */}
          <Box className="mt-4 mb-2 d-flex justify-content-center">
            {((props.is_current_plan && `${props.currentMode}ly` === props.mode) || (props.is_current_plan && props.id == 1))
              && <Button className="text-center" variant="outlined" disabled>Current Plan</Button>}
          </Box>
        </Box>
        <Box
          className="w-100 mt-1 pt-2"
          style={{
            visibility: onHover ? 'visible' : 'hidden',
            position: 'absolute',
            bottom: 0,
          }}
        >
          {(!props.is_current_plan || `${props.currentMode}ly` !== props.mode)
            && (<SelectButton set_hover={setOnHover} {...props} />)}
        </Box>
      </Paper>
    </Grid>
  );
}

const TextDisplayGreen = ({ textGray, textGreen, position }) => {
  if (position == 2) {
    return (
      <div className="mt-2 d-flex flex-row justify-content-center">
        <div style={{ fontSize: 12, color: 'grey' }}>{textGray}</div>
        <div style={{ fontSize: 12, color: 'var(--secondary-color)' }}>{textGreen}</div>
      </div>
    );
  }
  if (position == 1) {
    return (
      <div className="mt-2 d-flex flex-row justify-content-center">
        <div style={{ fontSize: 12, color: 'var(--secondary-color)' }}>{textGreen}</div>
        <div style={{ fontSize: 12, color: 'grey' }}>{textGray}</div>
      </div>
    );
  }
  return (
    <div className="mt-2 d-flex flex-row justify-content-center">
      <div style={{ fontSize: 12, color: 'grey' }}>{textGray}</div>
    </div>
  );
};
