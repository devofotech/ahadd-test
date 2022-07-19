import React from 'react';
import {
  Dialog, DialogActions, DialogContent, Button, DialogTitle, Avatar,
} from '@material-ui/core';
import { VisibilityOutlined } from '@material-ui/icons';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link, useHistory} from 'react-router-dom';

export default function index(props) {
  const history = useHistory();
  console.log(props.workflowAccess)
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <Dialog
        open={props.openRelative}
        onClose={() => props.setOpenRelative(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle><h3>{props.selectedAsset?.name} Asset Access</h3></DialogTitle>
        <DialogContent className="mx-3">
          <div className="hide-scroll" style={{ maxHeight: '20em', overflowY: 'scroll' }}>
            {props?.workflowAccess?.map(w => (
              <div className="d-flex justify-content-between align-items-center my-2">
                <div className="d-flex align-items-center">
                  <Avatar
                    alt={w.name}
                    src={`${process.env.REACT_APP_S3}/${w?.image}`}
                    style={{ backgroundColor: w.colour ? w.colour : '#506288', borderRadius: '8px' }}
                  />
                  <p className="ml-2">{w.name}</p>
                </div>
                {props.user.raise_role === 'organization_admin' && (
                  <Link to={`/workflow/${w.id}`}>
                    <Button size="small" style={{ backgroundColor: '#fff', color: 'var(--primary-color)', border: '2px solid var(--primary-color)' }}>
                      <VisibilityOutlined />&nbsp;&nbsp;View
                    </Button>
                  </Link>
                )}
              </div>
            ))}
            {props?.teamAccess?.map(t => (
              <div className="d-flex justify-content-between align-items-center my-2">
                <div className="d-flex align-items-center">
                  <Avatar alt={t.name} src={`${process.env.REACT_APP_S3}/${t?.image}`} style={{ backgroundColor: `#${t.colour ? t.colour : 506288}` }} />
                  <p className="ml-2">{t.name}</p>
                </div>
                {props.user.raise_role === 'organization_admin' && (
                  <Button
                    size="small"
                    style={{ backgroundColor: '#fff', color: 'var(--primary-color)', border: '2px solid var(--primary-color)' }}
                    onClick={() => history.push('/analysis-management?view=team')}
                  >
                    <VisibilityOutlined />&nbsp;&nbsp;View
                  </Button>
                )}
              </div>
            ))}
            {props?.userAccess?.map(u => (
              <div className="d-flex justify-content-between align-items-center my-2">
                <div className="d-flex align-items-center">
                  <Avatar
                    alt={u.name}
                    src={`${process.env.REACT_APP_S3}/${u?.image}`}
                    style={{ backgroundColor: u.colour ? u.colour : '#506288' }}
                  />
                  <p className="ml-2">{u.name}</p>
                </div>
                {props.user.raise_role === 'organization_admin' && (
                  <Link to={`/user/${u.id}`}>
                    <Button size="small" style={{ backgroundColor: '#fff', color: 'var(--primary-color)', border: '2px solid var(--primary-color)' }}>
                      <VisibilityOutlined />&nbsp;&nbsp;View
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }} onClick={() => props.setOpenRelative(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>

  );
}

const getMuiTheme = () => createMuiTheme({
  typography: {
    fontFamily: 'CeraProRegular',
  },
});
