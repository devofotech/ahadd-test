import React from 'react';
import { Grid } from '@material-ui/core';
import { Table } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: { fontSize: 24, padding: '7px 0', fontWeight: 'bold', color: '#03A398' },
  header: { fontSize: 14, paddingTop: 7, color: '#272828' },
  text: { fontSize: 16, paddingBottom: 7, fontWeight: 'bold', color: '#272828' },
  row: { fontSize: 16, fontWeight: 'bold' },
});

export default function DataSetSummary({ tableDataSorted, image_number, annotation_number }) {
  const classes = useStyles();
  return (
    <Grid item md={12} lg={12} style={{ height: '100%' }}>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12}>
          <div className="paper" style={{ margin: '0px 0px 0px 10px', border: '1px solid var(--primary-color)' }}>
            <Grid container>
              <Grid item xs={5} style={{ padding: '0px 10px 10px' }}>
                <p className={classes.title}>Data Set Summary</p>
                <p className={classes.header}>Total Image</p>
                <p className={classes.text}>{image_number} images</p>
                <p className={classes.header}>Total Annotation</p>
                <p className={classes.text}>{annotation_number} annotations</p>
                <p className={classes.header}>Total 5 words</p>
                <Table borderless style={{ marginBottom: 2 }}>
                  <tbody>
                    {tableDataSorted.map(data => (
                      <tr className={classes.row}>
                        <td style={{ padding: 0 }}>{data.text}</td>
                        <td style={{ padding: 0 }}>{data.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Grid>
              <Grid item xs={7} style={{ paddingLeft: 10 }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                  alt="test"
                  width="100%"
                  height="100%"
                  style={{ borderRadius: '10px' }}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
