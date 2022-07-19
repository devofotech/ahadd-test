/* eslint-disable complexity */
import Button from '@Components/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Payment from '@Components/Payment';
import { primaryColor } from '@Assets/css/index';
import { KeyboardArrowLeft } from '@material-ui/icons';
import RaiseToken from '@Assets/Icons/icon_raise_coin.png';
import { CircularProgress } from '@material-ui/core';
import _ from 'lodash';

const Loader = () => (
  <CircularProgress
    size={75}
    className="position-absolute"
    style={{
      top: '50%', left: '50%', marginTop: -80, marginLeft: -40, color: 'var(--primary-color)',
    }}
  />
);
export default (h) => {
  // const isUploading = h.uploadPercentages.some(e => e < 100);
  // const unit_price = 100;
  const unit_price = 0.002; // $
  const total_mp = _.sum(h.mega_pixel);
  // const total_price = Math.round((unit_price * h.files.length) * 1) / 1;
  const total_price = Math.round((unit_price * total_mp) * 100) / 100; // $

  const noNeedPay = h.isOrgUnlimited;
  const paymentmethod = ['rc'];
  const passMinCreditcard = !!(total_price >= 2);
  const passMinMP = !!(total_mp >= 100);
  if (passMinCreditcard) paymentmethod.push('cc');
  return (
    <div className="w-100 mx-auto" style={{ minHeight: '60vh' }}>
      <h3 className="text-dark my-4">Order Summary</h3>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <p className="color-tertiary">Item<ArrowDropDownIcon /></p>
          <p className="text-dark">{total_mp.toLocaleString()} mega pixel</p>
        </div>
        {!h.isOrgUnlimited && (
          <div className="text-right">
            <p className="color-tertiary">Unit Price<ArrowDropDownIcon /></p>
            <p className="text-dark">$ {(unit_price).toLocaleString()}</p>
            <p className="text-dark"><img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> {(unit_price * 20).toLocaleString()}</p>
            <p className="color-tertiary mt-4">Total Amount</p>
            <p className="text-dark">$ {(total_price).toLocaleString()}</p>
            <p className="text-dark"><img src={RaiseToken} style={{ width: 18, marginBottom: 3 }} /> {(total_price * 20).toLocaleString()}</p>
          </div>
        )}
      </div>
      {!!h.isPaymentLoading && (<Loader />)}
      {!!h.isLoading && (<Loader />)}
      {!!(!h.isPaymentLoading && h.intents && ['succeeded'].includes(h.intents?.status)) && (
        <>
          Thank you for your purchase, uploading in progress. Please wait...
        </>
      )}
      {!!(!h.intents && !noNeedPay && !!passMinMP) && (
        <>
          {!h.isPaymentLoading && (
            <>
              <p className="color-tertiary">Select a payment method</p>
              {!passMinCreditcard && (<p className="color-tertiary">minimum of $2 to enable credit card method</p>)}
              {!passMinMP && (<p className="color-tertiary">minimum of 100 mega pixel to proceed</p>)}
            </>
          )}
          <Payment
            {...h}
            // imagerytype={h.outputType}
            // eslint-disable-next-line max-len
            items={`${h.files.length.toLocaleString()} cloud processing images [${h.tabslist.find(r => r.value === h.image_type_tab).label}]`}
            // isReady // ={h.uploadedfiles === h.files.length}
            isReady={h.paymentGatewayReady}
            total_count={total_price || 2} // price in $
            conversion_rate={20}
            project={{ id: h.assetId }}
            methods={paymentmethod}
            payTrigger={h.securepayReady}
          />
        </>
      )}
      {!h.isPaymentLoading && !h.intents && (
        <div style={{ display: 'flex', marginBottom: 100 }}>
          <div style={{ flex: 3 }}>
            <Button variant="text" onClick={h.handleBackStep} disabled={!!h.isPaymentLoading}>
              <KeyboardArrowLeft
                style={{
                  fontSize: 30,
                  padding: '6px 1px',
                }}
              /> MODIFY ORDER
            </Button>
          </div>
          <div style={{ flex: 1 }}>
            <p className="text-dark">
              By continuing {!!noNeedPay ? 'upload' : 'checkout'}, you agree to our terms & conditions and privacy policy.
            </p>
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'end',
          }}
          >
            <Button
              disabled={!!h.isPaymentLoading || !passMinMP}
              variant="contained"
              onClick={() => {
                h.setIsPaymentLoading(true);
                if (!!noNeedPay) h.UploadFilesNow();
                else h.setSecurepayReady(true);
              }}
            >
              {!!noNeedPay ? 'UPLOAD' : 'SECURE CHECKOUT'}
            </Button>
          </div>
        </div>
      )}

      {/* <div className="d-flex justify-content-end mt-5"> */}
      {/* <Button variant="text" onClick={h.handleBackStep}>
          PREVIOUS
        </Button> */}
      {/* no need next from here, either payment fail or pass up to gateway to decide the outcome */}
      {/* <Button onClick={h.handleNextStep}>
          NEXT
        </Button> */}
      {/* </div> */}
    </div>
  );
};
