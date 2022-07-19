import Button from '@Components/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import Payment from '@Components/Payment';

export default (h) => {
  // const isUploading = h.uploadPercentages.some(e => e < 100);
  // const selectedOutput = h.radios_options.find(x => x.value === h.outputType);
  // const unit_price = selectedOutput?.payment_needed ? 100 : 0;
  // const total_price = unit_price * h.files.length;
  return (
    <div className="w-50 mx-auto">
      <h3 className="text-dark my-4">Summary</h3>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <p className="color-tertiary">Item<ArrowDropDownIcon /></p>
          <p className="text-dark">{h.files.length.toLocaleString()} Reports</p>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-5">
        <Button variant="text" onClick={h.handleBackStep}>
          PREVIOUS
        </Button>
        {/* no need next from here, either payment fail or pass up to gateway to decide the outcome */}
        <Button onClick={h.paymentCallback} disabled={!h.files.length}>
          UPLOAD
        </Button>
      </div>
    </div>
  );
};
