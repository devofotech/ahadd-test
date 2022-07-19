import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

const SearchTextField = styled(TextField)(() => ({
  transform: 'scale(0.8)',
  marginLeft: -25,
  '& fieldset': {
    borderRadius: '30px',
  },
}));

export default function SearchBox({
  onChange, onKeyDown = () => null, onClick = () => null, hasOnClick = false, label = 'Search',
}) {
  const SearchIcon = () => (
    hasOnClick
      ? <IconButton onClick={onClick}><Search /></IconButton>
      : <IconButton style={{ pointerEvents: 'none' }}><Search /></IconButton>
  );
  return (
    <SearchTextField
      label={label}
      size="small"
      variant="outlined"
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
