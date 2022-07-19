import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [pageAccessList, setPageAccessList] = useState({});
  const [assetAccessList, setAssetAccessList] = useState({});
  const [roles, setRoles] = useState({});
  const [totalData, setTotalData] = useState(100);
  const [perpage, setPerpage] = useState(30);
  const [page, setPage] = useState(1);
  const [roleStatus, setRoleStatus] = useState({
    dash_Adm: true,
    dash_Asset: true,
    dash_User: true,
    buy_token_Adm: true,
    view_trans_Adm: true,
    master_storage_Adm: true,
    asset_storage_Adm: true,
    edit_asset_Adm: true,
    add_asset_Adm: true,
    edit_severity_Adm: true,
    manage_user_Adm: true,
    asset_storage_Asset: true,
    edit_asset_Asset: true,
    add_asset_Asset: true,
    edit_severity_User: true,
    edit_severity_Asset: true,
  });

  const handleChange = (event) => {
    setRoleStatus({ ...roleStatus, [event.target.name]: event.target.checked });
  };

  const getUsers = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getUsers(),
      data: {
        perpage, page, sortby: 'createdAt', keyword,
      },
      onSuccess: (res) => {
        setIsLoading(false);
        setUsers(res.data);
        setTotalData(res.total);
      },
      onFail: () => {
        toast('error', 'Failed get user');
      },
    });
  };

  const getStaticData = () => {
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data: { PageAccess, role } }) => {
        setRoles(role.reduce((a, b) => { a[b.id] = b.name; return a; }, {}));
        setPageAccessList(PageAccess.reduce((a, b) => { a[b.id] = b.name; return a; }, {}));
      },
    });
  };

  const getAssetList = () => {
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        setAssetAccessList(data.reduce((a, b) => { a[b.id] = b.name; return a; }, {}));
      },
    });
  };

  const getTeams = () => {
    Api({
      endpoint: endpoints.getTeams(),
      onSuccess: ({ data }) => setTeams(data),
      onFail: () => { toast('error', 'Failed get team data'); },
    });
  };

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') getUsers();
  };

  useEffect(() => {
    getStaticData();
    getAssetList();
    getTeams();
  }, []);

  useEffect(() => {
    getUsers();
  }, [page]);

  return {
    onKeyDown,
    keyword,
    setKeyword,
    getUsers,
    users,
    teams,
    isLoading,
    setIsLoading,
    perpage,
    page,
    setPage,
    totalData,
    pageAccessList,
    assetAccessList,
    roles,
    roleStatus,
    handleChange,
    roleTitle,
    roleCheckStatus,
  };
};

const roleTitle = [
  'Dashboard', 'Buy geoRÄISE token', 'View transaction history', 'Asset master storage',
  'Asset storage', 'Edit asset information', 'Add new asset', 'Edit severity level', 'Manage user',
];

const roleCheckStatus = [
  'dash_Adm', 'dash_Asset', 'dash_User',
  'buy_token_Adm', 'buy_token_Asset', 'buy_token_User',
  'view_trans_Adm', 'view_trans_Asset', 'view_trans_User',
  'master_storage_Adm', 'master_storage_Asset', 'master_storage_User',
  'asset_storage_Adm', 'asset_storage_Asset', 'asset_storage_User',
  'edit_asset_Adm', 'edit_asset_Asset', 'edit_asset_User',
  'add_asset_Adm', 'add_asset_Asset', 'add_asset_User',
  'edit_severity_Adm', 'edit_severity_Asset', 'edit_severity_User',
  'manage_user_Adm', 'manage_user_Asset', 'manage_user_User',
];
