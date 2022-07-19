import { Grid } from '@material-ui/core';
import CenteredLoading from '@Components/CenteredLoading';
import AnnotateImage from './AnnotateImage';
import NoDataInterface from './NoDataInterface';

export default function MainWorkspace(props) {
  return (
    <div className="paper shadow overflow-auto hide-scroll" style={{ maxHeight: '60vh', minHeight: '60vh' }}>
      <Grid container spacing={3}>
        {props.isLoading && (
          <CenteredLoading style={{
            position: 'absolute', height: '62vh', width: '72vw', backgroundColor: '#000000b3', zIndex: 2,
          }}
          />
        )}
        <Grid item xs={12} style={{ maxHeight: '60vh', minHeight: '60vh' }}>
          {props.tab === 0 && (props.images.length > 0
            ? <AnnotateImage {...props} />
            : <NoDataInterface />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
