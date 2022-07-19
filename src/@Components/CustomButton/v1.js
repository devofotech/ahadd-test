import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    marginLeft: 10,
    padding: '4px 10px',
    borderWidth: 2,
    fontWeight: 500,
    textTransform: 'none',
    minWidth: 0,
  },
  contained: {
    backgroundColor: 'var(--primary-color)',
    borderColor: 'var(--primary-color)',
    color: '#FFF',
    fontFamily: 'Poppins',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'var(--primary-color)',
      borderColor: 'var(--primary-color)',
      color: '#FFF',
      opacity: 0.75,
    },
    '&:disabled': {
      backgroundColor: '#03A398',
      borderColor: '#03A398',
      color: '#FFF',
      opacity: 0.25,
    },
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: '#03A398',
    color: '#03A398',
    fontFamily: 'Poppins',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#03A398',
      color: '#03A398',
      opacity: 0.75,
    },
    '&:disabled': {
      borderColor: '#9f9f9f',
      color: '#9f9f9f',
      borderWidth: 2,
      opacity: 0.75,
    },
  },
};

export default withStyles(styles)(Button);
