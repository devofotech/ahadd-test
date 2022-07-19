/* eslint-disable complexity */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import _ from 'lodash';

export default (props) => {
  const [input, setInput] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState();
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [defaultIssueGroup, setDefaultIssueGroup] = useState([]);
  const [issueGroup, setIssueGroup] = useState({});
  const [accesibleAssetTypes, setAccesibleAssetTypes] = useState([]);
  const [justSaved, setJustSaved] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ open: false, close: false });
  const [nonRemove, setNonRemove] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false,
  });

  const getStaticData = (OrgId) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data: { AssetType, issue } }) => {
        setAssetTypeList(AssetType);
        setDefaultIssueGroup(issue.filter(x => x.OrganizationId === null && x.AssetTypeId === null));
        const svGrp = _.groupBy(issue.filter(x => x.OrganizationId === OrgId), x => x.AssetTypeId);
        setIssueGroup(svGrp);
        setIsLoading(false);
      },
    });
  };

  const getOrganizationAsset = (OrgId) => {
    if (!OrgId) return;
    Api({
      endpoint: endpoints.getOrganization(OrgId),
      onSuccess: ({ data }) => {
        setAccesibleAssetTypes(_.uniq(data.assets.map(x => x.AssetTypeId)));
      },
    });
  };

  useEffect(() => {
    if (!props.user) return;
    getStaticData(props.user?.OrganizationId);
    getOrganizationAsset(props.user?.OrganizationId);
  }, [props.user]);

  const handleChange = (event) => {
    const isEmpty = () => setNonRemove({ ...nonRemove, [event.selection]: true });
    setInput(prev => {
      if (!prev[event.selection]) {
        prev[event.selection] = {
          OrganizationId: event.organizationId,
        };
      }
      prev[event.selection].OrganizationId = event.organizationId;
      prev[event.selection][event.target.name] = (event.isFilled && event.target.value) === '' ? isEmpty() : event.target.value;
      prev[event.selection][event.target.sequence] = event.selection;
      return [...prev];
    });
  };

  const onSave = (assetTypeId, organizationId, isDefault) => {
    const data = input.filter(f => f && f.name !== '');
    const conditionalData = Object.keys(_.groupBy(data, 'sequence_id'));
    if (!organizationId) return;
    if (isDefault) {
      const hasOpen = conditionalData.includes('0');
      const hasClose = conditionalData.includes('4');
      if (!hasOpen && !hasClose) { setError({ open: true, close: true }); return; }
      if (!hasOpen) { setError({ ...error, open: true }); return; }
      if (!hasClose) { setError({ ...error, close: true }); return; }
    }
    const hasEmpty = _.includes(nonRemove, true);
    if (hasEmpty) return;
    if (!data.length) return;
    Api({
      endpoint: endpoints.createIssues(assetTypeId),
      data,
      onSuccess: () => {
        setJustSaved(justSaved + 1);
        setSelectedAssetType();
        getStaticData();
        getOrganizationAsset();
        toast('success', 'Asset type updated');
      },
      onFail: () => { toast('error', 'Something went wrong, please try again.'); },
    });
  };

  return {
    user: props.user,
    assetTypeList,
    defaultIssueGroup,
    issueGroup,
    accesibleAssetTypes,
    selectedAssetType,
    setSelectedAssetType,
    handleChange,
    onSave,
    isLoading,
    error,
    setError,
    nonRemove,
    setNonRemove,
  };
};
