import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Delete, VisibilityOff, Visibility } from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import DeleteDialog from '@Components/DeleteDialog';
import AvatarIcon from '@Components/AvatarIcon';

const fontFamily = 'CeraProRegular';

export default function index({ workflow, deleteWorkflow, disableWorkflow }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="d-flex" style={{ marginBottom: '1.2vh' }}>
      <div className="flex-standard">
        <AvatarIcon
          user={workflow}
          size="1.5rem"
          fontSize="18px"
          colorType="inherit"
          backgroundColor={workflow?.colour ? workflow.colour : '#506288'}
          style={AvatarStyle}
        />
      </div>
      <div className="d-flex flex-column w-100">
        <h3 style={{
          fontSize: 25, fontWeight: 600, color: '', marginBottom: -5,
        }}
        >{workflow.name}
        </h3>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <h3 style={{ fontSize: 12, color: 'grey' }}>Status: </h3>
            <h3 style={{ fontSize: 12, color: !!workflow.is_freeze ? 'red' : 'var(--active-color)' }}>
              &nbsp;{!!workflow.is_freeze ? 'Freeze' : 'Active'}
            </h3>
          </div>
          <div>
            <DeleteButton
              size="small"
              onClick={() => setOpen(true)}
            >
              <Delete style={{ color: 'red', fontSize: 20 }} />
            </DeleteButton>
            <Button
              size="small"
              className="mx-2 color-primary"
              style={{ backgroundColor: '#fff', border: '1.3px solid var(--primary-color)', width: '5.5rem', minHeight: '36px', maxHeight: '36px' }}
              onClick={disableWorkflow}
            >
              {!workflow.is_freeze
                ? (<><VisibilityOff style={visibilityStyle} />&nbsp;<text className="color-primary" style={{ fontFamily, fontSize: 12 }}>DISABLE</text></>)
                : (<><Visibility style={visibilityStyle} />&nbsp;<text className="color-primary" style={{ fontFamily, fontSize: 12 }}>ENABLE</text></>)}
            </Button>
            <DeleteDialog
              open={open}
              setOpen={setOpen}
              selected={workflow}
              setSelected={() => null}
              deleteFunction={deleteWorkflow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const DeleteButton = styled(Button)(() => ({
  backgroundColor: '#FFF',
  color: 'var(--primary-color)',
  border: '1.3px solid var(--primary-color)',
  maxWidth: '36px',
  minWidth: '36px',
  maxHeight: '36px',
  minHeight: '36px',
}));

const AvatarStyle = {
  width: '3.5em',
  height: '3.5em',
  borderRadius: '10%',
  outline: '1px solid #C8CBD3',
  fontSize: '14px',
  color: 'white',
  objectFit: 'cover',
  paddingBottom: '1px',
  marginInline: '0.5rem',
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
};

const visibilityStyle = {
  fontSize: 10,
  color: 'var(--primary-color)',
};
