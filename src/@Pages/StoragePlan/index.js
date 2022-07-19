import React from 'react';
import { Grid } from '@material-ui/core';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import StorageCards from './components/StorageCards';
import TabAnnually from './components/TabAnnually';
// import PaymentAfter from './PaymentAfter';
import useHook from './hook';

const ItemList = (h) => (
  <div className="d-flex justify-content-center flex-column align mx-auto" style={{ width: '80%' }}>
    <h1 className="mt-2 mb-4" style={{ fontWeight: 600, fontSize: 28 }}>
      Storage Plan
    </h1>
    {(h.isLoading || h.isLoadingPlan) ? <CenteredLoadingContainer height="50vh" size={75} hasText text="page" /> : (
      <div className="mb-4 d-flex justify-content-center">
        <TabAnnually mode={h.mode} setMode={h.setMode} />
      </div>
    )}
    {!h.selectedProduct && (
      <Grid container spacing={3} nowrap>
        {h.products.filter(f => !f.is_hidden).map(p => (
          <StorageCards
            onClick={() => h.setSelectedProduct(p.id)}
            {...p}
            {...h}
          />
        ))}
      </Grid>
    )}
  </div>
);

export default function index(props) {
  const h = useHook(props);
  return (
    <div>
      {{
        0: <ItemList {...h} />,
        // 1: <PaymentAfter {...h} />,
      }[h.activeStep]}
    </div>
  );
}
