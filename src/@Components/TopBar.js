/* eslint-disable complexity */
/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import {
  ExpandMore, Notifications, AllInclusive, NavigateBeforeSharp, HelpOutline,
} from '@material-ui/icons';
import { useRouteMatch, Link } from 'react-router-dom';
import {
  Grid, Menu, MenuItem, Drawer, Box, Badge, Popover, Button, IconButton, Tooltip,
} from '@material-ui/core';
import { decimalNumberFormat, tokenFormatter } from '@Helpers';
import {
  DashboardIcon, MapIcon, BuildingIcon, HRIcon, MarketingIcon, BellIcon, ProjectSiteIcon,
} from '@Assets/Icons/TopbarIcons';
import tokenIcon from '@Assets/Images/RaiseToken-shadow.png';
import logo_raise from '@Assets/Images/georaise-logo.svg';
import { db } from '@Configs/firebase';
import { ref, onChildAdded } from 'firebase/database';
import Avatar from './Avatar';
import ActivityLog from './ActivityLog';
import CoinWallet from './CoinWallet';

export default function TopBar(props) {
  const { path } = useRouteMatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNotification, setAnchorNotification] = useState(null);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [activityLog, setActivityLog] = useState({});
  const [hasRead, setHasRead] = useState(false);
  const [isLogUpdated, setIsLogUpdated] = useState(0);
  const isOrgUnlimited = !!props?.['Organization.StoreStorage.is_token_unlimited'];
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    props.setDisabledActions(false);
  };
  const handleCloseMenu = () => setAnchorEl(null);
  const handleClickNotification = (e) => {
    setShowActivityLog(true);
    setAnchorNotification(e.currentTarget);
  };
  const hanldeCloseNotification = (e) => {
    setHasRead(true);
    setShowActivityLog(false);
    setAnchorNotification(null);
  };

  useEffect(() => {
    const notificationsRef = ref(db, 'notifications');
    onChildAdded(notificationsRef, () => setIsLogUpdated(prev => prev + 1));
  }, []);

  useEffect(() => {
    const delay = 350;
    let timer;
    if (props.currentStep === 8) {
      setAnchorEl(null);
    } else if (anchorEl === null && props.currentStep > 6) {
      props.setCurrentStep(0);
    } else if (anchorEl !== null) {
      timer = setTimeout(
        () => props.setCurrentStep(7),
        delay,
      );
    } else if (props.currentStep === 6) {
      setAnchorEl(null);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [props.currentStep, anchorEl]);

  let projectSiteStyle = {
    zIndex: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  };
  if (!props.isProjectSite) projectSiteStyle = {};
  return (
    <Grid container item xs={12} direction="row" justify="space-between" alignItems="center" className="topbar navbar-text" style={{ ...projectSiteStyle }}>
      <Link to="/" style={{ zIndex: 100 }}>
        <img src={logo_raise} height={25} />
      </Link>
      <Grid container item xs={12} justify="center" alignItems="center" className="position-absolute">
        {[
          {
            roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
            link: '/project',
            icon: <ProjectSiteIcon />,
            title: 'Map View',
            page_access: true,
            tourId: 'map_view',
          },
          {
            roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
            link: '/dashboard/analytic',
            selected: '/dashboard',
            icon: <DashboardIcon />,
            title: 'Dashboard',
            page_access: props.can_view_dashboard,
            tourId: 'dashboard',
          },
          {
            roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
            link: '/asset/',
            icon: <BuildingIcon />,
            title: 'Asset List',
            page_access: props.can_view_asset,
            tourId: 'asset_list',
          },
          {
            roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
            link: '/mapping-list',
            icon: <BuildingIcon />,
            title: 'Geo Processing',
            page_access: props.can_view_mapping_list,
            tourId: 'geo_processing',
          },
          {
            roles: ['developer'],
            link: '/mapping-processing',
            icon: <BuildingIcon />,
            title: 'GIS Processing',
            page_access: ['processing'].includes(props.raise_role),
          },
          {
            roles: ['developer'],
            link: '/assetfile-conversion',
            icon: <BuildingIcon />,
            title: 'Asset File Conversion',
            page_access: ['processing'].includes(props.raise_role),
          },
        ].map(nav => !!nav.page_access && (
          <Link to={nav.link}>
            <Grid
              item
              container
              alignItems="center"
              className="mx-4"
            >
              <h6
                className={path.includes(nav.selected ?? nav.link)
                  ? `color-secondary ${props.isProjectSite ? 'shadow-selected' : ''}`
                  : `color-tertiary ${props.isProjectSite ? 'shadow-unselected' : ''}`}
                data-tut={nav.tourId}
              >
                {/* <span className="mx-1" style={{ opacity: path.includes(nav.selected ?? nav.link) ? 1 : 0.4 }}>
                  {nav.icon}
                </span> */}
                {nav.title}
              </h6>
            </Grid>
          </Link>
        ))}
      </Grid>
      <div>
        <Grid
          container
          item
          // justify='flex-end'
          alignItems="center"
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex align-items-center">
            {props.isProjectSite && (
              <Tooltip title="View Guide">
                <IconButton disableRipple style={{ backgroundColor: 'transparent', padding: 0, marginRight: 10 }}>
                  <HelpOutline onClick={() => props.setIsOpen(true)} color="disabled" />
                </IconButton>
              </Tooltip>
            )}
            {/* {!isOrgUnlimited
              && (
                <div data-tut="token">
                  <CoinWallet isOrgUnlimited={isOrgUnlimited} />
                </div>
              )} */}
          </div>
          &nbsp;&nbsp;&nbsp;
          {!!props.can_see_activity_log && (
            <div className="mr-4">
              <Badge badgeContent={hasRead ? 0 : activityLog.data?.length} color="secondary" onClick={(e) => handleClickNotification(e)}>
                <Notifications onClick={(e) => handleClickNotification(e)} style={{ backgroundColor: 'primary' }} data-tut="notification" />
              </Badge>
            </div>
          )}
          <Avatar {...props} />
          <div style={{ cursor: 'pointer', zIndex: 99999 }} onClick={handleClickMenu}>
            <p style={{ fontSize: 16, fontWeight: 600 }} className="mb-0 navbar-text">{props.name?.split(' ').slice(0, 2).join(' ')}</p>
            <ExpandMore onBlur={handleCloseMenu} onClick={handleClickMenu} data-tut="dropdown_icon" />
          </div>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <div data-tut="dropdown_topbar" style={{ marginBottom: -5, marginTop: -2 }}>
              <MenuItem disabled className="d-flex justify-content-between">
                <div className="mr-2 navbar-text">{props.name?.split(' ').slice(0, 2).join(' ')}</div>
              </MenuItem>
              {/* {!!props.can_view_admin_panel && (
              <Link to="/admin-panel">
                <MenuItem className="py-0">
                  <span className="color-primary navbar-text">Admin Panel</span>
                </MenuItem>
              </Link>
            )} */}
              {/* {!!props.can_view_asset_files && (
              <Link to="/asset-file-list">
                <MenuItem className="py-0">
                  <span className="color-primary navbar-text">Asset Files</span>
                </MenuItem>
              </Link>
            )} */}
              {[1].includes(props.RoleId) && (
                <Link to="/data-mining">
                  <MenuItem className="py-0">
                    <span className="color-primary navbar-text">Data Mining</span>
                  </MenuItem>
                </Link>
              )}
              {!!props.can_view_storage_analysis && (
                <Link to="/storage-analysis">
                  <MenuItem className="py-0">
                    <span className="color-primary navbar-text">Storage Analysis</span>
                  </MenuItem>
                </Link>
              )}
              {(!isOrgUnlimited && !!props.can_view_transaction_history) && (
                <Link to="/transaction-overview">
                  <MenuItem>
                    <span className="color-primary navbar-text">Transaction Overview</span>
                  </MenuItem>
                </Link>
              )}
              {[1, 2].includes(props.RoleId) && (
                <Link to="/user">
                  <MenuItem className="py-0">
                    <span className="color-primary navbar-text">User Management</span>
                  </MenuItem>
                </Link>
              )}
              {!!props.can_view_storage_monitoring && (
                <Link to="/storage-monitoring">
                  <MenuItem>
                    <span className="color-primary navbar-text">Storage Monitoring</span>
                  </MenuItem>
                </Link>
              )}
              {[2].includes(props.RoleId) && (
                <Link to="/analysis-management">
                  <MenuItem>
                    <span className="color-primary navbar-text">Analysis Management</span>
                  </MenuItem>
                </Link>
              )}
              {[2].includes(props.RoleId) && (
                <Link to="/module-management">
                  <MenuItem>
                    <span className="color-primary navbar-text">Annotation Management</span>
                  </MenuItem>
                </Link>
              )}
              {props.raise_role === 'monitoring' && (
                <Link to="/organization-summary">
                  <MenuItem>
                    <span className="color-primary navbar-text">Organization Summary</span>
                  </MenuItem>
                </Link>
              )}
              <Link to="/profile-page">
                <MenuItem className="py-0">
                  <span className="color-primary navbar-text">Profile Page</span>
                </MenuItem>
              </Link>
              <Link to="/logout">
                <MenuItem className="py-0">
                  <span className="color-primary navbar-text">Logout</span>
                </MenuItem>
              </Link>
            </div>
          </Menu>
        </Grid>
      </div>
      {showActivityLog && (
        <Popover
          open={Boolean(anchorNotification)}
          anchorEl={anchorNotification}
          onClose={hanldeCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <ActivityLog />
        </Popover>
      )}

    </Grid>
  );
}
