import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { VictoryLabel, VictoryLegend, VictoryPie } from 'victory';
import { sumBy } from '@Helpers';

export default function PieChart({ details, isRoundOff = false, type }) {
  const [pieData, setPieData] = useState([]);
  const [legend, setLegend] = useState([]);
  const [colorSet, setColorSet] = useState([]);
  const dataType = ['severity'].includes(type) ? details.severity : details.issue;

  useEffect(() => {
    if (!dataType) return;
    const chart = dataType?.map((m, idx) => ({
      x: idx + 1,
      y: m.value,
    }));
    setPieData(chart);

    const filter_legend = dataType?.map(m => ({
      name: m.name,
      symbol: { fill: `#${!!m.colour ? m.colour : '000'}`, type: 'circle' },
    }));
    setLegend(filter_legend);

    const filter_colorSet = dataType?.map(m => `#${!!m.colour ? m.colour : '000'}`);
    setColorSet(filter_colorSet);
  }, [details, type]);

  return (
    <Grid container spacing={2} className="px-2 pt-3" style={{ justifyContent: 'center' }}>
      <h6 className="color-secondary text-center w-100 font-weight-bold" style={{ marginBottom: '-15px' }}>
        {['severity'].includes(type) ? 'Inspection Severity' : 'Inspection Status'}
      </h6>
      <div>
        <svg viewBox="0 0 550 340" width="100%" height="100%">
          <VictoryLegend
            x={300}
            y={40}
            orientation="horizontal"
            standalone={false}
            itemsPerRow={1}
            gutter={10}
            data={legend}
            style={{ labels: { fontFamily: 'CeraProRegular', fontSize: 18 } }}
          />
          <VictoryPie
            colorScale={!!sumBy(pieData, 'y') ? colorSet : ['Grey']}
            animate={{ duration: 2000 }}
            standalone={false}
            width={340}
            height={340}
            data={!!sumBy(pieData, 'y') ? pieData : [{ y: 1 }]}
            innerRadius={64}
            labelRadius={75}
            style={{ labels: { fontSize: 20, fill: 'white', textShadow: '2px 2px 4px #000000' } }}
            labelComponent={<VictoryLabel />}
            labels={pieData.map(
              e => (e.y ? `${isRoundOff ? (e.y / sumBy(pieData, 'y') * 100).toFixed(0) : (e.y / sumBy(pieData, 'y') * 100).toFixed(2)}%` : ''),
            )}
            labelPosition="centroid"
            labelPlacement="vertical"
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontFamily: 'CeraProRegular', fontSize: 28, fontWeight: 600 }}
            x={170}
            y={155}
            text={(sumBy(pieData, 'y')).toLocaleString()}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontFamily: 'CeraProRegular' }}
            x={170}
            y={185}
            text="Total detection"
          />
        </svg>
      </div>
    </Grid>
  );
}
