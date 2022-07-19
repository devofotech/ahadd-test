// import { Grid, Paper } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import CustomCard from '@Components/CustomCard/v3';

// import CustomList from '@Components/CustomList/v1';
// import MultilineChart from '@Components/MultilineChart/v2';
// import PieChart from '@Components/PieChart';
// import _ from 'lodash';
// import MaterialTable from '@Components/MaterialTable/v2';
// import Hook from './hook';

// const columns = [
//   {
//     name: 'ID',
//     selector: 'id',
//   },
//   {
//     name: 'Filename',
//     selector: 'name',
//   },
//   {
//     name: 'Location',
//     selector: 'location',
//   },
//   {
//     name: 'Asset Type',
//     selector: 'asset_type',
//     options: { filter: false },
//   },
//   {
//     name: 'Date Inspection',
//     selector: 'lastinspection',
//     options: { filter: false },
//   },
//   {
//     name: 'Minor',
//     selector: 'minor',
//     options: {
//       filter: false,
//       setCellHeaderProps: (value) => ({
//         style: { textAlign: 'center' },
//       }),
//       setCellProps: (value) => ({
//         style: { textAlign: 'center' },
//       }),
//     },
//   },
//   {
//     name: 'Major',
//     selector: 'major',
//     options: {
//       filter: false,
//       setCellHeaderProps: (value) => ({
//         style: { textAlign: 'center' },
//       }),
//       setCellProps: (value) => ({
//         style: { textAlign: 'center' },
//       }),
//     },
//   },
//   {
//     name: 'Critical',
//     selector: 'critical',
//     options: {
//       filter: false,
//       setCellHeaderProps: (value) => ({
//         style: { textAlign: 'center' },
//       }),
//       setCellProps: (value) => ({
//         style: { textAlign: 'center' },
//       }),
//     },
//   },
//   {
//     name: 'Solved',
//     selector: 'solved',
//     options: {
//       filter: false,
//       setCellHeaderProps: (value) => ({
//         style: { textAlign: 'center' },
//       }),
//       setCellProps: (value) => ({
//         style: { textAlign: 'center' },
//       }),
//     },
//   },
// ];

// const useStyles = makeStyles(() => ({
//   sections: {
//     marginBottom: '50px',
//   },
// }));

// export default function content({ lines }) {
// temporary
// const classes = useStyles();
// const h = Hook('analytic');
// const issues = ['minor', 'major', 'critical', 'solved'];
// const severities_allprojects = h.projects.map(({ severity }) => severity);
// const totalCount = issues.map((severity) => ({
//   [severity]: _.sumBy(severities_allprojects, severity),
// }));
// const severity_flat = Object.assign({}, ...totalCount);
// const assetWithHeighestIssues = h.projects.map(
//   ({ severity, name, image }) => ({
//     name,
//     image,
//     issues: _.sum(Object.values(severity)),
//   }),
// );
// console.log('mmm', h.projects);
// return (
//   <Grid container>
//     <Grid container item xs={12} spacing={3} className={classes.sections}>
//       <Grid item xs={5}>
//         <Paper elevation={0}>
//           <PieChart details={severity_flat} />
//         </Paper>
//       </Grid>
//       <Grid item xs={3}>
//         {issues.map((x) => (
//           <CustomCard
//             value={severity_flat[x]}
//             label={`${x.toLocaleUpperCase()} ISSUES`}
//             percent="12"
//             indicator_rise
//           />
//         ))}
//       </Grid>
//       <Grid item xs={4}>
//         <Paper elevation={0} style={{ padding: '10px' }}>
//           <CustomList
//             details={_.sortBy(assetWithHeighestIssues, ['issues'], ['desc'])}
//           />
//         </Paper>
//       </Grid>
//     </Grid>
//     <Grid container item xs={12} spacing={3} className={classes.sections}>
//       <Paper style={{ width: '100%', padding: '50px' }}>
//         <h2 className="text-light primary" style={{ fontWeight: 400 }}>
//           NUMBER OF SEVERITY REPORTED IN 2021
//         </h2>
//         <MultilineChart />
//       </Paper>
//     </Grid>
//     <Grid container item xs={12} spacing={3} className={classes.sections}>
//       <Paper style={{ width: '100%' }}>
//         <MaterialTable
//           title="Analytic Table"
//           columns={columns}
//           tableData={h.projects.map((eachProject) => ({
//             ...eachProject,
//             ...eachProject.severity,
//           }))}
//         />
//       </Paper>
//     </Grid>
//   </Grid>
// );
// }
import DeniedPage from '@Pages/DeniedPage';

export default function analytics() {
  return (<DeniedPage />);
}
