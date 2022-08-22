import React from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Chip, Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
}));

export default function FilterAssetTag(h) {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      {['All', ...h.tags]?.map(tag => (
        <Checkbox
          id="tags"
          onClick={e => {
            h.setTagsFilter(prev => (e.target.checked
              ? e.target.value == '' ? [''] : [...prev, e.target.value].filter(tg => tg != '')
              : prev.filter(eTags => eTags !== e.target.value)));
          }}
          classes={{ root: classes.root }}
          value={tag === 'All' ? '' : tag}
          checked={tag === 'All' ? (h.tagsFilter.includes('') || h.tagsFilter.length === 0) : h.tagsFilter.includes(tag)}
          icon={(
            <Chip
              label={tag}
              size="small"
              style={{
                backgroundColor: '#F6F6F6', color: 'var(--secondary-color)',
              }}
            />
          )}
          checkedIcon={(
            <Chip
              label={tag}
              size="small"
              style={{
                backgroundColor: 'var(--secondary-color)', color: '#F6F6F6',
              }}
            />
          )}
        />
      ))}
    </MuiThemeProvider>
  );
}

const getMuiTheme = () => createMuiTheme({
  typography: {
    fontFamily: 'CeraProRegular',
  },
});
