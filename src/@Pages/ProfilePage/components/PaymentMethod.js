import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import AddCardModal from '@Components/Payment/ui/AddCardModal';
import CreditCard from './CreditCard';

export default function PaymentMethod(h) {
  return (
    <Grid item md={12} style={{ marginTop: 20 }}>
      <Paper style={{ padding: 35 }}>
        <h3>Payment Method</h3>
        <p>To remove default card, change your storage plan to FREE</p>
        <CreditCard {...h} />
      </Paper>
      <AddCardModal {...h} getCards={h.getCardList} />
    </Grid>
  );
}
