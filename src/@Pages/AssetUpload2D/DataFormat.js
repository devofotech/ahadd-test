import Button from '@Components/Button';
import HighlightTabs from '@Components/HighlightTabs';
import { Grid } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import Radio from '@Components/Radio';
import raise_coin from '@Assets/Icons/icon_raise_coin.png';

export default (h) => {
  const radios_options = h.radio_options.filter(x => x.tab === Number(h.image_type_tab));
  return (
    <Grid item xs={8} direction="row" alignItems="center" justify="center" className="mx-auto">
      <HighlightTabs
        items={h.tabslist}
        tab={h.image_type_tab}
        setTab={h.set_image_type_tab}
        customStyle={{
          fontSize: '25px', minWidth: '50%', minHeight: '20px',
        }}
      />
      <img src={radios_options[0].img} width="100%" className="mb-3" />
      <h2>{radios_options[0].title}</h2>
      <h3 className="text-dark mt-4">
        <MapIcon /> Input Data Format
      </h3>
      <Radio
        items={radios_options}
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
