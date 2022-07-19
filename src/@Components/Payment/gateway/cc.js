import React, { useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  InputBase, CircularProgress, List,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Card from '../ui/Card';
import EmptyCard from '../ui/EmptyCard';
import AddCardModal from '../ui/AddCardModal';
import useResponsiveFontSize from '../useResponsiveFontSize';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize],
  );

  return options;
};

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const CardForm = ({
  clientSecret, setProceedWithMethod, user, listmethods, payTrigger, ...h
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [selectedCard, setSelectedCard] = useState(listmethods.length ? listmethods[0].id : 0);
  const [openAddCard, setOpenAddCard] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  // if (!stripe || !elements) {
  //   // Stripe.js has not loaded yet. Make sure to disable
  //   // form submission until Stripe.js has loaded.
  //   return;
  // }

  const payNow = () => {
    setLoading(true);

    const payment_method = !!selectedCard ? selectedCard : { card: elements.getElement(CardElement) };
    console.log('paywithcard', clientSecret, payment_method);
    stripe.confirmCardPayment(clientSecret, { payment_method })
      .then((result) => {
        setLoading(false);
        if (result.error) {
          // Show error to your customer
          console.log('vvv payment error', result.error);
          setErrorMessage(result.error);
        //   showError(result.error.message);
        } else {
          // The payment succeeded!
          setErrorMessage(undefined);
          console.log('vvv payment success', result);
          // if want to use callback method
          // history.push(`${window.location.pathname}?payment_processed=true&payment_intent=${result.paymentIntent.id}`);
          // window.location.reload(true);
        }
      });
  };

  useEffect(() => {
    if (!!payTrigger) payNow();
  }, [payTrigger]);
  return (
    <>
      {errorMessage && <label style={{ width: '-webkit-fill-available', color: 'red' }}>{errorMessage.type}: {errorMessage.message}</label>}
      {loading && <CircularProgress />}
      {!h.isPaymentLoading && (
        <List style={{
          display: 'flex', flexDirection: 'row', overflowX: 'scroll', scrollbarWidth: 'none',
        }}
        >

          {!!listmethods.length && listmethods.map((lm, idx) => (
            <Card
              key={`idx-${lm.id}`}
              mode="payment"
              c={lm}
              isNotPrimary={!!idx}
              onClick={h.setCardToDefault}
              removeCard={h.removeCard}
              setSelectedCard={setSelectedCard}
              selectedCard={selectedCard}
              user={user}
            />
          ))}
          {/* <EmptyCard onClick={() => setSelectedCard(0)} /> */}
          <EmptyCard onClick={() => setOpenAddCard(true)} />
          <AddCardModal open={openAddCard} setOpen={setOpenAddCard} getCards={h.getCards} />
        </List>
      )}

      {/* <label style={{ width: '-webkit-fill-available' }}> */}
      {/* {listmethods.length && (
          <Select
            value={selectedCard}
            onChange={e => setSelectedCard(e.target.value)}
            input={<BootstrapInput />}
            fullWidth
          >
            {listmethods.map(lm => <MenuItem value={lm.id}>**** **** **** {lm.last4} | {lm.brand}</MenuItem>)}
            <MenuItem value={0}>add card ..</MenuItem>
          </Select>

        )} */}
      {/* {!selectedCard && (
          <Paper style={{ padding: '10px', marginTop: '10px' }}>
            <CardElement
              appearance={{ theme: 'stripe' }}
              options={options}
              onReady={() => {
                console.log('CardElement [ready]');
              }}
              onChange={event => {
                console.log('CardElement [change]', event);
              }}
              onBlur={() => {
                console.log('CardElement [blur]');
              }}
              onFocus={() => {
                console.log('CardElement [focus]');
              }}
            />
          </Paper>
        )} */}

      {/* </label> */}
      {/* gateway base pay trigger */}
      {/* <Button
        variant="contained"
        onClick={() => setProceedWithMethod(false)}
        disabled={!stripe}
      >Back to payment method
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => payNow()}
        disabled={!stripe}
      >Pay
      </Button> */}
    </>
  );
};
export default CardForm;
