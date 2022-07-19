import { Grid, CircularProgress } from '@material-ui/core/';
import { SignUpForm } from './SignUpForm';
import ProductDetails from './ProductDetails';
import AccountCreated from './AccountCreated';
import useHook from './hook';

export default function CenteredGrid(props) {
  const h = useHook(props);
  if (h.isSuccessCreated) return <AccountCreated {...h} {...props} />;
  return (
    <Grid container>
      {h.isLoading
        ? (
          <CircularProgress
            size={75}
            className="position-absolute"
            style={{
              top: '50%', left: '50%', marginTop: -30, marginLeft: -40, color: 'var(--primary-color)',
            }}
          />
        )
        : (
          <>
            <ProductDetails product={h.selectedProduct} mode={h.mode} isLoading={h.isProductLoading} />
            <SignUpForm {...h} />
          </>
        )}
    </Grid>
  );
}
