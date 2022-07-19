import React from 'react';
import { Avatar, Typography, Paper } from '@material-ui/core';
import Button from '@Components/Button';
import { Link } from 'react-router-dom';

export default function ProfileCard(props) {
  return (
    <Paper
      className="bg-white rounded-xl px-4"
      style={{ height: 650 }}
    >
      <div className="w-100 flex-standard">
        <Avatar src={`${process.env.REACT_APP_S3}/${props.user?.image}`} style={{ height: 120, width: 120, marginTop: 20 }} />
      </div>
      <div>
        {[
          { variant: 'h4', className: 'text-center mb-3', value: props.user?.name },
          { variant: 'subtitle1', className: 'text-center mb-3', value: props.user?.['Organization.name'] },
          { variant: 'subtitle1', className: 'text-center mb-5', value: props.user?.['Role.name'] },
        ].map(d => (
          <Typography {...d} style={{ color: '#1F3566' }}>{d.value}</Typography>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Link to={`/user/${props.user?.id}`}>
          <Button size="small" style={{ marginTop: '90px' }}>Edit Profile Information</Button>
        </Link>
      </div>
    </Paper>
  );
}
