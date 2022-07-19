import React from 'react';
import { Paper, CircularProgress } from '@material-ui/core';
import {
  VictoryChart, VictoryArea, VictoryAxis, VictoryLabel
} from 'victory';
import moment from 'moment';
import { numberWithCommas, sumBy } from '@Helpers';

function getTickValues() {
  const temp = [];
  if (moment().format('M') < 7) {
    for (let i = 0; i < 6; i++) {
      temp.push(moment().month(i).format('MMM'));
    }
  } else {
    for (let i = 6; i < 12; i++) {
      temp.push(moment().month(i).format('MMM'));
    }
  }
  return temp;
}

const tickValues = getTickValues();

export default function ExpensesChart(h) {
  const transactionFilter = h.transactions?.filter(ex => ex.Payment?.currency === 'usd');
  const chartData = transactionFilter.map((item, i) => (
    { x: moment(item.Payment.createdAt).format('MMM'), y: item.Payment.amount }
  ));
  return (
    <Paper style={{
      height: 230, paddingBottom: 10, marginTop: 15, paddingInline: 35, paddingTop: 35,
    }}
    >
      {h.isLoading ? (
        <CircularProgress
          size={75}
          className="position-absolute"
          style={{
            top: '50%', left: '50%', marginTop: -20, marginLeft: -40, color: 'var(--primary-color)',
          }}
        />
      ) : (
        <>
          <h3>Expenses</h3>
          <h3 style={{ fontSize: '30px', paddingTop: 10 }}>${numberWithCommas(sumBy(transactionFilter?.map(e => ({ ...e, amount: e.Payment?.amount })), 'amount'))}</h3>
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#008FFB" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
          <svg viewBox="0 0 700 200" height="55%" width="100%">
            <VictoryChart
              standalone={false}
              height={200}
              width={700}
              domainPadding={10}
            >
              <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
                style={{
                  tickLabels: { fontSize: 24 },
                  ticks: { size: 10 },
                  axis: { stroke: 'transparent' },
                }}
                tickValues={tickValues}
                tickCount={6}
                axisLabelComponent={(
                  <VictoryLabel
                    angle={0}
                    verticalAnchor="start"
                    dy={60}
                    dx={0}
                  />
                )}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: 'transparent' },
                  tickLabels: {
                    fontSize: 12,
                    padding: 5,
                    fill: 'transparent',
                  },
                  ticks: { size: 10 },
                  tickCount: 4,
                }}
                axisLabelComponent={<VictoryLabel angle={0} verticalAnchor="start" dy={-200} dx={10} style={{ fontSize: 32, fill: '#045C5C' }} />}
              />
              <VictoryArea
                interpolation="catmullRom"
                data={chartData}
                style={{ data: { fill: 'url(#gradient)' } }}
                animate={{ duration: 2000, onLoad: { duration: 1000 } }}
              />
            </VictoryChart>
          </svg>
        </>
      )}
    </Paper>
  );
}
