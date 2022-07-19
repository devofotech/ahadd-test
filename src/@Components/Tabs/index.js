import React, { useState } from 'react';
import './styles.css';
import { Grid } from '@material-ui/core';

export function Tabs(props) {
  const [openTab, setOpenTab] = useState(0);

  return (
    <Grid container>
      <Grid container item xs={12}>
        {props.data.map((item, index) => (
          <Grid key={index} item xs={6} lg={2} style={{ zIndex: 2 }}>
            <h4
              className="tabButton"
              style={{
                fontWeight: 600,
                color: openTab === index && 'rgba(30, 52, 101, 1)',
                backgroundColor: openTab === index && '#FFFFFF',
                borderBottomColor: '#FFFFFF',
              }}
              onClick={() => setOpenTab(index)}
            >
              {item.title}
            </h4>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} className="paper" style={{ borderTopLeftRadius: 0 }}>
        {props.data.map((item, index) => (
          <div
            key={index}
            className="tabContent"
            style={{
              display: openTab === index && 'block',
            }}
          >
            {item.content}
          </div>
        ))}
      </Grid>
    </Grid>
  );
}
