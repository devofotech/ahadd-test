import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

const UrlQueries = () => {
  const location = useLocation();
  const history = useHistory();
  const url_queries = queryString.parse(location.search);
  const set_url_queries = (obj, is_reset) => {
    const q = queryString.stringify(is_reset ? obj : { ...url_queries, ...obj });
    history.push(`${location.pathname}?${q}`);
  };

  return {
    url_queries,
    set_url_queries,
    location,
  };
};

export default UrlQueries;
