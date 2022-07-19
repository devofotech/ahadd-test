import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { InputBase, CircularProgress, IconButton } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    height: 30,
  },
  results: {
    width: 200,
    marginTop: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [search_keyword, set_search_keyword] = useState('');
  const [results, set_results] = useState([]);
  const [is_loading, set_is_loading] = useState(false);

  const onButtonClick = () => {
    if (is_loading || !search_keyword) return;

    if (results.length) {
      set_results([]);
      set_search_keyword('');
      return;
    }
    set_is_loading(true);
    fetch(`https://nominatim.openstreetmap.org/search.php?q=${search_keyword}&polygon_geojson=1&format=jsonv2&countrycodes=my`)
      .then(r => r.json())
      .then((response) => {
        set_is_loading(false);
        response.forEach(r => {
          let gps;
          if (Array.isArray(r.geojson.coordinates[0])) {
            [[gps]] = r.geojson.coordinates;
          } else {
            gps = r.geojson.coordinates;
          }

          const lat = gps[1];
          const lng = gps[0];
          r.firstGPS = [lat, lng];
        });
        set_results(response.slice(0, 3));
      })
      .catch((error) => {
        set_is_loading(false);
        console.error(error);
      });
  };

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      onButtonClick();
    } else {
      set_results([]);
    }
  };

  return (
    <div>
      <Paper className={classes.search}>
        <InputBase
          disabled={is_loading}
          className={classes.input}
          placeholder={t('common.search')}
          value={search_keyword}
          onKeyDown={onKeyDown}
          onChange={e => set_search_keyword(e.target.value)}
        />

        <IconButton onClick={onButtonClick} className={classes.iconButton}>
          {is_loading && <CircularProgress size={15} />}
          {!is_loading && !!results.length && <Close />}
          {!is_loading && !results.length && <Search />}
        </IconButton>

      </Paper>
      <Paper className={classes.results}>
        {results.map(r => (
          <div
            onClick={() => props.changeFocus(r.firstGPS, 18)}
            className="ripple p-2 pointer"
          >{r.display_name}
          </div>
        ))}
      </Paper>
    </div>
  );
};
