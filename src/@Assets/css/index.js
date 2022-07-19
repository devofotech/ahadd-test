const r = document.querySelector(':root');
const rs = getComputedStyle(r);

const primaryColor = rs.getPropertyValue('--primary-color');
const secondaryColor = rs.getPropertyValue('--secondary-color');
const tertiaryColor = rs.getPropertyValue('--tertiary-color');
const containerColor = rs.getPropertyValue('--container-color');
const backgroundColor = rs.getPropertyValue('--background-color');

export {
  primaryColor,
  secondaryColor,
  tertiaryColor,
  containerColor,
  backgroundColor,
};
