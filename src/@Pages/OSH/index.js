import { Grid, Button } from '@material-ui/core';
import MainContentContainer from '@Components/MainContentContainer';
import SelectableCollapse from '@Components/SelectableCollapse';
import MultilineChart from '@Components/MultilineChart';
import SimpleImageTile from '@Components/SimpleImageTile';
import Navbar from '@Components/Navbar';
import SnackBarUploadProgress from '@Components/SnackBarUploadProgress';
import Hook from './hook';

export default function OSH(props) {
  const h = Hook(props);
  return (
    <MainContentContainer>
      {props.navbar !== false
        ? <Navbar to="/project/" text="OSH" subtext={props.filtered_projects[props.selected_project]?.name} />
        : <h1 style={{ paddingLeft: 20 }}>OSH Dashboard</h1>}
      <Grid container>
        <Grid item xs={12} md={4} style={{ padding: 20 }}>
          <SelectableCollapse
            data={h.compliances}
            selected={h.selectedCompliance}
            callback={h.setSelectedCompliance}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: 20 }}>
          <Grid container style={{ height: '100%' }}>
            <Grid item xs={12} md={12}>
              <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <h2 className="text-light" style={{ fontWeight: 600 }}>STATISTIC</h2>
                <div>
                  {[
                    { value: 7, name: '7 DAYS' },
                    { value: 30, name: '30 DAYS' },
                    { value: 180, name: '6 MONTHS' },
                  ].map(e => (
                    <Button size="small" onClick={() => { h.setSpanDays(e.value); }}>
                      <p style={{ color: h.spanDays !== e.value && '#AEB8CB', fontWeight: 600 }}>{e.name}</p>
                    </Button>
                  ))}
                </div>
              </div>
              <MultilineChart {...h} />
            </Grid>
            <Grid item xs={12} md={12}>
              <h2 style={{ fontWeight: 600 }}>IMAGES</h2>
              <SimpleImageTile
                images={h.inspectionFiles.map(x => ({ ...x, path: x['InspectionFile.path'] }))}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainContentContainer>
  );
}
