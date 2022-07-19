import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@Components/Button';

const fontFamily = 'CeraProRegular';

export default function index({
  handleChangeName, name, createModule, modules
}) {
  const isDisabled = !!modules.find(f => f.name.toLowerCase() === name.toLowerCase());
  return (
    <div className="d-flex" style={{ flex: '0 0 auto' }}>
      <div className="d-flex flex-column w-100">
        <TextField
          placeholder="Module Name Here"
          InputProps={{
            disableUnderline: true,
            style: {
              fontSize: 25, fontWeight: 500, color: 'var(--primary-color)', marginBottom: -5,
            },
          }}
          onChange={handleChangeName}
          value={name}
        />
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <h3 style={{ fontSize: 12, color: 'grey' }}>Status: </h3>
            <h3 style={{ fontSize: 12, color: 'var(--active-color)' }}>
              &nbsp;-
            </h3>
          </div>
          <div className="d-flex align-items-center">
            {isDisabled && <p style={{ color: 'red' }}>{name} has been taken, please use other name.</p>}
            <Button
              size="small"
              className="mx-2 text-white"
              disabled={!(name && !isDisabled)}
              style={{
                fontFamily, width: '5.5rem', minHeight: '36px', maxHeight: '36px',
              }}
              onClick={createModule}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
