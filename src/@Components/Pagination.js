import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: 'var(--primary-color)',
      borderColor: 'var(--primary-color)',
    },
    '& .Mui-selected': {
      color: 'white !important ',
      backgroundColor: 'var(--primary-color)',
    },
  },
}));

export default (h) => {
  const classes = useStyles();
  return (
    <Pagination
      variant="outlined"
      classes={classes}
      className="d-flex justify-content-end mx-3"
      count={Math.ceil(h.totalData / h.perpage)}
      page={parseInt(h.page)}
      onChange={(_, v) => { h.setPage(v); }}
    />
  );
};
