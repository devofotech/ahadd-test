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
import tokenIcon from '@Assets/Images/RaiseToken-shadow.png';
import plus_ahadd from '@Assets/Images/plus_ahadd.svg';
import {
  Dashboard, MapView, AssetList, Analytic, AboutUs,
} from '@Assets/Icons/topbarIcon';
import { db } from '@Configs/firebase';
import { truncateString } from '@Helpers';
import { ref, onChildAdded } from 'firebase/database';
import Avatar from './Avatar';
import ActivityLog from './ActivityLog';

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

  const topbarStyle = {
    zIndex: 99,
    backgroundColor: 'white',
    // backdropFilter: 'blur(10px)',
  };
  // if (!props.isProjectSite) topbarStyle = {};
  const iconColor = (selectedNav) => (selectedNav ? '#0061aa' : '#8b95ab');
  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justify="space-between"
      alignItems="center"
      className="topbar navbar-text"
      style={{ ...topbarStyle }}
    >
      <Link to="/" style={{ zIndex: 100 }}>
        <img src={plus_ahadd} height={35} style={{ marginTop: -5 }} />
      </Link>
      <div>
        <Grid
          container
          item
          // justify='flex-end'
          alignItems="center"
          className="d-flex flex-row"
          style={{ cursor: 'pointer', flexWrap: 'nowrap' }}
        >

          <Grid
            container
            item
            xs={12}
            justify="flex-end"
            alignItems="center"
          >
            {[
              {
                roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
                // link: '/dashboard/analytic',
                selected: '/dashboard',
                icon: (e) => <Dashboard color={iconColor(e)} />,
                title: 'Dashboard',
                page_access: true,
                tourId: 'dashboard',
              },
              {
                roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
                link: '/project',
                icon: (e) => <MapView color={iconColor(e)} />,
                title: 'Map',
                page_access: true,
                tourId: 'map_view',
              },
              {
                roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
                link: '/asset/',
                icon: (e) => <AssetList color={iconColor(e)} />,
                title: 'Asset List',
                page_access: true,
                tourId: 'asset_list',
              },
              {
                roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
                link: '/analytics',
                icon: (e) => <Analytic color={iconColor(e)} />,
                title: 'Analytics',
                page_access: true,
              },
              {
                roles: ['developer', 'organization_admin', 'asset_manager', 'user'],
                link: '/about-us',
                icon: (e) => <AboutUs color={iconColor(e)} />,
                title: 'About Us',
                page_access: true,
              },
            ].map(nav => !!nav.page_access && (
              <Link to={nav.link}>
                <Grid
                  item
                  container
                  alignItems="center"
                  style={{ marginLeft: '2rem', marginRight: '0.5rem' }}
                >
                  <span className="mx-1 mr-2" style={{ opacity: path.includes(nav.selected ?? nav.link) ? 1 : 0.8 }}>
                    {nav.icon(path.includes(nav.selected ?? nav.link))}
                  </span>
                  <h6
                    className={path.includes(nav.selected ?? nav.link)
                      ? 'color-secondary shadow-selected mt-1'
                      : 'color-tertiary shadow-unselected mt-1'}
                    data-tut={nav.tourId}
                    style={{ fontWeight: 600 }}
                  >
                    {nav.title}
                  </h6>
                </Grid>
              </Link>
            ))}
          </Grid>
          <div className="mr-4 ml-3">
            {/* <Badge badgeContent={hasRead ? 0 : activityLog.data?.length} color="secondary" onClick={(e) => handleClickNotification(e)}>
              <Notifications onClick={(e) => handleClickNotification(e)} style={{ backgroundColor: 'primary' }} data-tut="notification" />
            </Badge> */}
          </div>
          <div
            className="d-flex flex-row flex-standard"
            style={{ cursor: 'pointer', zIndex: 99999, minWidth: 'fit-content' }}
          >
            <Avatar {...props} />
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--dark-blue-color)' }} className="mb-0 navbar-text">
              {truncateString(props.name?.split(' ').slice(0, 2).join(' '), 15)}
            </p>
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
                <div className="mr-2 navbar-text" style={{ color: 'var(--dark-blue-color)' }}>{props.name?.split(' ').slice(0, 2).join(' ')}</div>
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
              {/* {[1].includes(props.RoleId) && (
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
              </Link> */}
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
