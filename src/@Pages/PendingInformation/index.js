import { Grid, Typography } from '@material-ui/core';
import signup from '@Assets/Images/signup.png';
import useHook from './hook';
import RequiredInfoForm from './form';

export default (props) => {
  const h = useHook(props);
  return (
    <Grid container>
      <LogoArea />
      <RequiredInfoForm {...h} />
    </Grid>
  );
};

const LogoArea = () => {
  return (
    <Grid container item xs={6} style={{ border: '1px solid #ced4da', padding: '7rem' }} className="flex-standard" direction="column">
      <Typography variant="h5" gutterBottom className="text-center color-active font-weight-bold text-wrap w-100">
        Various device, various outputs, ONE data platform
      </Typography>
      <br /><img src={signup} /><br />
      <Typography variant="h4" style={{ fontSize: 15 }} className="text-justify color-active">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Typography>
    </Grid>
  );
};
