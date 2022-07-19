import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, Grid, DialogActions, Paper,
} from '@material-ui/core';
import Button from '@Components/Button';
import AssetInformation from './AssetInformation';

export default function InfoDialog(h) {
  return (
    <>
      <Dialog
        open={h.openInfoDialog}
        onClose={() => h.setOpenInfoDialog(false)}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <p style={{ color: '#5b6272', fontWeight: 600 }}>{h.project?.name}</p>
          </div>
        </DialogTitle>
        <DialogContent className="position-relative">
          <div>
            <div>
              <p style={{ color: 'grey', fontWeight: 600, fontSize: 14 }}>Asset Description</p>
              {h.project?.description ? (
                <Paper
                  style={{
                    padding: 20, maxWidth: '100%', overflowWrap: 'anywhere', textAlign: 'justify', maxHeight: 250, overflowY: 'scroll',
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: h.project?.description }} />
                </Paper>
              ) : (
                <Paper
                  style={{
                    padding: 20, maxWidth: '100%', overflowWrap: 'anywhere', textAlign: 'justify', maxHeight: 250, overflowY: 'scroll',
                  }}
                >
                  <p className="font-italic">No description has been added for this asset</p>
                </Paper>
              )}
              <p style={{
                color: 'grey', fontWeight: 600, fontSize: 14, marginTop: 35,
              }}
              >Asset Information
              </p>
              <div className="d-flex" style={{ marginTop: 10 }}>
                <AssetInformation {...h} />
              </div>
              <p style={{
                color: 'grey', fontWeight: 600, fontSize: 14, marginTop: 35,
              }}
              >Annotation Module Parameter
              </p>
              <Grid container xs={12} spacing={3}>
                {h.modules.filter(r => h.moduleParameter[r.id]).map(m => (
                  <Grid item xs={6}>
                    <div className="d-flex mt-2">
                      <p style={{ color: 'black', fontSize: 10 }}>{m.name}</p>
                      <p style={{ color: 'black', fontSize: 10 }}>&nbsp;({h.moduleParameter[m.id].length})</p>
                    </div>
                    {h.moduleParameter[m.id].map(p => (
                      <p className="mt-2">{p.name}</p>
                    //   <p style={{ color: 'black', fontSize: 10 }}>({h.parameterList[m.id].filter(f => !!f.is_active).length})</p>
                    // </div>
                    // {h.parameterList[m.id].filter(f => !!f.is_active).map(p => (
                    //   <p className="mt-2">{p.label}</p>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            style={{ marginRight: 8, marginTop: 15, marginBottom: 15 }}
            onClick={() => h.setOpenInfoDialog(false)}
          >
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
