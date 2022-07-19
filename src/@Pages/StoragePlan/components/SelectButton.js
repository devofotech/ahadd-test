import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { numberWithCommas } from '@Helpers';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useStyles = makeStyles({
  button: {
    borderRadius: '0 0 5px 5px !important',
    width: '100%',
  },
});

export default function SelectButton({ onClick = () => null, ...props }) {
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
        onClick={() => {
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: `Do you want to select ${props.name} plan for 
              ${!!props.price
              ? `$${numberWithCommas(props[`price_${props.mode}`].unit_amount / 100)} per ${props.mode === 'monthly' ? 'month' : 'year'}`
              : 'Free'
              }`,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary-color)',
            cancelButtonText: 'Do Nothing',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) onClick();
          });
        }}
      >
        I WANT THIS
      </Button>
    </>
  );
}
