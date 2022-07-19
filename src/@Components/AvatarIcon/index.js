/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { initialsFromUser, isValidHttpUrl } from '@Helpers';
import { Tooltip } from '@material-ui/core';

export default ({
  user, size, fontSize, colorType = 'fixed', backgroundColor, style = {}, onClick = () => null,
}) => {
  const height = size || '5em';
  const width = height;

  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const bgColor = {
    fixed: '#506288',
    random: `#${randomColor}`,
    inherit: backgroundColor,
  }[colorType];

  const avstyle = {
    backgroundColor: bgColor ?? `#${randomColor}`,
    borderRadius: '50%',
    color: 'white',
    objectFit: 'cover',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  };

  return (
    <Tooltip title={user?.name}>
      {user?.image ? (
        <img
          src={user?.image ? isValidHttpUrl(user?.image) ? user.image : `${process.env.REACT_APP_S3}/${user.image}` : `https://d37bxaq5q1mz6s.cloudfront.net/User/${user.EMPLOYEE_NUMBER}.jpg`}
          style={{
            width, height, fontSize, ...avstyle, ...style,
          }}
        />
      ) : (
        <div
          className="flex-standard"
          style={{
            width, height, fontSize, ...avstyle, ...style,
          }}
          onClick={onClick}
        >{initialsFromUser({ name: user?.name })}
        </div>
      )}
    </Tooltip>
  );
};
