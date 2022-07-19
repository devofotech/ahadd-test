import { useState } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import MaterialTable from '@Components/MaterialTable';
import HighlightTabs from '@Components/HighlightTabs';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Navbar from '@Components/Navbar';
import NoDataImg from '@Assets/Images/Data-not-found3.svg';
import DeleteDialog from '@Components/DeleteDialog';
import MainContentContainer from '@Components/MainContentContainer';
import Hook from './hook';
import GenerateReport from './GenerateReport';

const columns = [
  {
    name: 'REPORT ID',
    selector: 'id',
    align: 'left',
    minWidth: 70,
  },
  {
    name: 'REPORT GENERATED',
    selector: 'createdAt',
    align: 'center',
    minWidth: 220,
  },
  {
    name: 'DOWNLOAD',
    selector: 'download',
    align: 'center',
    minWidth: 100,
  },
  {
    name: 'DELETE',
    selector: 'delete',
    align: 'center',
    minWidth: 100,
  },
];

const columnsSR = [
  {
    name: 'ID',
    selector: 'id',
    align: 'left',
    minWidth: 60,
  },
  {
    name: 'FILE',
    selector: 'file_path',
    align: 'left',
    minWidth: 470,
  },
  {
    name: 'ACTIONS',
    selector: 'action',
    align: 'center',
    minWidth: 100,
  },
];

const tabslist = [
  // { label: 'GENERATED REPORT', value: 'generated' },
  { label: 'STORED REPORT', value: 'storedReports' },
  { label: 'SITE REPORT', value: 'siteReports' },
];

export default function Report(props) {
  const h = Hook(props);
  const [tab, setTab] = useState('siteReports');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState();
  const showDelete = props.selectedPhaseList[props.category]?.removeReportAccess;

  const deleteButton = (report) => (
    showDelete && (
      <IconButton style={{ width: 12, height: 12 }} onClick={() => { setSelectedReport(report); setOpenDialog(true); }}>
        <DeleteIcon style={{ color: 'red' }} />
      </IconButton>
    )
  );
  if (!props.user?.can_view_report) return <Redirect to="/project" />;
  return (
    <MainContentContainer>
      <div className="d-flex justify-content-between">
        <Navbar
          to="/project/"
          text="Report"
          subtext={props.filtered_projects[props.selected_project]?.name}
        />
        {props.project && props.project.name !== 'View All Projects' && tab === 'generated'
          ? <GenerateReport project={props.project} callback={(data) => h.onSave(data)} /> : null}
      </div>
      <HighlightTabs items={tabslist} tab={tab} setTab={setTab} />
      <Grid item xs={12} style={{ padding: 20 }}>
        {tab === 'generated' ? (
          <MaterialTable
            tableHead
            columns={columns}
            tableData={h.reports.map(x => ({
              ...x,
              download: (
                <Link to={{ pathname: `${process.env.REACT_APP_ENDPOINT_URL}report/${x.id}` }} target="_blank">
                  <IconButton style={{
                    color: 'white', background: 'var(--primary-color)', width: 12, height: 12,
                  }}
                  ><GetAppIcon />
                  </IconButton>
                </Link>),
              delete: deleteButton(x),
            }))}
            tableMinWidth={300}
            tableMaxHeight={900}
          />
        ) : (
          <>
            {!!h[tab].length ? (
              <MaterialTable
                tableHead
                columns={columnsSR}
                tableData={h[tab].map(x => {
                  const eachfileName = x.name ? x.name?.split(',') : '';
                  const eachfile = x.path ? x.path.split(',') : x.raw_path.split(',');
                  return ({
                    ...x,
                    file_path: x.path === '' ? 'N/A' : eachfile?.map((file, idx) => (
                      <>
                        <Link to={{ pathname: `${file}` }} target="_blank">
                          <IconButton style={{
                            color: 'white', background: 'var(--primary-color)', width: 12, height: 12,
                          }}
                          ><InsertDriveFileIcon />
                          </IconButton> &nbsp; {!!x.name ? eachfileName[idx] : 'Unnamed Files'}
                        </Link>
                        <br />
                      </>
                    )),
                    action: deleteButton(x),
                  });
                })}
                tableMinWidth={300}
                tableMaxHeight={900}
              />
            ) : (
              <div className="d-flex justify-content-center">
                <img src={NoDataImg} style={{ width: '30vw' }} />
              </div>
            )}
          </>
        )}
      </Grid>
      <DeleteDialog
        open={openDialog}
        setOpen={setOpenDialog}
        selected={selectedReport}
        setSelected={setSelectedReport}
        deleteFunction={() => (tab === 'generated' ? h.onDelete(selectedReport.id) : h.deleteSiteReport(selectedReport.id))}
      />
    </MainContentContainer>
  );
}
