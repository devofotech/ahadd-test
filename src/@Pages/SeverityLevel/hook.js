import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import _ from 'lodash';

const initInput = [];

export default (props) => {
  const [input, setInput] = useState(initInput);
  const [selectedAssetType, setSelectedAssetType] = useState();
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [defaultSeverityGroup, setDefaultSeverityGroup] = useState([]);
  const [severityGroup, setSeverityGroup] = useState({});
  const [accesibleAssetTypes, setAccesibleAssetTypes] = useState([]);
  const [justSaved, setJustSaved] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openPicker, setOpenPicker] = useState({});

  const getStaticData = (OrgId) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data: { AssetType, severity } }) => {
        setAssetTypeList(AssetType);
        setDefaultSeverityGroup(severity.filter(x => x.OrganizationId === null && x.AssetTypeId === null));
        const svGrp = _.groupBy(severity.filter(x => x.OrganizationId === OrgId), x => x.AssetTypeId);
        setSeverityGroup(svGrp);
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
    getStaticData(props.user.OrganizationId);
    getOrganizationAsset(props.user.OrganizationId);
  }, [props.user]);

  const handleChange = (event) => {
    setInput(prev => {
      if (!prev[event.selection]) {
        prev[event.selection] = {
          OrganizationId: event.organizationId,
        };
      }
      prev[event.selection][event.target.name] = event.target.value;
      prev[event.selection].OrganizationId = event.organizationId;
      return [...prev];
    });
  };

  const onSave = (assetTypeId, organizationId) => {
    const data = input.map((f, sequence_id) => (f ? { ...f, sequence_id } : null)).filter(f => f);
    if (!organizationId) return;
    if (!input.length) return;
    Api({
      endpoint: endpoints.createSeverity(assetTypeId),
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
    defaultSeverityGroup,
    severityGroup,
    accesibleAssetTypes,
    selectedAssetType,
    setSelectedAssetType,
    handleChange,
    onSave,
    isLoading,
    openPicker,
    setOpenPicker,
  };
};
