import React, { useState } from 'react';
import {
  Grid, Box, Paper,
} from '@material-ui/core';
import BestValue from '@Assets/Images/best-value.png';
import { decimalNumberFormat } from '@Helpers';
import SelectButton from './SelectButton';

const tokenIcon = 'https://i.ibb.co/hyD60Bg/Screenshot-2021-12-24-112726.png';

export default function TokenCard(props) {
  const [onHover, set_onHover] = useState(false);
  return (
    <Grid item xs={3} className="position-relative">
      {[4].includes(props.id) && (
        <img
          src={BestValue}
          style={{
            position: 'absolute',
            zIndex: 99,
            top: onHover ? -3 : 3,
            right: 20,
            transform: onHover ? 'scale(0.9)' : 'scale(0.8)',
            transition: 'all .25s',
          }}
        />
      )}
      <Paper
        onMouseOver={() => set_onHover(true)}
        onMouseLeave={() => set_onHover(false)}
        style={{
          transform: onHover && 'scale(1.05)',
          transition: 'all .25s',
          position: 'relative',
        }}
      >
        <Box className="p-3">
          <h3 className="text-center mt-2 pt-4">{`${props.name}`}</h3>
          <Box className="mt-4">
            <img
              className="card-img-top"
              src={`${process.env.REACT_APP_S3}/${props.image}`}
              alt={`${process.env.REACT_APP_S3}/${props.image}`}
              height="110rem"
            />
            <Box className="mt-1 pt-3 d-flex justify-content-center">
              <img
                src={tokenIcon}
                height={30}
                width={30}
              />&nbsp;
              <h2 className="text-center">{decimalNumberFormat.format(props.value)}</h2>
            </Box>
          </Box>
          <h2 className="mt-3 pt-2 text-center" style={{ fontSize: 18, paddingBottom: '2.8rem' }}>{`$ ${props.price.toFixed(2)}`}</h2>
        </Box>
        <Box
          className="w-100 mt-1 pt-2"
          style={{
            visibility: onHover ? 'visible' : 'hidden',
            position: 'absolute',
            bottom: 0,
          }}
        >
          <SelectButton set_hover={set_onHover} {...props} />
        </Box>
      </Paper>
    </Grid>
  );
}
