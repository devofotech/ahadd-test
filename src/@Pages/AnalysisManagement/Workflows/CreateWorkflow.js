import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { initialsFromUser } from '@Helpers';
import Button from '@Components/Button';

const fontFamily = 'CeraProRegular';

export default ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  return (
    <div className="px-2 pt-3 position-relative" style={{ height: '90%' }}>
      <div className="flex-standard mx-auto mt-3" style={AvatarStyle}>{initialsFromUser({ name })}</div>
      <div className="d-flex flex-column mt-2">
        {
          [
            {
              placeholder: 'Workflow Name', value: name, onChange: (e) => setName(e.target.value), inputProps: { style: { textAlign: 'center', fontSize: 16, fontFamily } },
            },
            {
              placeholder: 'Workflow Description', value: description, onChange: (e) => setDescription(e.target.value), inputProps: { style: { textAlign: 'center', fontSize: 12, fontFamily } },
            },
          ].map(m => (
            <TextField
              {...m}
              InputProps={{ disableUnderline: true }}
              required
              size="small"
              className="pt-2"
            />
          ))
        }
      </div>
      <Button
        size="small"
        className="position-absolute"
        style={{
          left: '50%', bottom: 0, transform: 'translate(-50%, 0)', width: '90%',
        }}
        onClick={() => onCreate({ name, description })}
        disabled={!name && !description}
      >
        CREATE WORKFLOW
      </Button>
    </div>
  );
};

const AvatarStyle = {
  width: '3.5em',
  height: '3.5em',
  borderRadius: '10%',
  outline: '1px solid #C8CBD3',
  fontSize: '14px',
  backgroundColor: '#506288',
  color: 'white',
  objectFit: 'cover',
  paddingBottom: '1px',
  marginInline: '0.5rem',
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
};
