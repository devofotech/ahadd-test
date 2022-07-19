/* eslint-disable object-curly-newline */
import { useState, useEffect } from 'react';
import { Grid, Select, MenuItem } from '@material-ui/core';
import Api, { endpoints } from '@Helpers/api';
import MainContentContainer from '@Components/MainContentContainer';
import BarChart from '@Components/BarChart';
import MaterialTable from '@Components/MaterialTable';
import SimpleCard from '@Components/SimpleCard';
import Navbar from '@Components/Navbar';
import moment from 'moment';
import _ from 'lodash';

// later change to this when have data
const kpi = 75;
const columns = [
  { name: 'PROJECT', selector: 'project', align: 'left', width: 220 },
  { name: 'CONTRACTORS', selector: 'contractors', align: 'center', width: 250 },
  { name: 'GFA (m²)', selector: 'GFA', align: 'center', width: 100 },
  { name: 'NO. OF SAMPLE', selector: 'no_samples', align: 'center', width: 100 },
  { name: 'YEAR', selector: 'year', align: 'center', width: 100 },
  { name: 'PREQLASSIC', selector: 'preqlassic_score', align: 'center', width: 120 },
  { name: 'CIDM QLASSIC', selector: 'cidb_score', align: 'center', width: 120 },
];

export default function QualityDashboard(props) {
  const [mainCards, setMainCards] = useState([]);
  const [qlassicSummaryCharts, setQlassicSummaryCharts] = useState([]);
  const [qlassicSummaryCards, setQlassicSummaryCards] = useState([]);
  const [qlassicSummaryTableData, setQlassicSummaryTableData] = useState([]);
  const [qlassicSummaryRawData, setQlassicSummaryRawData] = useState([]);
  const [currentYear, setYear] = useState(moment().year());
  const CardsMap = ({ items }) => items.map(({ label, value }) => (
    <SimpleCard
      label={label}
      value={value}
      style={{ backgroundColor: 'rgb(245, 250, 255)' }}
      elevation={0} // increase elevation to increase shadow
    />
  ));
  const refreshQlassicSummaryTableData = () => {
    Api({
      endpoint: endpoints.getConquas(),
      onSuccess: ({ data }) => {
        const rawData = data.map(d => ({ ...d, contractors: d.Contractor.name }));
        setQlassicSummaryRawData(rawData);
        setQlassicSummaryTableData(rawData.filter(x => x.year === currentYear));
        const eachBar = _.groupBy(data, 'year');
        const arrayBar = Object.keys(eachBar).map(year => ({
          x: year,
          y2: _.meanBy(eachBar[year], 'cidb_score'),
          // later change ways of kpi
          y1: kpi,
        }));
        setQlassicSummaryCharts(arrayBar);
        const mainItemsAllTime = [
          { label: 'AVERAGE QLASSIC SCORE', value: _.meanBy(data, 'cidb_score').toFixed(2) },
          { label: 'NO. OF PROJECTS', value: data.length },
          { label: 'TOTAL SCORE', value: _.sumBy(data, 'cidb_score').toFixed(2) },
        ];
        setMainCards(mainItemsAllTime);
        const qlassicSummaryItemsThisyear = [
          { label: `${currentYear} AVERAGE QLASSIC SCORE`, value: _.meanBy(eachBar[currentYear], 'cidb_score').toFixed(2) },
          { label: `${currentYear} KPI`, value: kpi },
          { label: `${currentYear} NO. OF PROJECTS`, value: eachBar[currentYear].length },
          { label: `${currentYear} TOTAL SCORE`, value: _.sumBy(eachBar[currentYear], 'cidb_score').toFixed(2) },
        ];
        setQlassicSummaryCards(qlassicSummaryItemsThisyear);
      },
      onFail: () => console.log('xx'),
    });
  };

  useEffect(() => {
    refreshQlassicSummaryTableData();
  }, []);

  useEffect(() => {
    refreshQlassicSummaryTableData();
  }, [currentYear]);
  return (
    <MainContentContainer>
      {props.navbar !== false
        ? <Navbar to="/project/" text="Quality" subtext={props.filtered_projects[props.selected_project]?.name} />
        : <h1 style={{ paddingLeft: 20 }}>Quality Dashboard</h1>}
      <Grid container xs={12} md={12} style={{ padding: 20, display: 'flex' }}>
        <CardsMap items={mainCards} />
      </Grid>
      <h3 style={{ paddingLeft: 20 }}>Summary of Qlasic score by year</h3>
      <Grid container xs={12} md={12} style={{ padding: 20 }}>
        <BarChart data={qlassicSummaryCharts} />
      </Grid>
      <Grid container xs={12} md={12} style={{ padding: 20 }}>
        <Grid item xs={10}>
          <h3 style={{ paddingLeft: 20 }}>Summary of {currentYear} Qlasic score</h3>
        </Grid>
        <Grid item xs={2}>
          <Select variant="outlined" value={currentYear} style={{ padding: '0px' }} onChange={(e) => setYear(e.target.value)}>
            {[...Array(100)].map((e, i) => (<MenuItem value={i + 1980} children={i + 1980} />))}
          </Select>
        </Grid>
      </Grid>

      <Grid container xs={12} md={12} style={{ padding: 20 }}>
        <CardsMap items={qlassicSummaryCards} />
      </Grid>
      <Grid container xs={12} md={12} style={{ padding: 20 }}>
        <MaterialTable
          tableHead
          columns={columns}
          tableData={qlassicSummaryTableData}
          tableMinWidth={300}
          tableMaxHeight={300}
          rowClick={({ ContractorId }) => {
            props.h.setOpenContractorDialog(qlassicSummaryRawData.filter(x => x.ContractorId === ContractorId));
          }}
        />
      </Grid>
    </MainContentContainer>
  );
}
