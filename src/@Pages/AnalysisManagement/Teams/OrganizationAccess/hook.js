import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { searchItems } from '@Helpers';

export default ({ id: team_id }) => {
  const [team, setTeam] = useState({});
  const [pageAccessList, setPageAccessList] = useState([]);
  const [assetAccessList, setAssetAccessList] = useState([]);
  const [selectedPage, setSelectedPage] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingPageAccess, setIsLoadingPageAccess] = useState(false);
  const [isLoadingAssetAccess, setIsLoadingAssetAccess] = useState(false);
  const [accessTypeTab, setAccessTypeTab] = useState('0');
  const [expanded, setExpanded] = useState(false);
  const [allPageAccessList, setAllPageAccessList] = useState([]);
  const [allAssetAccessList, setAllAssetAccessList] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const getTeam = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getTeam(team_id),
      onSuccess: ({ data }) => {
        setIsLoading(false);
        setTeam(data);
      },
      onFail: () => { toast('error', 'Failed get team data'); },
    });
  };

  const getPageAccessList = () => {
    setIsLoadingPageAccess(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data: { PageAccess } }) => {
        setPageAccessList(PageAccess);
        setAllPageAccessList(PageAccess);
        setIsLoadingPageAccess(false);
      },
      onFail: () => { toast('error', 'Failed get page access data'); },
    });
  };

  const getAssetAccessList = () => {
    setIsLoadingAssetAccess(true);
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        setAssetAccessList(data);
        setAllAssetAccessList(data);
        setIsLoadingAssetAccess(false);
      },
      onFail: () => { toast('error', 'Failed get asset access data'); },
    });
  };

  useEffect(() => {
    if (!team_id) return;
    getTeam();
    getPageAccessList();
    getAssetAccessList();
  }, []);

  useEffect(() => {
    if (!team.page_access || !pageAccessList.length) return;
    setSelectedPage(team.page_access?.split(',').map(x => Number(x)));
  }, [team, pageAccessList]);

  useEffect(() => {
    if (!team?.AssetAccesses?.length || !assetAccessList.length) return;
    setSelectedAsset(team.AssetAccesses.map(x => x.AssetId));
  }, [team, assetAccessList]);

  const updateTeam = (data) => {
    setIsLoadingSave(true);
    Api({
      endpoint: endpoints.updateTeam(team_id),
      data,
      onSuccess: () => {
        setIsLoadingSave(false);
        getTeam();
        toast('success', 'Update user successful');
      },
      onFail: () => { toast('error', 'Failed update user'); },
    });
  };

  useEffect(() => {
    const keys = ['name'];
    const values = [searchKey];
    const result = searchItems(allPageAccessList, keys, values);
    const result2 = searchItems(allAssetAccessList, keys, values);
    setPageAccessList(result);
    setAssetAccessList(result2);
  }, [searchKey]);

  return {
    team,
    isLoading,
    getTeam,
    pageAccessList,
    assetAccessList,
    selectedPage,
    setSelectedPage,
    selectedAsset,
    setSelectedAsset,
    updateTeam,
    isLoadingSave,
    isLoadingPageAccess,
    isLoadingAssetAccess,
    setIsLoadingAssetAccess,
    accessTypeTab,
    setAccessTypeTab,
    expanded,
    setExpanded,
    searchKey,
    setSearchKey,
  };
};
