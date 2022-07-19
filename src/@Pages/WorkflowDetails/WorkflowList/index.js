import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Grid } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { primaryColor } from '@Assets/css/index';
import Card from '@Components/CustomCard3';
import AvatarIcon from '@Components/AvatarIcon';

const fontFamily = 'CeraProRegular';

export default (h) => {
  return (
    <Grid xs={3} item>
      <div className="d-flex align-items-center" style={{ marginBottom: '1vh' }}>
        <Link to="/analysis-management">
          <KeyboardArrowLeft
            style={{
              color: '#FFFFFF',
              fontSize: 30,
              background: primaryColor,
              padding: '6px 1px',
              borderRadius: 10,
            }}
          />
        </Link>
        <h2 style={{ marginLeft: 10 }} className="color-primary">Workflow Details</h2>
      </div>
      <div
        className="hide-scroll pb-5"
        style={{
          height: '80vh', overflowY: 'auto', paddingInline: 10, paddingBottom: '100vh',
        }}
      >
        <Card extraGrid selected isToTheSide={12} children={<CardContent data={h.workflows?.find(wf => wf.id === Number(h.workflow_id))} />} />
        {h.workflows
          .filter(wf => wf.id !== Number(h.workflow_id))
          .map((m, i) => (
            <Card
              extraGrid
              isToTheSide={12}
              children={<CardContent data={m} />}
            />
          ))}
      </div>
    </Grid>
  );
};

const CardContent = ({ data }) => {
  return (
    <Link to={`/workflow/${data?.id}`}>
      <div className="px-2 pt-3 position-relative" style={{ height: '90%', cursor: 'pointer', paddingBottom: '15vh' }}>
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
                value: data?.name ?? 'No name', inputProps: { style: { textAlign: 'center', fontSize: 16, cursor: 'pointer', fontFamily } },
              },
              {
                value: data?.description ?? 'description', inputProps: { style: { textAlign: 'center', fontSize: 12, cursor: 'pointer', fontFamily } },
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
            left: '50%', top: '19rem', transform: 'translate(-50%, -20%)', width: '90%', fontSize: 12,
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
