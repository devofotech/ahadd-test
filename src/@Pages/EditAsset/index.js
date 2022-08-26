import Button from '@Components/Button';
import { Grid } from '@material-ui/core';
import MainContentContainer from '@Components/MainContentContainer';
import MainContentNavbar from '@Components/MainContentNavbar';
import AssetCard from './Component/AssetCard';
import FormInput from './FormInput';
import useHook from './hook';

export default () => {
  const h = useHook();
  const isDisabled = !(!!h.name && !!h.region && !!h.ranking && !!h.network);
  return (
    <MainContentContainer style={{ minHeight: '90vh' }}>
      <MainContentNavbar text="Edit Asset Information" />
      <div className="mx-auto" style={{ width: '90%', background: 'linear-gradient(45deg, var(--primary-color), var(--main-color))', padding: 20, borderRadius: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <AssetCard {...h} data={h.selectedTypeProfile} view />
          </Grid>
          <Grid item xs={9}>
            <FormInput {...h} />
          </Grid>
        </Grid>
        <div className="d-flex justify-content-end mt-5" style={{ gap: 10 }}>
          <Button variant="text" onClick={h.handleBackStep}>
            PREVIOUS
          </Button>
          <Button disabled={isDisabled} onClick={h.handleNextStep}>
            SAVE CHANGES
          </Button>
        </div>
      </div>
    </MainContentContainer>
  );
};
