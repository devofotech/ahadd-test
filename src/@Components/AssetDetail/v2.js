import { Grid } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessIcon from '@material-ui/icons/Business';
import PublicIcon from '@material-ui/icons/Public';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';

export default function AssetDetail({
  details, assetTypeList = [], regions = [], sections = [],
}) {
  let lastinspection = moment(details.lastinspection).isValid() ? moment(details.lastinspection).format('DD MMM YYYY') : 'No Inspection';
  if (!details.lastinspection) lastinspection = 'No Inspection';

  const getLabel = (arr, id) => (!arr.length ? '-' : arr.find(e => e.id === id)?.name);

  return (
    <Grid container spacing={1} style={{ width: '93%', flexWrap: 'wrap', justifyContent: 'center' }} className="my-2">
      {[
        {
          title: 'Asset Type', data: getLabel(assetTypeList, details.AssetTypeId), show: true, icon: <BusinessIcon fontSize="default" />,
        },
        {
          title: 'Region', data: getLabel(regions, details.RegionId), show: true, icon: <PublicIcon fontSize="default" />,
        },
        {
          title: 'Section', data: getLabel(sections, details.SectionId), show: true, icon: <LocationOnIcon fontSize="default" />,
        },
        {
          title: 'Last Inspection', data: lastinspection, show: true, icon: <CalendarTodayIcon fontSize="default" />,
        },
      ].map(e => (
        <>
          {e.show && (
            <Grid item xs={6} lg={6}>
              <Grid
                container
                style={{
                  backgroundColor: '#F5FAFF', marginBottom: 1, marginLeft: 1, padding: 2, borderRadius: 5, height: 60, overflowY: 'auto',
                }}
              >
                <Grid container lg={3} justifyContent="center" alignItems="center">
                  <div className="d-flex mx-auto" style={{ color: 'var(--tertiary-color)' }}>
                    {e.icon}
                  </div>
                </Grid>
                <Grid container lg={9} justifyContent="center" alignItems="center">
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.7em', color: 'var(--tertiary-color)' }}>{e.title}</p>
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--secondary-color)' }}>{e.data}</p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      ))}
    </Grid>
  );
}
