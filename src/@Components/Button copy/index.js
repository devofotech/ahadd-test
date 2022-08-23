import {
  Button,
} from '@material-ui/core';

export default (props) => {
  let color = {
    color: 'white',
    background: 'linear-gradient(var(--main-color), var(--primary-color))',
  };
  if (props.variant === 'text') color = {};
  if (props.disabled) {
    color = {color: 'white', backgroundColor: 'grey'};
  }

  return (
    <Button
      {...props}
      style={{
        fontFamily: 'CeraProRegular',
        ...color,
        ...props.style,
      }}
      variant={props.disabled && 'contained'}
    >
      {props.children}
    </Button>
  );
};
