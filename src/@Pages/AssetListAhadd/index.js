/* eslint-disable object-curly-newline */
import { useState, useEffect } from 'react';
import MainContentContainer from '@Components/MainContentContainer';
import { Box } from '@material-ui/core';
import Button from '@Components/Button';
import DeleteDialog from '@Components/DeleteDialog';
import WarningDialog from '@Components/WarningDialog';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AddOutlined } from '@material-ui/icons';
import NoData from '@Assets/Images/Data-not-found3.png';
import DialogCarousel from '@Components/DialogCarousel';
import RelativeDialog from '@Components/RelativeDialog';
import SearchBox from '@Components/SearchBox/v2';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import Dropdown from './components/Dropdown';
import useHook from './hook';
import AssetListContent from './components/AssetListContent';
import SortDropdown from './components/SortDropdown';

const titleStyle = {
  fontWeight: 600,
  fontSize: 28,
  color: 'var(--dark-blue-color)',
};

export default function AssetList({ user, closeTour }) {
  const history = useHistory();
  const location = useLocation();
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

  return (
    <MainContentContainer style={{ minHeight: '85vh' }}>
      <div style={{ minHeight: '40rem', width: '100%' }}>
        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
          <h1
            className="my-auto pb-2"
            style={titleStyle}
          >
            Asset List
          </h1>
          <Box className="my-2 d-flex justify-content-center align-items-center">
            {/* <DialogCarousel
              title="How to Add Asset"
              name="asset_create"
            /> */}
            <SearchBox onChange={(e) => h.handleSearch(e)} style={{ transform: 'scale(0.85) translate(5%,0)' }} />
            <SortDropdown onChange={(e) => h.handleSortBy(e)} />
            <Button
              variant="contained"
              style={{
                color: '#FFFFFF',
                borderRadius: 30,
                background: 'linear-gradient(var(--main-color), var(--primary-color))',
                width: '10rem',
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
          </Box>
        </div>
        <div className="d-flex">
          {[
            { selected: h.selectedRegion, setSelected: h.setSelectedRegion, data: h.regions, title: 'Region' },
            { selected: h.selectedNetwork, setSelected: h.setSelectedNetwork, data: h.networks, title: 'Network' },
            { selected: h.selectedSection, setSelected: h.setSelectedSection, data: h.sections, title: 'Section' },
            { selected: h.selectedRanking, setSelected: h.setSelectedRanking, data: h.rankings, title: 'Ranking' },
          ].map(m => <Dropdown {...m} />)}
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
