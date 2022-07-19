import React from 'react';
import {
  Grid, Box, Button,
} from '@material-ui/core';
import PaperCard from './Components/PaperCard';
import ColorForm from './Components/ColorForm';

export default function IssueStatusEdit(h) {
  const hasOriginalData = h.issueGroup[h.selectedAssetType];
  const selectedStatus = (idx) => hasOriginalData?.filter(f => f.sequence_id === idx)[0];
  return (
    <div style={{ minHeight: '80vh' }}>
      <h1 className="mx-3" style={{ fontSize: 14, color: '#000' }}>
        Define your inspection status from top being when it is issued and lowest when it is resolved or closed.&nbsp;
        Leave blank if you don&apos;t use up to 5 levels.
      </h1>
      <Box>
        <Grid sm={12} container spacing={3} className=" mt-2 d-flex justify-content-center ">
          <PaperCard
            assetType={h.assetTypeList.find(x => x.id === h.selectedAssetType)}
            originalIssue={h.issueGroup[h.selectedAssetType]}
            {...h}
          />
          <Grid xs={12} sm={7} item className="d-flex flex-column">
            <Grid spacing={3} container className="mb-0">
              <Grid xs={12} sm={6} item className="w-100">
                <h1 style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.75)' }}>Inspection Status</h1>
              </Grid>
            </Grid>
            {['1', '2', '3', '4', '5'].map((m, idx) => (
              <>
                <ColorForm
                  level={m}
                  onChange={h.handleChange}
                  index={idx}
                  defaultData={hasOriginalData?.length ? selectedStatus(idx) : null}
                  organizationId={h.user.OrganizationId}
                  isFilled={selectedStatus(idx)?.sequence_id === idx}
                  {...h}
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
                onClick={() => h.onSave(h.selectedAssetType, h.user.OrganizationId, !hasOriginalData?.length)}
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
