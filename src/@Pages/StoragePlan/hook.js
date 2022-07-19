import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import Swal from 'sweetalert2';

export default function hook(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [products, setProducts] = useState([]); // dummy
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(1);
  const [currentMode, setCurrentMode] = useState('mnth');
  const [mode, setMode] = useState('monthly');
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  const getCurrentPlan = (OrgId) => {
    if (!OrgId) return;
    setIsLoadingPlan(true);
    Api({
      endpoint: endpoints.getOrganization(OrgId),
      onSuccess: ({ data }) => {
        setCurrentPlan(data.StoreStorageId);
        setCurrentMode(data.subscription?.items?.data?.map(m => m.price)[0]);
        setIsLoadingPlan(false);
      },
      onFail: (response) => console.log('lol'),
    });
  };
  const getStaticData = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setProducts(data.products_storage ?? []);
        setIsLoading(false);
      },
    });
  };
  useEffect(() => {
    if (!props.user) return;
    getStaticData();
    getCurrentPlan(props.user.OrganizationId);
  }, [props.user]);

  const changePlan = (StoreStorageId) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.changePlan(),
      data: { StoreStorageId, mode },
      onSuccess: (response) => {
        Swal.fire(
          'Successfully change the plan!',
          'Thank you, the payment is received.',
          'success',
        );
        setIsLoading(false);
        setSelectedProduct(0);
        getCurrentPlan();
        props.getUser();
      },
      onFail: (response) => {
        toast('error', response);
        setIsLoading(false);
        setSelectedProduct(0);
      },
    });
  };
  useEffect(() => {
    if (!selectedProduct) {
      setActiveStep(0);
      return;
    }
    changePlan(selectedProduct);
  }, [selectedProduct]);

  return {
    isLoading,
    activeStep,
    setActiveStep,
    selectedProduct,
    setSelectedProduct,
    selectedProductDetails: selectedProduct ? products.find(x => x.id === selectedProduct) : null,
    products: products.map(p => ({ ...p, is_current_plan: currentPlan === p.id })),
    setMode,
    mode,
    currentMode: currentMode?.recurring?.interval,
    isLoadingPlan,
  };
}
