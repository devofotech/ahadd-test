import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    borderRadius: '0 0 5px 5px !important',
    width: '100%',
  },
});

export default function SelectButton(props) {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.button}
        style={{
          backgroundColor: 'var(--primary-color)',
          color: '#FFF',
          fontWeight: 'bold',
          height: '50px',
          fontFamily: 'CeraProRegular',
        }}
        onClick={props.onClick}
      >
        I WANT THIS
      </Button>
    </>
  );
}
