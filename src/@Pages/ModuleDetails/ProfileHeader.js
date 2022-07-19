import React, { useState } from 'react';
import { Button as MuiButton, TextField } from '@material-ui/core';
import Button from '@Components/Button';
import { Delete, VisibilityOff, Visibility } from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import DeleteDialog from '@Components/DeleteDialog';

const fontFamily = 'CeraProRegular';

export default function index({
  modules, module, deleteModule, disableModule, moduleName, setModuleName, updateModuleName,
}) {
  const [open, setOpen] = useState(false);
  const isChanged = modules.filter(e => e.id !== module.id).find(f => f.name?.toLowerCase() === moduleName?.toLowerCase());
  return (
    <div className="d-flex flex-column w-100" style={{ flex: '0 0 auto', marginBottom: '0.8vh' }}>
      <TextField
        placeholder="Module Name Here"
        InputProps={{
          disableUnderline: true,
          style: {
            fontSize: 25, fontWeight: 600, color: 'var(--primary-color)', marginBottom: -5,
          },
        }}
        onChange={(e) => setModuleName(e.target.value)}
        value={moduleName}
      />
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <h3 style={{ fontSize: 12, color: 'grey' }}>Status: </h3>
          <h3 style={{ fontSize: 12, color: !!Number(module.is_freeze) ? 'red' : 'var(--active-color)' }}>
            &nbsp;{!!Number(module.is_freeze) ? 'Freeze' : 'Active'}
          </h3>
        </div>
        <div className="flex-standard">
          {!!isChanged && (
            <p className="mr-1" style={{ color: 'red' }}>{moduleName} has been taken, please use other name.</p>
          )}
          {!isChanged && !!moduleName.length && (
            <Button
              size="small"
              className="mx-2 text-white"
              style={{
                fontFamily, width: '5.5rem', minHeight: '36px', maxHeight: '36px',
              }}
              onClick={updateModuleName}
            >
              SAVE
            </Button>
          )}
          <DeleteButton
            size="small"
            onClick={() => setOpen(true)}
          >
            <Delete style={{ color: 'red', fontSize: 20 }} />
          </DeleteButton>
          <MuiButton
            size="small"
            className="mx-2 color-primary"
            style={{
              backgroundColor: '#fff', border: '1.3px solid var(--primary-color)', width: '5.5rem', minHeight: '36px', maxHeight: '36px',
            }}
            onClick={disableModule}
          >
            {!module.is_freeze
              ? (
                <>
                  <VisibilityOff style={visibilityStyle} />&nbsp;<text className="color-primary" style={{ fontFamily, fontSize: 12 }}>DISABLE</text>
                </>
              )
              : (
                <>
                  <Visibility style={visibilityStyle} />&nbsp;<text className="color-primary" style={{ fontFamily, fontSize: 12 }}>ENABLE</text>
                </>
              )}
          </MuiButton>
          <DeleteDialog
            open={open}
            setOpen={setOpen}
            selected={module}
            setSelected={() => null}
            deleteFunction={deleteModule}
          />
        </div>
      </div>
    </div>
  );
}

const DeleteButton = styled(MuiButton)(() => ({
  backgroundColor: '#FFF',
  color: 'var(--primary-color)',
  border: '1.3px solid var(--primary-color)',
  maxWidth: '36px',
  minWidth: '36px',
  maxHeight: '36px',
  minHeight: '36px',
}));

const visibilityStyle = {
  fontSize: 10,
  color: 'var(--primary-color)',
};
