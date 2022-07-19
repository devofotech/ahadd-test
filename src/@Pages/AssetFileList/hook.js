import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useParams } from 'react-router-dom';

export default () => {
  const { asset_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [totalData, setTotalData] = useState(100);
  const [perpage, setPerpage] = useState(30);
  const [page, setPage] = useState(1);
  const [assets, setAssets] = useState([]);
  const [phases, setPhases] = useState([]);
  const [assetFile, setAssetFile] = useState([]);
  const getAssetList = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        setAssets(data);
        getAssetFile();
      },
      onFail: () => toast('error', 'Error getting assets data. Please try again later.'),
    });
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setPhases(data.projectphase);
      },
      onFail: (err) => toast('error', err),
    });
  };
  const getAssetFile = () => {
    setIsLoading(true);
    Api({
      endpoint: asset_id ? endpoints.getAssetFileById(asset_id) : endpoints.getAssetFile(),
      data: {
        perpage, page, sortby: 'createdAt,DESC', keyword,
      },
      onSuccess: (res) => {
        setIsLoading(false);
        setAssetFile(res.data);
        setTotalData(res.total);
      },
      onFail: () => {
        toast('error', 'Failed get asset files');
      },
    });
  };

  const switchChange = (e) => {
    const asset_file_id = e.target.getAttribute('data-id');
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateAssetFile(asset_file_id),
      data: { is_show: e.target.checked },
      onSuccess: () => {
        toast('success', 'Asset file updated successfully');
        getAssetFile();
      },
      onFail: (err) => {
        toast('error', `Failed to update asset file: ${err.toString()}`);
      },
    });
  };

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') getAssetFile();
  };

  useEffect(() => {
    getAssetList();
  }, [page]);

  return {
    assets,
    phases,
    onKeyDown,
    switchChange,
    keyword,
    setKeyword,
    getAssetFile,
    assetFile,
    isLoading,
    setIsLoading,
    perpage,
    page,
    setPage,
    totalData,
    asset_id,
  };
};
