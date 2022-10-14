import { Grid, TextField, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

export default function InputItems(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container>
        {[
          {
            label: 'Cycle',
            input: (
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                select
                value={props.cycle}
                onChange={(e) => props.set_cycle(e.target.value)}
              >
                {[1, 2, 3, 4].map(e => <MenuItem value={e} className="text-dark">{`Cycle ${e}`}</MenuItem>)}
              </TextField>
            ),
          },
          {
            label: 'Year',
            input: (
              <TextField
                placeholder="Enter name of the inspection"
                variant="outlined"
                fullWidth
                required
                size="small"
                disabled
                className={props.styles}
                value={moment(props.date).format('YYYY')}
              />
            ),
          },
          {
            label: 'Inspection Date',
            input: (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  value={props.date}
                  onChange={props.set_date}
                  inputVariant="outlined"
                  style={{ width: '100%' }}
                  size="small"
                  disableFuture
                  showTodayButton
                  format="DD MMMM YYYY"
                  className={props.styles}
                />
              </MuiPickersUtilsProvider>
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
