import { useState, useRef, useEffect } from 'react';
import MainContentContainer from '@Components/MainContentContainer';
import {
  Box, IconButton, Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, List, Tooltip, TextField,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import DeleteDialog from '@Components/DeleteDialog';
import WarningDialog from '@Components/WarningDialog';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  AddOutlined, ChevronLeft, ChevronRight, SettingsRemoteOutlined,
} from '@material-ui/icons';
import NoData from '@Assets/Images/Data-not-found3.png';
import DialogCarousel from '@Components/DialogCarousel';
import RelativeDialog from '@Components/RelativeDialog';
import { AssetFile } from '@Assets/Icons';
import SearchBox from '@Components/SearchBox/v2';
import AssetDemoButton from '@Components/AssetDemo';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import useHook from './hook';
import FilterAssetTag from './components/FilterAssetTag';
import ToggleButton from './components/ToggleButton';
import AssetListContent from './components/AssetListContent';
import SortDropdown from './components/SortDropdown';
import RegionDropdown from './components/RegionDropdown';
import NetworkDropdown from './components/NetworkDropdown';
import SectionDropdown from './components/SectionDropdown';
import RankingDropdown from './components/RankingDropdown';

const SeverityButton = styled(Button)(() => ({
  backgroundColor: '#FFF',
  color: 'var(--primary-color)',
  border: '2px solid var(--primary-color)',
  paddingBottom: '3px !important',
}));

const titleStyle = {
  fontWeight: 600,
  fontSize: 28,
  color: 'var(--primary-color)',
};

export default function AssetList({ user, closeTour }) {
  const history = useHistory();
  const location = useLocation();
  const ref = useRef(null);
  const h = useHook();
  const [openDialog, setOpenDialog] = useState(false);
  const createAsset = () => {
    if (h.projects.filter(e => !e.is_demo).length < user['Organization.AssetLimit']) return history.push('/create-asset');
    setOpenDialog(true);
  };

  useEffect(() => {
    if (location.pathname === '/asset') {
      closeTour();
    }
  }, [location.pathname]);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <MainContentContainer style={{ height: '100vh' }}>
      <div style={{ minHeight: '40rem', width: '100%' }}>
        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
          <h1
            className="my-auto pl-4 pb-2"
            style={titleStyle}
          >
            Asset List
          </h1>
          <Box className="my-2 d-flex justify-content-center align-items-center">
            <DialogCarousel
              title="How to Add Asset"
              name="asset_create"
            />
            <SearchBox onChange={(e) => h.handleSearch(e)} />
            <SortDropdown />
            {user?.can_add_asset && (
              <>
                <Button
                  variant="contained"
                  style={{
                    color: '#FFFFFF',
                    borderRadius: 30,
                    background: 'linear-gradient(var(--main-color), var(--primary-color))',
                    width: '10vw',
                  }}
                  onClick={() => createAsset()}
                >
                  <AddOutlined />
                  <p className="text-white">Add Asset</p>
                </Button>
                <WarningDialog
                  open={openDialog}
                  setOpen={setOpenDialog}
                  type="asset"
                  user={user}
                />
              </>
            )}
          </Box>
        </div>
        <div className="d-flex pl-4">
          <RegionDropdown />
          <NetworkDropdown />
          <SectionDropdown />
          <RankingDropdown />
        </div>
        <Box className="d-flex flex-wrap" style={{ margin: '20px -8px 0px' }}>
          <>
            {h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText text="assets" /> : (
              <>
                {!!h.projects?.length
                  ? <AssetListContent user={user} {...h} />
                  : (
                    <div className="d-flex justify-content-center w-100 m-4 p-5">
                      <img src={NoData} style={{ height: '55vh' }} />
                    </div>
                  )}
              </>
            )}
          </>
        </Box>
        <DeleteDialog
          open={h.open}
          setOpen={h.setOpen}
          selected={h.selectedAsset}
          setSelected={h.setSelectedAsset}
          deleteFunction={() => h.deleteAsset()}
        />
        <RelativeDialog {...h} user={user} />
      </div>
    </MainContentContainer>
  );
}

const CustomizePopover = (props) => {
  return (
    <>
      <SeverityButton className="mr-2" variant="outlined" ref={props.anchorRef} onClick={props.handleToggle}>
        <p>Customize</p>
      </SeverityButton>
      <Popper open={props.openCustomMenu} anchorEl={props.anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 999 }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={props.handleClose}>
                <MenuList autoFocusItem={props.openCustomMenu} id="menu-list-grow" onKeyDown={props.handleListKeyDown}>
                  {props.user?.can_edit_severity_level && <Link to="/severity-level"><MenuItem><p>Severity Level</p></MenuItem></Link>}
                  {props.user?.can_edit_issue_status && <Link to="/issue-status-level"><MenuItem><p>Inspection Status</p></MenuItem></Link>}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
