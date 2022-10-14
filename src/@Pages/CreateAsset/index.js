import React, { useEffect } from 'react'
import MainContentNavbar from '@Components/MainContentNavbar';
import MainContentContainer from '@Components/MainContentContainer';
import Step from './Step';
import useHook from './hook';
import AssetType from './AssetType';
import CreateAssetForm from './CreateAssetForm';
import Preview from './Preview';
import PreviewAfter from './PreviewAfter';

export default () => {
  const h = useHook();
  return (
    <MainContentContainer style={{ minHeight: '90vh' }}>
      <MainContentNavbar text="Add New Asset" />
      <Step {...h} />
      {{
        0: <AssetType {...h} />,
        1: <CreateAssetForm {...h} />,
        2: <Preview {...h} />,
        3: <PreviewAfter {...h} />,
      }[h.activeStep]}
    </MainContentContainer>
  );
};
