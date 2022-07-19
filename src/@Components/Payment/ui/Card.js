/* eslint-disable max-len */
import React from 'react';
import { Box, Button, ListItem } from '@material-ui/core';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MasterCardIcon from '@Assets/Icons/mastercardv3-icon.png';
import VisaIcon from '@Assets/Icons/Icon-simple-visa.png';
import InteracIcon from '@Assets/Icons/interacv3-icon.png';
import AmexIcon from '@Assets/Icons/amexv3-icon.png';
import DiscoverIcon from '@Assets/Icons/discoverv2-icon.png';
import JCBIcon from '@Assets/Icons/jcbv3-icon.png';
import UnionPayIcon from '@Assets/Icons/unionpayv3-icon.png';

const cardBackground = {
  Visa: 'ccbackground-blue.png',
  MasterCard: 'ccbackground-red.png',
  UnionPay: 'ccbackground.png',
  JCB: 'ccbackground-yellow.png',
  Discover: 'ccbackground-grey-blue.png',
  AmericanExpress: 'ccbackground-amex.png',
  Interac: 'ccbackground-green.png',
};

const cardIcon = {
  Visa: VisaIcon,
  MasterCard: MasterCardIcon,
  UnionPay: UnionPayIcon,
  JCB: JCBIcon,
  Discover: DiscoverIcon,
  AmericanExpress: AmexIcon,
  Interac: InteracIcon,
}

const CardIcon = ({ card, ...props }) => (
  <img
    style={{ width: card.brand === 'Visa' ? 30 : 60 }}
    src={cardIcon[card.brand]}
    {...props}
  />
);

export default function Card({
  c, isNotPrimary, onClick, ...h
}) {
  const MySwal = withReactContent(Swal);
  const isSelected = h.selectedCard === c.id ? { border: 'solid 3px green' } : {};
  return (
    <ListItem style={{ width: 'inherit' }}>
      <Box
        style={{
          width: 210,
          height: 100,
          borderRadius: 10,
          backgroundImage: `url("${process.env.REACT_APP_S3}/static/creditCard/${cardBackground[c.brand]}")`,
          padding: 15,
          ...isSelected,
        }}
        onClick={h.mode === 'payment' ? () => h.setSelectedCard(c.id) : null}
      >
        <div className="d-flex align-items-center ml-2 justify-content-between">
          <CardIcon card={c} className={c.brand === 'Visa' ? 'mt-1' : null} />
          {(!!isNotPrimary || !h.user?.subscription_id) && (
            <Button
              onClick={() => {
                MySwal.fire({
                  title: `**** **** **** ${c.last4}`,
                  showCancelButton: true,
                  showDenyButton: true,
                  showConfirmButton: !!isNotPrimary,
                  denyButtonText: 'Remove card',
                  confirmButtonText: 'Set as default',
                  confirmButtonColor: 'var(--primary-color)',
                  cancelButtonText: 'Do Nothing',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    onClick(c.id, MySwal);
                  }
                  if (result.isDenied) {
                    h.removeCard(c.id, MySwal);
                  }
                });
              }}
              size="small"
              style={{ opacity: 0.5, backgroundColor: 'rgba(64, 64, 64, .8)', maxHeight: 20 }}
            >
              <h3 className="text-white" style={{ fontSize: 16 }}>• • •</h3>
            </Button>
          )}
        </div>
        <div className="d-flex align-items-center h-50 ml-2 mt-2">
          <h3 className="text-white" style={{ fontSize: 16 }}>• • • •</h3>
          <h3 className="text-white ml-3" style={{ fontSize: 16 }}>• • • •</h3>
          <h3 className="text-white ml-3" style={{ fontSize: 16 }}>• • • •</h3>
          <p className="text-white ml-3">{c.last4}</p>
        </div>
        <div className="ml-2 mb-5 d-flex justify-content-between">
          <p className="text-white" style={{ fontSize: 9 }}>Card holder <br /> {c.name}</p>
            &nbsp;&nbsp;&nbsp;
        </div>
      </Box>
    </ListItem>
  );
}
