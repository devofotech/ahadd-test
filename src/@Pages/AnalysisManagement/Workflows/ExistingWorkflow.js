import React from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AvatarIcon from '@Components/AvatarIcon';

const fontFamily = 'CeraProRegular';

export default ({ data }) => {
  return (
    <Link to={`/workflow/${data?.id}`}>
      <div className="px-2 pt-3 position-relative" style={{ height: '90%', cursor: 'pointer' }}>
        <div className="flex-standard mx-auto mt-3">
          <AvatarIcon
            user={data}
            size="1.5rem"
            fontSize="18px"
            colorType="inherit"
            backgroundColor={data?.colour ? data.colour : '#506288'}
            style={AvatarStyle}
          />
        </div>
        <div className="d-flex flex-column mx-auto mt-2">
          {
            [
              {
                placeholder: 'Team Name', value: data?.name ?? 'No name', inputProps: { style: { textAlign: 'center', fontSize: 16, cursor: 'pointer', fontFamily } },
              },
              {
                placeholder: 'Team Description', value: data?.description ?? 'description', inputProps: { style: { textAlign: 'center', fontSize: 12, cursor: 'pointer', fontFamily } },
              },
            ].map(m => (
              <TextField
                {...m}
                InputProps={{ ...m.inputProps, disableUnderline: true, readOnly: true }}
                size="small"
                className="pt-2"
              />
            ))
          }
        </div>
        <p
          className="position-absolute text-center"
          style={{
            left: '50%', bottom: 0, transform: 'translate(-50%, -20%)', width: '90%', fontSize: 12,
          }}
        >
          <text className="color-active">{data?.inspection_count ?? 'No'}</text>
          &nbsp;inspection assigned.
        </p>
      </div>
    </Link>
  );
};

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
