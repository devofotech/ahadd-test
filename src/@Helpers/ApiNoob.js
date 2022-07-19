const Api = ({
  endpoint,
  query,
  method,
  onSuccess = () => null,
  onFail = () => null,
}) => {
  let data;

  fetch(endpoint + encodeURI(query))
    .then(response => response.json())
    .then(({ data }) => onSuccess(data))
    .catch(error => onFail(error));

  return data;
};

export default Api;
