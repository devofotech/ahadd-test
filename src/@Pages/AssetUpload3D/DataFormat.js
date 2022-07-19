import Button from '@Components/Button';
import { Grid } from '@material-ui/core';
import mapping_3d from '@Assets/Images/mapping_3d.png';
import MapIcon from '@material-ui/icons/Map';
import Radio from '@Components/Radio';
import raise_coin from '@Assets/Icons/icon_raise_coin.png';

export default (h) => {
  return (
    <Grid item xs={8} direction="row" alignItems="center" justify="center" className="mx-auto">
      <img src={mapping_3d} width="100%" className="mb-3" />
      <h2>3D</h2>
      <h3 className="text-dark mt-4">
        <MapIcon /> Input Data Format
      </h3>
      <Radio
        items={h.radios_options}
        value={h.outputType}
        onChange={(e) => h.setOutputType(Number(e.target.value))}
        icon={!h.isOrgUnlimited && <img src={raise_coin} width="25" />}
      />
      <div className="d-flex justify-content-end">
        <Button variant="text" onClick={h.handleBackStep}>
          PREVIOUS
        </Button>
        <Button onClick={h.handleNextStep} disabled={!h.outputType}>
          NEXT
        </Button>
      </div>
    </Grid>
  );
};
