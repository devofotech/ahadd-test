/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Api, { endpoints } from '@Helpers/api';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { FpxIcon, RaiseCoinIcon } from '@Assets/Icons/PaymentIcons';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CardForm from './gateway/cc';
import FpxBankForm from './gateway/fpx';
import RcoinForm from './gateway/rc';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PKEY);
const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    flexDirection: 'row',
    paddingTop: '10px',
    paddingLeft: '16px',
    // flexWrap: 'wrap',
    // justifyContent: 'space-evenly',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(1),
      height: theme.spacing(4),
    },
  },
}));
const selectedStyle = (selected) => ({ border: selected ? 'solid 1px green' : 'none' });
const isMethodEnabledStyle = (enable) => ({ backgroundColor: enable ? 'white' : 'grey' });
const isDisabledStyle = (disabled) => ({ opacity: disabled ? 0.7 : 1 });
export default function Payment(props) {
  const rndoff_actual = Math.round(props.total_count * 100 * 1) / 1;
  const rndoff_token_charge = Math.round(props.total_count * 20 * 1) / 1;
  const classes = useStyles();
  const [pMethod, setPMethod] = useState(undefined);
  const [proceedWithMethod, setProceedWithMethod] = useState(false);
  const [listmethods, setListmethods] = useState([]);
  const [indentId, setIndentId] = useState(undefined);
  const [creditBalance, setCreditBalance] = useState(0);
  const getCreditBalance = () => {
    Api({
      endpoint: endpoints.getWallet(),
      onSuccess: ({ data }) => {
        setCreditBalance(data[0].balance);
      },
      onFail: (response) => console.log('lol'),
    });
  };
  const removeCard = (card_id, ms) => {
    const data = { card_id };
    Api({
      endpoint: endpoints.removeCard(),
      data,
      onSuccess: () => {
        toast('success', 'Remove Card Successfully');
        getCards();
        ms.fire('Saved!', '', 'success');
      },
      onFail: () => {
        toast('error', 'Failed to remove card');
      },
    });
  };
  const setCardToDefault = (default_payment_method, ms) => {
    const data = { default_payment_method };
    Api({
      endpoint: endpoints.changedefaultpaymentmethod(),
      data,
      onSuccess: () => {
        toast('success', 'Change Default Card Successfully');
        getCards();
        ms.fire('Saved!', '', 'success');
      },
      onFail: () => {
        toast('error', 'Failed to change default card');
      },
    });
  };
  const getCards = () => {
    Api({
      endpoint: endpoints.getCard(),
      onSuccess: ({ data }) => {
        setListmethods(data.data);
      },
      onFail: (response) => console.log('lol'),
    });
  };
  const generatePaymentIntent = () => {
    const data = {
      type: props.payment_type || 'random',
      // quantity: props.total_count,
      amount: (['rcoin'].includes(pMethod)) ? rndoff_token_charge : rndoff_actual,
      currency: (['rcoin'].includes(pMethod)) ? 'rcoin' : 'usd',
    };
    if (props.selectedProduct) data.productId = props.selectedProduct;
    if (props.items) data.products = props.items;
    if (pMethod) data.payment_method_types = [pMethod];
    Api({
      endpoint: endpoints.newPayment(),
      data,
      onSuccess: ({ clientSecret, paymentModel }) => {
        props.paymentCallback(paymentModel);
        props.setpayment_id_override(paymentModel.id);
        if (['fpx', 'card'].includes(pMethod)) setIndentId(clientSecret);
        if (['rcoin'].includes(pMethod)) setIndentId(paymentModel.id);
      },
      onFail: (response) => console.log('lol'),
    });
  };

  useEffect(() => {
    if (pMethod) {
      if (['rcoin'].includes(pMethod)) getCreditBalance(props.user);
      if (['card', 'rcoin'].includes(pMethod)) getCards(pMethod);
      if (props.setuploadedfiles) props.setuploadedfiles(0);
      generatePaymentIntent();
    }
  }, [pMethod]);
  useEffect(() => {
    // initiate default
    switch (props.methods[0]) {
      case 'cc':
        setPMethod('card');
        break;
      case 'fpx':
        setPMethod('fpx');
        break;
      case 'rc':
        setPMethod('rcoin');
        break;

      default:
        setPMethod('card');
        break;
    }
  }, []);
  if (!!(pMethod && props.isReady) && !proceedWithMethod) {
    setProceedWithMethod(true);
  }
  return (
    <Paper>

      <>
        {!props.isPaymentLoading && (
          <div className={classes.root}>
            <Button
              variant="contained"
              disabled={!props.methods?.includes('cc')}
              style={{
                flex: 1, ...isMethodEnabledStyle(props.methods?.includes('cc')), ...selectedStyle(pMethod === 'card'), ...isDisabledStyle(!props.methods?.includes('cc')), textTransform: 'none', width: '120px', height: '50px',
              }}
              elevation={pMethod === 'card' ? 3 : 0}
              onClick={() => setPMethod('card')}
              children={<div style={{ marginLeft: -90 }}><CreditCardIcon style={{ width: 18, marginTop: -8 }} /> <p style={{ fontSize: 10, marginTop: -5, marginLeft: 5 }}>Card</p></div>}
            />
            <Button
              variant="contained"
              disabled={!props.methods?.includes('fpx')}
              style={{
                flex: 1, ...isMethodEnabledStyle(props.methods?.includes('fpx')), ...selectedStyle(pMethod === 'fpx'), ...isDisabledStyle(!props.methods?.includes('cc')), textTransform: 'none', width: '120px', height: '50px',
              }}
              elevation={pMethod === 'fpx' ? 3 : 0}
              onClick={() => setPMethod('fpx')}
              children={<div style={{ marginLeft: -80 }}><FpxIcon style={{ width: 40, marginTop: -10 }} /> <p style={{ fontSize: 10, marginTop: -10, marginLeft: 50 }}>Online Banking</p></div>}
            />
            <Button
              variant="contained"
              disabled={!props.methods?.includes('rc')}
              style={{
                flex: 1, ...isMethodEnabledStyle(props.methods?.includes('rc')), ...selectedStyle(pMethod === 'rcoin'), ...isDisabledStyle(!props.methods?.includes('cc')), textTransform: 'none', width: '120px', height: '50px',
              }}
              elevation={pMethod === 'rcoin' ? 3 : 0}
              onClick={() => setPMethod('rcoin')}
              children={<div style={{ marginLeft: -70 }}><RaiseCoinIcon style={{ width: 65, height: 65, marginBottom: -40 }} /> <p style={{ fontSize: 10, marginTop: -5, marginLeft: 45 }}>geoRÄISE Token</p></div>}
            />
          </div>
        )}
        {!props.isReady && pMethod && (
          <Button
            disabled
            variant="contained"
            color="primary"
            className="m-4"
          >Preparing Invoice...
          </Button>
        )}
        {/* if want to have trigger manual intent */}
        {/* {!!(pMethod && props.isReady) && !proceedWithMethod && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // future alternative
              // window.open('', '_blank');
              setProceedWithMethod(true);
            }}
          >Proceed Payment
          </Button>
        )} */}
      </>
      {!!proceedWithMethod && (
        <>
          {pMethod && (
            <Elements stripe={stripePromise} style={{ display: 'flex', flexDirection: 'column' }}>
              {pMethod === 'fpx' && (
                <FpxBankForm
                  clientSecret={indentId}
                  setProceedWithMethod={setProceedWithMethod}
                  user={props.user}
                  listmethods={listmethods}
                  payTrigger={props.payTrigger ?? false}
                  isPaymentLoading={!!props.isPaymentLoading}
                />
              )}
              {pMethod === 'card' && (
                <CardForm
                  clientSecret={indentId}
                  setProceedWithMethod={setProceedWithMethod}
                  user={props.user}
                  listmethods={listmethods}
                  setCardToDefault={setCardToDefault}
                  getCards={getCards}
                  removeCard={removeCard}
                  payTrigger={props.payTrigger ?? false}
                  isPaymentLoading={!!props.isPaymentLoading}
                />
              )}
              {pMethod === 'rcoin' && (
                <RcoinForm
                  clientSecret={indentId}
                  setProceedWithMethod={setProceedWithMethod}
                  user={props.user}
                  listmethods={listmethods}
                  creditBalance={creditBalance}
                  charge={rndoff_token_charge}
                  payTrigger={props.payTrigger ?? false}
                  isPaymentLoading={!!props.isPaymentLoading}
                />
              )}
            </Elements>
          )}
        </>
      )}

    </Paper>

  );
}
