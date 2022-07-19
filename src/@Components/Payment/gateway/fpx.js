import React, { useMemo, useState } from 'react';
import {
  useStripe,
  useElements,
  FpxBankElement,
} from '@stripe/react-stripe-js';
import CircularProgress from '@material-ui/core/CircularProgress';
import useResponsiveFontSize from '../useResponsiveFontSize';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      accountHolderType: 'individual',
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
          padding: '10px 14px',
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

const FpxBankForm = ({ clientSecret, setProceedWithMethod, payTrigger }) => {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const stripe = useStripe();
  const appearance = {
    theme: 'stripe',
  
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      // See all possible variables below
    }
  };
  const elements = useElements({ appearance });
  
  
  elements.update({
    appearance,
  });

  const options = useOptions();

  //   const handleSubmit = async event => {
  //     event.preventDefault();

  //     if (!stripe || !elements) {
  //       // Stripe.js has not loaded yet. Make sure to disable
  //       // form submission until Stripe.js has loaded.
  //       return;
  //     }
  //     const payload = await stripe.createPaymentMethod({
  //       type: 'fpx',
  //       fpx: elements.getElement(FpxBankElement),
  //       billing_details: {
  //         name: event.target.name.value,
  //       },
  //     });
  //     console.log('[PaymentMethod]', payload);
  //   };

  const payNow = () => {
    setLoading(true);
    console.log('paywithbank', clientSecret);
    stripe.confirmFpxPayment(clientSecret, {
      payment_method: {
        fpx: elements.getElement(FpxBankElement),
        billing_details: { name },
      },
      // return_url: `${window.location.origin}/project/mapping?payment_processed=true`,
      return_url: `${window.location.origin}${window.location.pathname}?payment_processed=true`,
    })
      .then((result) => {
        setLoading(false);
        if (result.error) {
          // Show error to your customer
          console.log('vvv error', result.error);
          setErrorMessage(result.error);
        } else {
          // The payment succeeded!
          if (result.paymentIntent.status === 'succeeded') setErrorMessage(undefined);
          console.log('vvv success payment', result);
        }
      });
  };
  if (!!payTrigger) payNow();
  return (
    <>
      <label>
        Name
        <input name="name" onChange={(e) => setName(e.target.value)} type="text" placeholder="Jenny Rosen" required />
      </label>
      <label style={{ width: '-webkit-fill-available' }}>
        FPX Bank
        <FpxBankElement
          className="FpxBankElement"
          options={options}
          onReady={() => {
            console.log('FpxBankElement [ready]');
          }}
          onChange={event => {
            console.log('FpxBankElement [change]', event);
          }}
          onBlur={() => {
            console.log('FpxBankElement [blur]');
          }}
          onFocus={() => {
            console.log('FpxBankElement [focus]');
          }}
        />
      </label>
      <button type="button" onClick={() => setProceedWithMethod(false)} disabled={!stripe}>
        back to payment method
      </button>
      <button type="button" onClick={() => payNow()} disabled={!stripe}>
        Pay
      </button>
      {/* {loading && <CircularProgress />}
      {!loading && (
        <>

        </>
      )} */}
    </>
  );
};

export default FpxBankForm;
