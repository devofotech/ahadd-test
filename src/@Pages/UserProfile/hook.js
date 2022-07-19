import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useParams } from 'react-router-dom';
import { searchItems } from '@Helpers';

export default () => {
  const { user_id } = useParams();
  const [user, setUser] = useState({});
  const [team, setTeam] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [pageAccessList, setPageAccessList] = useState([]);
  const [assetAccessList, setAssetAccessList] = useState([]);
  const [selectedPage, setSelectedPage] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingActivityLog, setIsLoadingActivityLog] = useState(false);
  const [isLoadingPageAccess, setIsLoadingPageAccess] = useState(false);
  const [isLoadingAssetAccess, setIsLoadingAssetAccess] = useState(false);
  const [accessTypeTab, setAccessTypeTab] = useState('0');
  const [expanded, setExpanded] = useState(false);
  const [allPageAccessList, setAllPageAccessList] = useState([]);
  const [allAssetAccessList, setAllAssetAccessList] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const getUser = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getProfile(),
      data: { id: user_id },
      onSuccess: ({ data }) => {
        setIsLoading(false);
        setUser(data);
      },
      onFail: () => { toast('error', 'Failed get user data'); },
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

  const getActivityLog = () => {
    setIsLoadingActivityLog(true);
    Api({
      endpoint: endpoints.activityLog(),
      data: { UserId: user_id },
      onSuccess: ({ data }) => {
        setIsLoadingActivityLog(false);
        setActivityLog(data);
      },
      onFail: () => { toast('error', 'Failed get activity log data'); },
    });
  };

  const getTeam = () => {
    Api({
      endpoint: endpoints.getTeam(user.TeamId),
      onSuccess: ({ data }) => setTeam(data),
      onFail: () => { toast('error', 'Failed get team data'); },
    });
  };

  useEffect(() => {
    if (!user_id) return;
    getUser();
    getActivityLog();
    getPageAccessList();
    getAssetAccessList();
  }, []);

  useEffect(() => {
    if (!user_id) return;
    if (!user.TeamId) return;
    getTeam();
  }, [user]);

  useEffect(() => {
    if (!user.page_access || !pageAccessList.length) return;
    setSelectedPage(user.page_access?.split(',').map(x => Number(x)));
  }, [user, pageAccessList]);

  useEffect(() => {
    if (!user.AssetAccesses?.length || !assetAccessList.length) return;
    setSelectedAsset(user.AssetAccesses.map(x => x.AssetId));
  }, [user, assetAccessList]);

  const updateUser = (data, photo) => {
    setIsLoadingSave(true);
    Api({
      endpoint: endpoints.updateUser(user_id),
      data,
      files: photo,
      onSuccess: () => {
        setIsLoadingSave(false);
        getUser();
        toast('success', 'Update user successful');
      },
      onFail: () => { toast('error', 'Failed update user'); },
    });
  };

  const updateAssetAccess = (AssetsId) => {
    setIsLoadingSave(true);
    Api({
      endpoint: endpoints.updateAssetAccess(),
      data: { UserId: user_id, AssetsId },
      onSuccess: () => {
        setIsLoadingSave(false);
        getUser();
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
    user,
    team,
    activityLog,
    isLoading,
    isLoadingActivityLog,
    getUser,
    pageAccessList,
    assetAccessList,
    selectedPage,
    setSelectedPage,
    selectedAsset,
    setSelectedAsset,
    updateUser,
    updateAssetAccess,
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
