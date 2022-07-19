import {
  Dialog, TextField, DialogContent, DialogTitle, DialogActions, MenuItem,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Close, Add } from '@material-ui/icons';
import Button from '@Components/Button';
import moment from 'moment';
import Api, { endpoints } from '@Helpers/api';

export default function AddCardModal(h) {
  const [cardName, setCardName] = useState();
  const [cardNumber, setCardNumber] = useState('');
  const [cardDateMonth, setCardDateMonth] = useState(12);
  const [cardDateYear, setCardDateYear] = useState(moment().year());
  const [cvv, setCvv] = useState();
  const addCard = () => {
    const data = {
      source: {
        object: 'card',
        number: cardNumber,
        name: cardName,
        exp_month: cardDateMonth,
        exp_year: cardDateYear,
      },
    };
    if (Object.keys(data.source).map(k => !!data.source[k]).includes(false)) return;
    Api({
      endpoint: endpoints.createCard(),
      data,
      onSuccess: () => {
        toast('success', 'Card Added Successfully');
        h.setOpen(false);
        h.getCards();
      },
      onFail: (response) => {
        response.statusCode === 402 ? toast('error', response.raw.message) : toast('error', 'Failed to add card')
      },
    });
  };
  const cardNumberStyle = !!cardNumber ? { letterSpacing: '0.8em', textAlign: 'center' } : {};
  return (
    <Dialog open={h.open} maxWidth="600">
      <div className="d-flex justify-content-between">
        <DialogTitle><h3>Add Debit/Credit Card</h3></DialogTitle>
        <Close style={{ color: '#EA0000', padding: 20 }} onClick={() => h.setOpen(false)} />
      </div>
      <DialogContent>
        <div className="d-flex flex-column">
          <TextField
            placeholder="Cardholder Name"
            variant="outlined"
            value={cardName}
            onChange={e => setCardName(e.target.value)}
          />
          <TextField
            placeholder="Card Number"
            variant="outlined"
            className="mt-3"
            value={(cardNumber ?? '').match(/.{1,4}/g)?.join('-')}
            inputProps={{ maxLength: 19, minLength: 19, style: cardNumberStyle }}
            onChange={e => setCardNumber(e.target.value.replaceAll('-', ''))}
          />
        </div>
        <div className="d-flex">
          <TextField
            select
            label="Expiry Month"
            variant="outlined"
            value={cardDateMonth}
            className="mt-3 mb-3 mr-3"
            onChange={e => setCardDateMonth(e.target.value)}
            style={{ width: 140 }}
          >
            {moment.months().map((m, index) => <MenuItem value={index + 1}>{m}</MenuItem>)}
          </TextField>
          <TextField
            select
            placeholder="Expiry Year"
            variant="outlined"
            inputProps={{ minLength: 4, maxLength: 4 }}
            className="mt-3 mb-3 mr-3"
            value={cardDateYear}
            onChange={e => setCardDateYear(e.target.value)}
            style={{ width: 140 }}
          >
            {[...Array(30).keys()].map((m) => <MenuItem value={moment().year() + m}>{moment().year() + m}</MenuItem>)}
          </TextField>
          <TextField
            placeholder="CVV"
            variant="outlined"
            className="mt-3 mb-3"
            inputProps={{ minLength: 3, maxLength: 3 }}
            value={cvv}
            onChange={e => setCvv(e.target.value)}
            style={{ width: 140 }}
          />
        </div>
        <p>To verify your card, $1 will be charged. It will be <br />refunded in the same day</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => addCard()}><Add /> ADD CARD</Button>
      </DialogActions>
    </Dialog>
  );
}
