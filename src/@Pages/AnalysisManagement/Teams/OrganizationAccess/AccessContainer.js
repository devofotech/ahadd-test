import React from 'react';
import HighlightTabs from '@Components/HighlightTabs';
import {
  Grid, InputAdornment,
  TextField, IconButton, Tooltip, Switch, CircularProgress,
} from '@material-ui/core';
import { Search, FilterList } from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';
import FilterIcon from '@Assets/Icons/filter-solid.svg';
import _ from 'lodash';
import { capitalize } from '@Helpers';

const SearchBox = styled(TextField)(() => ({
  transform: 'scale(0.8)',
  marginLeft: -25,
  '& fieldset': {
    borderRadius: '30px',
  },
}));

export default (h) => {
  const tabslist = [
    { label: 'Page Access', value: '0' },
  ];
  if (!h.team.WorkflowTeams.length) {
    tabslist.push({ label: 'Asset Access', value: '1' });
  }
  const toggleSwitchAsset = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...h.selectedAsset, Number(event.target.value)]);
      h.setSelectedAsset(data);
      h.updateTeam({ assets: data.join(',') });
      return;
    }
    data = h.selectedAsset.filter(u => u !== Number(event.target.value));
    h.setSelectedAsset(data);
    h.updateTeam({ assets: data.join(',') });
  };

  const toggleSwitchPage = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...h.selectedPage, Number(event.target.value)]);
      h.setSelectedPage(data);
      h.updateTeam({ page_access: data.join(',') });
      return;
    }
    data = h.selectedPage.filter(u => u !== Number(event.target.value));
    h.setSelectedPage(data);
    h.updateTeam({ page_access: data.join(',') });
  };
  const pageAccessGroup = _.groupBy(h.pageAccessList, x => x.group);

  return (
    <Grid item xs={12} direction="row" className="h-100 px-3">
      <HighlightTabs
        items={tabslist}
        tab={h.accessTypeTab}
        setTab={h.setAccessTypeTab}
        customStyle={{
          fontSize: '15px', minWidth: '50%', minHeight: '20px',
        }}
      />
      <div className="d-flex align-items-center justify-content-between mb-2">
        <SearchBox
          label="Search"
          size="small"
          variant="outlined"
          onChange={(e) => h.setSearchKey(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton style={{ pointerEvents: 'none' }}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="d-flex align-items-end align-items-center">
          <Tooltip title="Filter (Coming Soon)">
            <img src={FilterIcon} style={{ padding: '15px 10px 10px 0px', cursor: 'pointer', width: '15px' }} />
          </Tooltip>
          <IconButton>
            <FilterList />
          </IconButton>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <p className="text-secondary" style={{ fontSize: 14 }}>
          {{ 0: 'PAGE', 1: 'ASSET' }[h.accessTypeTab]}
        </p>
        <p className="text-secondary" style={{ fontSize: 14 }}>ACCESS</p>
      </div>
      <div className="hide-scroll" style={{ height: '25rem', overflowY: 'scroll' }}>
        {h.accessTypeTab === '0'
          ? (
            <>
              {h.isLoadingPageAccess && (
                <div className="position-relative" style={{ height: '20rem' }}>
                  <CircularProgress
                    className="position-absolute"
                    style={{
                      top: '50%', left: '50%', marginTop: -20, marginLeft: -18, color: 'var(--primary-color)',
                    }}
                  />
                </div>
              )}
              {
                Object.keys(pageAccessGroup).map(title => (
                  [
                    <div className="d-flex justify-content-between mb-2 mt-3"><p>{capitalize(title)}</p><p><IOSSwitch /></p></div>,
                    pageAccessGroup[title].map(eachPage => (
                      <div className="d-flex justify-content-between">
                        <p className="ml-4 mt-1">{eachPage?.label}</p>
                        <p><IOSSwitch value={eachPage.id} checked={!!h.selectedPage.includes(eachPage.id)} onChange={toggleSwitchPage} /></p>
                      </div>
                    )),
                  ]
                ))
              }
            </>
          )
          : (
            <>
              {h.isLoadingAssetAccess && (<CircularProgress style={{ color: 'var(--primary-color)' }} />)}
              {h.assetAccessList.map(eachAsset => (
                <div className="d-flex justify-content-between mt-2">
                  <p className="mt-1">{eachAsset.name}</p>
                  <p><IOSSwitch value={eachAsset.id} checked={!!h.selectedAsset.includes(eachAsset.id)} onChange={toggleSwitchAsset} /></p>
                </div>
              ))}

            </>
          )}
      </div>
    </Grid>
  );
};

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#04847C',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? 'grey' : 'lightgrey',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
