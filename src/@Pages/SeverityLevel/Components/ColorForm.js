import React, { useState } from 'react';
import {
  Box, Grid, TextField, styled,
} from '@material-ui/core';
import { CirclePicker } from 'react-color';
import { ColorPickerIcon } from '@Assets/Icons';

export default function ColorForm({
  level, index, organizationId, defaultData, onChange = () => null, openPicker, setOpenPicker,
}) {
  const [color, setColor] = useState(!!defaultData ? `#${defaultData.colour}` : 'white');
  const ColorPickerDialog = () => (
    <Box
      className="position-absolute p-4 rounded"
      style={{
        top: '0.8rem',
        left: '5rem',
        backgroundColor: '#FFF',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        zIndex: 99,
      }}
    >
      <CirclePicker
        color={color}
        onChangeComplete={(values) => {
          setColor(values.hex);
          onChange({
            selection: index,
            organizationId,
            target: {
              name: 'colour',
              value: values.hex.replace(/#(?=\S)/g, ''),
            },
          });
          setOpenPicker({ [index]: !openPicker[index] });
        }}
      />
    </Box>
  );

  return (
    <Grid spacing={3} container className="mb-0">
      <Grid xs={12} sm={6} item className="w-100">
        <InputBox>
          <CustomInput
            label={`${level} Severity`}
            defaultValue={defaultData?.name}
            variant="outlined"
            inputProps={{ maxLength: 10, minLength: 1 }}
            onChange={(values) => {
              onChange({
                selection: index,
                organizationId,
                target: {
                  name: 'name',
                  value: values.target.value,
                },
              });
            }}
          />
        </InputBox>
      </Grid>
      <Grid xs={12} sm={6} item className="w-100 position-relative">
        <InputBox
          className="d-flex justify-content-center align-items-center pointer"
          style={{
            height: '3.5rem', width: '3.5rem', padding: 4, backgroundColor: color,
          }}
          onClick={() => setOpenPicker({ [index]: !openPicker[index] })}
        >
          <ColorPickerIcon color="rgba(0, 0, 0, 0.4)" />
        </InputBox>
        {openPicker[index] && (<ColorPickerDialog />)}
      </Grid>
    </Grid>
  );
}

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
