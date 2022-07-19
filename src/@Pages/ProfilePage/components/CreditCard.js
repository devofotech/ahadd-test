import React from 'react';
import { List } from '@material-ui/core';
import Card from '@Components/Payment/ui/Card';
import EmptyCard from '@Components/Payment/ui/EmptyCard';

export default function CreditCard(h) {
  return (
    <div className="d-flex mt-3 justify-content-around">
      <List style={{
        display: 'flex', flexDirection: 'row', overflowX: 'scroll', scrollbarWidth: 'none',
      }}
      >
        {
          h.cards?.data.map((c, index) => (
            <Card
              c={c}
              isNotPrimary={!!index}
              onClick={h.handleSetDefaultCard}
              user={h.props.user}
              removeCard={h.removeCard}
            />
          ))
        }
        <EmptyCard onClick={h.handleClickOpen} />
      </List>
    </div>
  );
}
