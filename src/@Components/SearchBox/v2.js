import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

const SearchTextField = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '30px',
  },
}));

export default function SearchBox({
  onChange, onKeyDown = () => null, onClick = () => null, hasOnClick = false, label = 'Search', style,
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
      style={{ ...style }}
    />
  );
}
