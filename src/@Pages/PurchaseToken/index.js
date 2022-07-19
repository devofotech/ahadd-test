/* eslint-disable complexity */
import React from 'react';
import {
  Grid, Paper, Button,
} from '@material-ui/core';
import TokenIcon from '@Assets/Icons/icon_raise_coin.png';
import Payment from '@Components/Payment';
import { KeyboardArrowLeft, Lock } from '@material-ui/icons';
import { primaryColor } from '@Assets/css/index';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import PaymentAfter from './PaymentAfter';
import TokenCard from './components/TokenCard';
import useHook from './hook';

const Loader = () => <CenteredLoadingContainer height="50vh" size={75} hasText text="page" />;

const ItemList = (h) => (
  <div style={{ height: '680px' }}>
    <h1
      className="d-flex mt-2 mb-4 mx-auto"
      style={{
        fontWeight: 600, fontSize: 28, width: !h.selectedProduct ? '80%' : '100%', transition: 'all .25s',
      }}
    >
      Purchase Token
    </h1>
    {!h.selectedProduct && (
      <div className="d-flex justify-content-center flex-column align mx-auto" style={{ width: '80%' }}>
        {!!h.isLoading && (<Loader />)}
        <Grid container spacing={4} className="h-100">
          {h.products.map(x => (
            <TokenCard {...x} onClick={() => h.setSelectedProduct(x.id)} />
          ))}
        </Grid>
      </div>
    )}
    {!!h.selectedProduct && (
      <>
        <div style={{ display: 'flex' }}>
          <Paper className="mr-4 mb-4 p-4" style={{ flex: 4 }}>
            <div className="d-flex justify-content-between mb-4">
              <div>
                <p className="text-dark">Item</p>
                <p className="text-dark mt-3" style={{ fontSize: '22px' }}>
                  <img
                    src={TokenIcon}
                    alt="Raise token with plus icon"
                    height={40}
                    width={40}
                    className="ml-1"
                  />&nbsp; x {h.selectedProductDetails.value} geoRÄISE Token Reload
                </p>
                <p className="text-dark mt-3">Price subject to Service Tax</p>
              </div>
              <div className="text-right">
                <p className="text-dark">Price with ST (6%)</p>
                <p className="text-dark mt-3" style={{ fontSize: '22px' }}>$ {(h.selectedProductDetails?.price || 2).toFixed(2)}</p>
              </div>
            </div>
          </Paper>
          <Paper className="mb-4 p-4" style={{ flex: 1 }}>
            <div className="text-right">
              <p className="text-dark" style={{ fontSize: '30px' }}>Total Amount</p>
              <p className="text-dark" style={{ fontSize: '50px' }}>$ {(h.selectedProductDetails?.price || 2).toFixed(2)}</p>
            </div>
          </Paper>
        </div>
        {!!h.isPaymentLoading && (<Loader />)}
        {!!h.isLoading && (<Loader />)}
        {!!(!h.isPaymentLoading && h.intents && ['succeeded'].includes(h.intents?.status)) && (
          <>
            Thank you for your purchase, uploading in progress. Please wait...
          </>
        )}
        {!h.intents && (
          <Payment
            {...h}
            isReady={h.paymentGatewayReady}
            payment_type="reload"
            total_count={h.selectedProductDetails?.price || 2}
            methods={['cc']}
            payTrigger={h.securepayReady}
          />
        )}
        <br />
        {!h.isPaymentLoading && !h.intents && (
          <div style={{ display: 'flex', marginBottom: 100 }}>
            <div style={{ flex: 3 }}>
              <Button variant="text" onClick={() => h.setSelectedProduct(0)}>
                <KeyboardArrowLeft
                  style={{
                    fontSize: 30,
                    padding: '6px 1px',
                  }}
                /> MODIFY ORDER
              </Button>
            </div>
            <div style={{ flex: 1 }}>
              <p className="text-dark">By continuing checkout, you agree to our terms & conditions and privacy policy.</p>
            </div>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'end',
            }}
            >
              <Button
                disabled={!!h.isPaymentLoading}
                variant="contained"
                style={{ background: primaryColor, color: 'white' }}
                onClick={() => h.setSecurepayReady(true)}
              >
                <Lock style={{ width: '15px', marginRight: 10 }} /> SECURE CHECKOUT
              </Button>
            </div>
          </div>
        )}
      </>
    )}
  </div>
);

export default (props) => {
  const h = useHook();
  return (
    <div className="w-100 mx-2">
      {{
        0: <ItemList {...h} user={props.user} />,
        1: <PaymentAfter {...h} />,
      }[h.activeStep]}
    </div>
  );
};
