import React from 'react';
import { Grid, Box, Button } from '@material-ui/core';

import PaperCard from './Components/PaperCard';
import ColorForm from './Components/ColorForm';

const level = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];

export default function SeverityEdit(h) {
  const hasOriginalData = h.severityGroup[h.selectedAssetType];
  return (
    <div style={{ minHeight: '80vh' }}>
      <h1 className="mx-3 mt-5" style={{ fontSize: 14, color: '#000' }}>
        Define your asset severity from level 1 being the&nbsp;
        lowest and level 5 as the highest severity level.
      </h1>
      <Box>
        <Grid sm={12} container spacing={3} className=" mt-2 d-flex justify-content-center ">
          <PaperCard
            assetType={h.assetTypeList.find(x => x.id === h.selectedAssetType)}
            originalSeverity={h.severityGroup[h.selectedAssetType]}
            {...h}
          />
          <Grid xs={12} sm={7} item className="d-flex flex-column">
            <Grid spacing={3} container className="mb-0">
              {
                ['Asset severity Level', 'Select color for the severity level']
                  .map(title => (
                    <Grid xs={12} sm={6} item className="w-100">
                      <h1 style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.75)' }}>{title}</h1>
                    </Grid>
                  ))
              }
            </Grid>
            {level.map((m, idx) => (
              <>
                <ColorForm
                  level={m}
                  onChange={h.handleChange}
                  index={idx}
                  defaultData={hasOriginalData?.length ? hasOriginalData[idx] : null}
                  organizationId={h.user.OrganizationId}
                  openPicker={h.openPicker}
                  setOpenPicker={h.setOpenPicker}
                />
              </>
            ))}
            <Grid className="d-flex flex-row-reverse">
              <Button
                variant="contained"
                style={{
                  color: '#FFFFFF',
                  backgroundColor: 'var(--primary-color)',
                }}
                onClick={() => h.onSave(h.selectedAssetType, h.user.OrganizationId)}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
