import React from 'react';

export default function MainContentContainer(props) {
  return <div className="main-content" style={{ ...props.style}}>{props.children}</div>;
}
