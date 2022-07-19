import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@material-ui/core';

const useStyles = makeStyles({
  checked: {
    color: 'var(--primary-color)',
  },
});

function PrimaryColorRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      color="default"
      classes={classes}
      {...props}
    />
  );
}

export default (props) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.title}</FormLabel>
      <RadioGroup name="use-radio-group" onChange={props.onChange}>
        {props.items.map(e => (typeof e === 'object'
          ? (
            <div className="d-flex align-items-center">
              <FormControlLabel className='my-1' control={<PrimaryColorRadio />} checked={!!(props.value === e.value)} value={e.value} label={e.label} />
              {e.hasIcon && props.icon}
            </div>
          )
          : <FormControlLabel control={<PrimaryColorRadio />} value={e} label={e} />))}
      </RadioGroup>
    </FormControl>
  );
};
