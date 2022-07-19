import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
// import queryString from 'query-string';

// const img_uri = 'https://i.ibb.co/BzCjvsX/Screenshot-2021-12-24-112440.png';
// const dummy = [
//   {
//     id: 1, name: 'Bunch', value: 1000, image: img_uri, price: 40,
//   },
//   {
//     id: 2, name: 'Stack', value: 2150, image: img_uri, price: 80,
//   },
//   {
//     id: 3, name: 'Pile', value: 4350, image: img_uri, price: 160,
//   },
//   {
//     id: 4, name: 'Vault', value: 11500, image: img_uri, price: 400,
//   },
// ];
export default () => {
  const [isSuccess, setIsSuccess] = useState(false);
  // const { payment_intent, payment_processed } = queryString.parse(window.location.search);
  const [payment_id_override, setpayment_id_override] = useState(null);
  const [intents, setIntents] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [products, setProducts] = useState([]);
  const [securepayReady, setSecurepayReady] = useState(false);
  const [paymentGatewayReady, setPaymentGatewayReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const paymentCallback = (paymentModel) => {
    console.log('MMM', { PaymentId: paymentModel.id });
    setPaymentGatewayReady(true);
  };
  const validatePayment = (pid, interval) => {
    Api({
      endpoint: endpoints.getPayment(pid),
      data: { type: 'rcoin' },
      onSuccess: ({ payment_process }) => {
        console.log('vvv validate payment', payment_process);
        if (['succeeded', 'failed'].includes(payment_process.status)) {
          clearInterval(interval);
          setIsPaymentLoading(false);
          setIntents({ status: payment_process.status });
          if (payment_process.status === 'succeeded') {
            setIsSuccess(true);
            return setActiveStep(1);
          }
        }
      },
      onFail: () => console.log('lol'),
    });
  };
  useEffect(() => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setProducts(data.products_wallet ?? []);
        setIsLoading(false);
      },
      onFail: (response) => console.log('lol'),
    });
  }, []);
  useEffect(() => {
    if (!payment_id_override) return;
    console.log('vvv set interval registered once', payment_id_override);
    const interval = setInterval(() => {
      validatePayment(payment_id_override, interval);
    }, 3000);
    return () => clearInterval(interval);
  }, [payment_id_override]);

  return {
    isSuccess,
    activeStep,
    setActiveStep,
    selectedProduct,
    setSelectedProduct,
    selectedProductDetails: selectedProduct ? products.find(x => x.id === selectedProduct) : null,
    intents,
    paymentCallback,
    paymentGatewayReady,
    products,
    securepayReady,
    setSecurepayReady,
    isLoading,
    isPaymentLoading,
    setIsPaymentLoading,
    payment_id_override,
    setpayment_id_override,
  };
};
