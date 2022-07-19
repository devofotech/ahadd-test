import React from 'react';
import { Box, IconButton, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function EmptyCard({ onClick }) {
  return (
    <ListItem>
      <Box
        style={{
          width: 210, height: 100, borderRadius: 10, border: '1px solid grey', padding: 15,
        }}
        onClick={() => onClick()}
      >
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <IconButton>
            <AddIcon style={{ color: '#04847C' }} />
          </IconButton>
          <p>ADD PAYMENT METHOD</p>
        </div>
      </Box>
    </ListItem>
  );
}
