import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox, FormGroup, FormControlLabel, FormControl, FormLabel, TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
  checked: {
    color: 'var(--primary-color)',
  },
});

function PrimaryColorCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
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
      <FormGroup>
        {props.items.map(e => (typeof e === 'object'
          ? (
            <div className="d-flex">
              <FormControlLabel
                control={(
                  <PrimaryColorCheckbox />
                )}
                value={e.value}
                label={e.label}
                checked={!!(props.value.includes(e.value))}
                onChange={props.onChange}
              />
              {!!props.withTextInput && (
                <TextField
                  key={`inputbox-${e.value}`}
                  required={!!(props.value.includes(e.value))}
                  disabled={!(props.value.includes(e.value))}
                  inputProps={{ 'data-id': e.value }}
                  onChange={props.textInputOnChange}
                  value={props.textValue?.[e.value]}
                  placeholder="Layer Name"
                />
              )}
            </div>
          )
          : (<FormControlLabel control={<PrimaryColorCheckbox />} value={e} label={e} />)
        ))}

      </FormGroup>
    </FormControl>
  );
};
