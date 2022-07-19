import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import ReactWordcloud from 'react-wordcloud';

const wcProps = {
  options: {
    rotations: 3,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSizes: [10, 40],
  },
  maxWords: 60,
};

function WordCloud({ wordcloudData, isLoading }) {
  return (
    <Grid item md={12} lg={12} style={{ height: '100%' }}>
      <Grid container spacing={3} style={{ height: '100%' }}>
        {wordcloudData.map(w => (
          <Grid item xs={12}>
            <div className="paper" style={{ padding: '10px 10px 5px', margin: '0px 10px', border: '1px solid var(--primary-color)' }}>
              <h3 style={{ padding: '6px 0' }}>{w.title}</h3>
              {isLoading
                ? <div className="flex-standard" style={{ height: 300 }}><CircularProgress /></div>
                : (
                  <ReactWordcloud
                    {...w}
                    {...wcProps}
                  />
                )}
            </div>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default WordCloud;
