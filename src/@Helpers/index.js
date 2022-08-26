/* eslint-disable no-nested-ternary */
import moment from 'moment';
import pluralize from 'pluralize';
import _ from 'lodash';

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const multiKeysFilter = (filters) => (arr) => !Object.keys(filters).map(filter => arr[filter] === filters[filter]).includes(false);

export const formatTime = (unix, format) => moment.unix(unix / 1000).format(format);

export const getDates = (time) => moment(time, 'x').format('D');

export const changeDayToIndex = (day) => {
  const graphFirstDay = moment().subtract(30, 'days').startOf('day').valueOf();
  day = parseInt(day);
  const today = moment().format('D');
  const gFirstDay = getDates(graphFirstDay);
  const lastMonthTotalDays = parseInt(moment(graphFirstDay).clone().endOf('month').format('D'));

  const dayToIndex = day - gFirstDay + 1;
  return (day > today) ? dayToIndex : dayToIndex + lastMonthTotalDays;
};

export const initialsFromUser = (user) => {
  const str = user.name || user.email;
  if (!str) return '';
  return str
    .replace(/[^0-9a-z ]/gi, '')
    .split(' ')
    ?.map((i) => i.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const MoneyFormat = (labelValue) => {
  const num = Math.abs(Number(labelValue));
  return num >= 1.0e+9
    ? `${num / 1.0e+9}B`
    : num >= 1.0e+6
      ? `${num / 1.0e+6}M`
      : num >= 1.0e+3
        ? `${num / 1.0e+3}K`
        : num;
};

export const capitalize = ([firstLetter, ...restOfWord]) => firstLetter.toUpperCase() + restOfWord.join('');

export const pluralizer = (word, counter, withText) => (withText ? pluralize(word, counter, true) : pluralize(word, counter));

export const spaceAfterUppercase = (word) => word.replace(/([A-Z])/g, ' $1').trim();

export const groupByYear = (obj) => _.groupBy(obj, e => e.YEAR);

export const groupByYearAndMonth = (obj) => {
  const res = groupByYear(obj);
  _.forEach(res, (value, key) => {
    res[key] = _.groupBy(res[key], item => item.MONTH);
  });
  return res;
};

export const markerToString = (marker) => (marker && marker.lat && marker.lng ? `${marker.lat},${marker.lng}` : null);
export const polygonToString = (polygon) => (!!polygon ? JSON.stringify(polygon) : 'No Coordinate');
export const stringToMarker = (string) => {
  const temp = string.replace(/\s/g, '', '').split(',');
  return { lat: parseFloat(temp[0]), lng: parseFloat(temp[1]) };
};

export const today = moment().format('YYYY-MM-DD');

export const todayDateTime = moment().format('YYYY-MM-DDThh:mm');

export const formatBytes = (bytes, withLabel = true, decimals = 1) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / (k ** i)).toFixed(dm))}${withLabel ? ` ${sizes[i]}` : ''}`;
};

export const decimalNumberFormat = new Intl.NumberFormat('en-US');
export const sumBy = (arr, fn) => arr
  .map(typeof fn === 'function' ? fn : val => val[fn])
  .reduce((acc, val) => acc + val, 0);

export const searchItems = (arr, keys, query) => _.filter(arr, (o) => {
  const ifAny = keys.map((attr, idx) => (query[idx] === 'all'
    ? true
    : String(o[attr]).toLowerCase().indexOf(String(query[idx]).toLowerCase()) !== -1));
  return ifAny.filter(Boolean).length === keys.length;
});

export const getTrueInObject = (arr) => {
  const keys = Object.keys(arr);
  const result = keys.filter((key) => arr[key]);
  return result;
};

export const numberWithCommas = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const tokenFormatter = (token) => {
  if (token >= 1.0e6 || token <= -1.0e6) {
    return (`${token / 1.0e+6 }M`);
  }
  return decimalNumberFormat.format(token);
};

export const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (e) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const truncateString = (str, num) => {
  if (!str) return;
  if (num > str.length) {
    return str;
  }
  str = str.substring(0, num);
  return `${str} ...`;
};

export const getOpenCaseFromInspection = insp => ({
  ...insp,
  open_case: !insp.InspectionFiles.length ? 0
    : insp.InspectionFiles.map(insp_file => (!insp_file.Annotations.length ? 0
      : insp_file.Annotations.filter(ann => !ann.is_compliance && !ann.is_close).length)).reduce((a, b) => (a + b), 0),
  has_non_compliance: !insp.InspectionFiles.length ? 0
    : insp.InspectionFiles.map(insp_file => (!insp_file.Annotations.length ? 0
      : insp_file.Annotations.filter(ann => !ann.is_compliance).length)).reduce((a, b) => (a + b), 0),
});

export const truncateFilenameString = (str, num) => {
  if (!str) return;
  const maxString = num || 30;
  if (maxString > str.length) {
    return str;
  }
  const getCalcStr = Math.round(maxString * (2 / 3));
  const firstString = str.substring(0, getCalcStr);
  const secondString = str.substring(str.length - getCalcStr, str.length);
  return `${firstString}....${secondString}`;
};

export const isMimeVideo = (mimetype) => {
  switch (mimetype) {
    case 'image/jpeg':
    case 'image/gif':
    case 'image/jpg':
    case 'image/png':
    case 'image/undefined':
      return false;
    default:
      return true;
  }
};

export const moduleSettings = (settings, settingstype) => settings?.includes(settingstype);

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const arrayRearrange = (arr, fromIndex, toIndex) => {
  if (!arr.length) return;
  const tempArr = [...arr];
  const element = tempArr[fromIndex];
  if (!element) return tempArr;
  tempArr.splice(fromIndex, 1);
  tempArr.splice(toIndex, 0, element);
  return tempArr;
};

export const checkExtension = (arr, name) => arr.some(element => name.endsWith(element));
