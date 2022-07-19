import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook() {
  const [modules, setModules] = useState([]);
  const [assetType, setAssetType] = useState([]);
  const [phase, setPhase] = useState([]);
  const [parameterList, setParameterList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelected, setIsLoadingSelected] = useState(false);

  const getModules = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getModules(),
      onSuccess: ({ data }) => { setModules(data); setIsLoading(false); },
      onFail: () => toast('error', 'Error getting modules data. Please try again later.'),
    });
  };

  const getStatisticData = () => {
    setIsLoadingSelected(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setAssetType(data.AssetType.reduce((a, b) => { a[b.id] = b.name; return a; }, {}));
        setPhase(data.projectphase.reduce((a, b) => { a[b.id] = b.name; return a; }, {}));
        setIsLoadingSelected(false);
      },
      onFail: () => toast('error', 'Error getting data. Please try again later.'),
    });
  };

  const getAllParameters = () => {
    setIsLoadingSelected(true);
    Api({
      endpoint: endpoints.getParameters(),
      onSuccess: ({ data }) => setParameterList(_.groupBy(data, 'ModuleId')),
      onFail: () => toast('error', 'Error getting data. Please try again later.'),
    });
  };

  useEffect(() => {
    getModules();
    getStatisticData();
    getAllParameters();
  }, []);

  return {
    modules,
    assetType,
    phase,
    parameterList,
    isLoading,
    isLoadingSelected,
  };
}
