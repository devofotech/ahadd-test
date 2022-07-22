import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessIcon from '@material-ui/icons/Business';
import PublicIcon from '@material-ui/icons/Public';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CycleIcon from '@material-ui/icons/Loop';
import moment from 'moment';

export default function AssetDetail({ details, assetTypeList = [], hasSummary = false }) {
  const [assetType, setAssetType] = useState([]);
  let lastinspection = moment(details.lastinspection).isValid() ? moment(details.lastinspection).format('DD MMM YYYY') : 'No Inspection';
  if (!details.lastinspection) lastinspection = '-';
  if (details.id === 92) lastinspection = '8 Nov 2021';
  if (details.id === 93) lastinspection = '21 Nov 2021';

  const removeAsset = asset => asset?.replace('Asset', '');

  useEffect(() => {
    if (!assetTypeList.length) return;
    if (!details.AssetTypeId) return;
    const filteredAssetType = assetTypeList.filter(f => f.id == details.AssetTypeId);
    setAssetType(Object.assign(...filteredAssetType));
  }, [assetTypeList, details]);

  return (
    <Grid container spacing={1} style={{ width: '100%', flexWrap: 'wrap', justifyContent: 'center' }} className="mb-2 p-4">
      {[
        {
          title: 'Asset Type', data: removeAsset(assetType?.name ?? details.asset_type) ?? 'Loading', show: true, icon: <BusinessIcon fontSize="default" />,
        },
        {
          title: 'Region', data: details.region, show: true, icon: <PublicIcon fontSize="default" />,
        },
        {
          title: 'Section', data: details.section, show: true, icon: <LocationOnIcon fontSize="default" />,
        },
        {
          title: 'Last Inspection', data: lastinspection, show: true, icon: <CalendarTodayIcon fontSize="default" />,
        },
        {
          title: 'Asset Life Cycle', data: !details.isLifeCycle ? 'No' : 'Yes', show: hasSummary, icon: <CycleIcon fontSize="default" />,
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
                  <div className="d-flex mx-auto" style={{ color: 'var(--primary-color)' }}>
                    {e.icon}
                  </div>
                </Grid>
                <Grid container lg={9} justifyContent="center" alignItems="center">
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.7em', color: 'var(--primary-color)' }}>{e.title}</p>
                    <p style={{ fontWeight: 600, fontSize: 12, color: 'var(--main-color)' }}>{e.data}</p>
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
