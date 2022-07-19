import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Button } from '@material-ui/core';
import Api, { endpoints } from '@Helpers/api';
import RaiseToken from '@Assets/Icons/icon_raise_coin.png'
import { numberWithCommas } from '@Helpers';

const RCoinForm = ({
  setProceedWithMethod, user, listmethods, creditBalance, charge, payTrigger, clientSecret,
}) => {
  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const payNow = () => {
    // setLoading(true);
    Api({
      endpoint: endpoints.newPaymentCredit(),
      data: { amount: charge, creditBalance, payment_id: clientSecret },
      onSuccess: ({ data }) => {
        console.log('done pay now', data.payment_id)
        setErrorMessage(undefined);
      },
      onFail: (response) => console.log('lol'),
    });
  };
  useEffect(() => {
    if (!!payTrigger) payNow();
  }, [payTrigger]);
  return (
    <>
      {errorMessage && <label style={{ width: '-webkit-fill-available', color: 'red' }}>{errorMessage.type}: {errorMessage.message}</label>}
      {/* {loading && <CircularProgress />} */}
      {!!(creditBalance < charge) ? (
        <div className="d-flex justify-content-between mb-4 p-4">
          <div>
            <p className="text-dark">Current Balance</p>
            <p className="text-dark">Total Charge (Round Off)</p>
            <p className="text-dark">Insuficient Balance Reload (Min. <img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> 40)</p>
            <hr />
          </div>
          <div className="text-right">
            <p className="text-dark"><img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> {numberWithCommas(creditBalance)}</p>
            <p className="text-dark">- <img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> {numberWithCommas(charge)}</p>
            <p className="text-dark">+ <img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> {numberWithCommas(charge - creditBalance)}</p>
            <hr />
            <p className="text-dark"><img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> 0</p>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between mb-4 p-4">
          <div>
            <p className="text-dark">Current Balance</p>
            <p className="text-dark">Total Charge (Round Off)</p>
            <hr />
          </div>
          <div className="text-right">
            <p className="text-dark"><img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> {numberWithCommas(creditBalance)}</p>
            <p className="text-dark">- <img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> {numberWithCommas(charge)}</p>
            <hr />
            <p className="text-dark"><img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> {numberWithCommas(creditBalance - charge)}</p>
          </div>
        </div>
      )
      }
      {/* <Button
        variant="contained"
        onClick={() => setProceedWithMethod(false)}
        disabled={!listmethods.length}
      >Back to payment method
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => payNow()} 
        disabled={!listmethods.length}
      >{!!(creditBalance < charge) && ('Topup Credit &')} Pay
      </Button> */}
    </>
  );
};
export default RCoinForm;
