import { Grid, TextField, MenuItem } from '@material-ui/core';
import { todayDateTime } from '@Helpers';
import _ from 'lodash';

export default function InputItems(props) {
  const module_option = !!props.module[props.ProjectPhaseId]
    ? _.orderBy(Object.values(props.module[props.ProjectPhaseId]), ['is_general'], ['desc'])
    : [];
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container>
        {[
          {
            label: 'Date',
            input: (
              <TextField
                type="datetime-local"
                variant="outlined"
                size="small"
                className={props.styles}
                value={props.date}
                onChange={(e) => props.set_date(e.target.value)}
                inputProps={{ max: todayDateTime }}
              />
            ),
          },
          {
            label: 'Inspection Name',
            input: (
              <TextField
                placeholder="Enter name of the inspection"
                variant="outlined"
                fullWidth
                required
                size="small"
                className={props.styles}
                value={props.name}
                onChange={(e) => props.set_name(e.target.value)}
              />
            ),
          },
          {
            label: 'Description',
            input: (
              <TextField
                placeholder="Enter description of the inspection"
                multiline
                fullWidth
                required
                rows={4}
                variant="outlined"
                className={props.styles}
                value={props.description}
                onChange={(e) => props.set_description(e.target.value)}
              />
            ),
          },
          {
            label: 'Project Phase',
            input: (
              <TextField
                select
                fullWidth
                variant="outlined"
                value={props.ProjectPhaseId}
                onChange={(e) => props.setProjectPhaseId(e.target.value)}
                size="small"
                className={props.styles}
                required
              >
                {props.projectPhase
                  .filter(m => m.addPageAccess)
                  .map(e => (<MenuItem value={e.id} children={<p className="text-uppercase text-dark">{e.name}</p>} />))}
              </TextField>
            ),
          },
          {
            label: 'Annotation Module',
            input: (
              <TextField
                select
                fullWidth
                variant="outlined"
                value={props.ModuleId}
                onChange={(e) => props.setModuleId(e.target.value)}
                size="small"
                className={props.styles}
                required
              >
                {module_option
                  .map(e => (<MenuItem value={e.id} children={<p className="text-uppercase text-dark">{e.name}</p>} />))}
              </TextField>
            ),
          },
        ].map(e => (
          <Grid item container>
            <Grid item xs={3}>
              <p style={{ padding: '15px 10px' }}>{e.label}</p>
            </Grid>
            <Grid item xs={9}>
              {e.input}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
