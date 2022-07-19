import React from 'react';
import { Paper, CircularProgress } from '@material-ui/core';
import {
  VictoryChart, VictoryArea, VictoryAxis, VictoryLabel,
} from 'victory';
import moment from 'moment';
import { numberWithCommas, sumBy } from '@Helpers';

const tokenIcon = 'https://i.ibb.co/hyD60Bg/Screenshot-2021-12-24-112726.png';

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

export default function SpentTokenChart(h) {
  const transactionFilter = h.transactions?.filter(ex => ex.Payment?.currency === 'rcoin');

  const chartData = transactionFilter?.map((item, i) => (
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
          <h3>Token Spent</h3>
          <div className="d-flex align-items-center" style={{ paddingTop: 10, gap: 10 }}>
            <img
              src={tokenIcon}
              height={30}
              width={30}
            />
            <h3 style={{ fontSize: '30px' }}>
              {numberWithCommas(sumBy(transactionFilter?.map(e => ({ ...e, amount: e.Payment?.amount })), 'amount'))}
            </h3>
          </div>
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient
                id="gradientv2"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FCDB42" />
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
                style={{
                  tickLabels: { fontSize: 25 },
                  ticks: { size: 10 },
                  axis: { stroke: 'transparent' },
                }}
                tickValues={getTickValues()}
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
                }}
                axisLabelComponent={<VictoryLabel angle={0} verticalAnchor="start" dy={-200} dx={10} style={{ fontSize: 32, fill: '#045C5C' }} />}
              />
              <VictoryArea
                interpolation="catmullRom"
                data={chartData}
                style={{ data: { fill: 'url(#gradientv2)' } }}
                animate={{ duration: 2000, onLoad: { duration: 1000 } }}
              />
            </VictoryChart>
          </svg>
        </>
      )}

    </Paper>
  );
}
