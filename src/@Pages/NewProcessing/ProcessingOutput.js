import Button from '@Components/Button';
import HighlightTabs from '@Components/HighlightTabs';
import { Grid } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import Checkbox from '@Components/Checkbox';
import _ from 'lodash';

export default (h) => {
  const radios_options = h.radio_options.filter(x => x.tab === Number(h.image_type_tab));
  const output_with_layername = h.output.filter(eachOutput => !!h.outputName[Number(eachOutput)]);
  return (
    <Grid item xs={8} direction="row" alignItems="center" justify="center" className="mx-auto" style={{ minHeight: '60vh' }}>
      <HighlightTabs
        items={h.tabslist}
        tab={h.image_type_tab}
        setTab={h.set_image_type_tab}
        customStyle={{
          fontSize: '20px', minWidth: `${100 / h.tabslist.length}%`, minHeight: '20px',
        }}
      />
      <img src={radios_options[0].img} width="100%" className="my-3" />
      <h2>{radios_options[0].title}</h2>
      <h3 className="text-dark mt-4">
        <MapIcon /> Output
      </h3>
      <Checkbox
        withTextInput
        items={radios_options}
        value={h.output}
        onChange={e => {
          if (e.target.checked) {
            const tempOut = [...h.output];
            tempOut.push(Number(e.target.value));
            h.setOutput(_.uniq(tempOut));
          } else {
            const tempOut = [...h.output];
            const remItems = _.remove(tempOut, (n) => n === Number(e.target.value));
            h.setOutput(tempOut);
          }
        }}
        textValue={h.outputName}
        textInputOnChange={e => h.setOutputName(prev => ({ ...prev, [Number(e.target.getAttribute('data-id'))]: e.target.value }))}
      />
      <div className="d-flex justify-content-end" style={{ gap: 10 }}>
        <Button variant="text" onClick={h.handleBackStep}>
          PREVIOUS
        </Button>
        <Button onClick={h.handleNextStep} disabled={!h.output.length || output_with_layername.length < h.output.length}>
          NEXT
        </Button>
      </div>
    </Grid>
  );
};
