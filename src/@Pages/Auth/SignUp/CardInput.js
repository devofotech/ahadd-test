import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Grid, TextField, Paper } from '@material-ui/core/';
import InputMask from 'react-input-mask';

export const CardInput = ({
  cardNumber, setCardNumber, cardExpDate, setCardExpDate, cvc, setCvc, classes,
}) => {
  return (
    <Grid item xs={12} className="mt-2">
      <Paper elevation={0}>
        {[
          {
            label: 'Credit Card Number', value: cardNumber, onChange: e => setCardNumber(e.target.value), width: '57%', mask: '9999 9999 9999 9999',
          },
          {
            label: 'Exp Date', value: cardExpDate, onChange: e => setCardExpDate(e.target.value), width: '20%', mask: '99 / 9999',
          },
          {
            label: 'CVC', value: cvc, onChange: e => setCvc(e.target.value), width: '14%', mask: '999',
          },
        ].map((m, idx) => (
          <>
            {!idx ? (
              <InputMask
                mask={m.mask}
                value={m.value}
                disabled={false}
                maskChar=" "
                onChange={m.onChange}
              >
                {() => (
                  <CustomField
                    className={classes.input}
                    variant="outlined"
                    label={m.label}
                    InputLabelProps={{ className: classes.label }}
                    size="small"
                    style={{ width: m.width }}
                  />
                )}
              </InputMask>
            ) : (
              <InputMask
                mask={m.mask}
                value={m.value}
                disabled={false}
                maskChar=" "
                onChange={m.onChange}
              >
                {() => (
                  <DetailsField
                    className={classes.input}
                    variant="outlined"
                    label={m.label}
                    InputLabelProps={{ className: classes.label }}
                    size="small"
                    style={{ width: m.width }}
                  />
                )}
              </InputMask>
            )}
          </>
        ))}
      </Paper>
    </Grid>
  );
};

const CustomField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'default',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
});

const DetailsField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'transparent',
  },
  '& .MuiInputLabel-shrink': {
    color: 'transparent',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
});
