import React, { useEffect } from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import { capitalize } from '@Helpers';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
    backgroundColor: 'var(--primary-color)',
    textWeight: 600,
    color: 'white',
    '& .MuiChip-deleteIcon': {
      color: 'var(--secondary-color)',
    },
  },
}));

export default function TagsInput({
  setSelectedTags, selectedTags, placeholder, tags = [], ...other
}) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState(!!selectedTags.length ? selectedTags.split(',') : []);
  useEffect(() => {
    if (!tags.length) return;
    setSelectedItem(tags);
  }, [tags]);

  useEffect(() => {
    if (!selectedItem.length);
    setSelectedTags(selectedItem.toString());
  }, [selectedItem, selectedTags]);

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim(),
      );

      if (duplicatedValues !== -1) {
        setInputValue('');
        return;
      }
      if (!event.target.value.replace(/\s/g, '').length) return;

      newSelectedItem.push(capitalize(event.target.value.trim()));
      setSelectedItem(newSelectedItem);
      setInputValue('');
    }
    if (
      selectedItem.length
      && !inputValue.length
      && event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('');
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const {
            onBlur, onChange, onFocus, ...inputProps
          } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
              <TextField
                size="small"
                InputProps={{
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      size="small"
                      label={item}
                      className={`${classes.chip} text-capitalize`}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: event => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
    </>
  );
}
