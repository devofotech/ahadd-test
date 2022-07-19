import React from 'react';
import {
  Box, Grid, TextField, styled,
} from '@material-ui/core';

const issue_level = {
  1: 'Open',
  2: 'In-Progress',
  3: 'On Hold',
  4: 'Overdue',
  5: 'Closed',
};

export default function ColorForm({
  level, index, organizationId, defaultData, onChange = () => null, isFilled, ...h
}) {
  return (
    <Grid spacing={3} container className="mb-0">
      <Grid xs={12} sm={6} item className="w-100">
        <InputBox>
          <CustomInput
            className="w-100"
            label={`${issue_level[level]} Inspection Status`}
            defaultValue={defaultData?.name}
            variant="outlined"
            inputProps={{ maxLength: 11, minLength: 1 }}
            onChange={(values) => {
              h.setNonRemove({ ...h.nonRemove, [index]: false });
              if (index === 0) h.setError({ ...h.error, open: false });
              if (index === 4) h.setError({ ...h.error, close: false });
              onChange({
                isFilled,
                selection: index,
                organizationId,
                target: {
                  name: 'name',
                  value: values.target.value,
                  sequence: 'sequence_id',
                },
              });
            }}
          />
        </InputBox>
      </Grid>
      <Grid sm={6} className="d-flex my-auto">
        {h.nonRemove[index] && <div style={styleLabelError}>Cannot leave it empty once it assigned. Only edit is allowed.</div>}
        {index === 0 && <>{h.error.open && <div style={styleLabelError}>Required to fill in the open status.</div>}</>}
        {index === 4 && <>{h.error.close && <div style={styleLabelError}>Required to fill in the close status.</div>}</>}
      </Grid>
    </Grid>
  );
}

const styleLabelError = {
  color: 'red',
  fontSize: 12,
  fontWeight: 'bold',
};

const InputBox = styled(Box)({
  padding: 2,
  paddingTop: 8,
  backgroundColor: 'white',
  height: '3.4rem',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '5px',
});

const CustomInput = styled(TextField)({
  '& label.MuiInputLabel-root': {
    top: -4,
  },
  '& label.MuiInputLabel-shrink': {
    top: 6,
    fontSize: 14,
  },
  '& label.Mui-focused': {
    color: 'rgba(0, 0, 0, 0.4)',
  },
  '& .MuiInput-underline:hover': {
    borderBottomColor: 'transparent',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
  '& .MuiOutlinedInput-root': {
    color: 'rgba(0, 0, 0, 0.8)',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
});
