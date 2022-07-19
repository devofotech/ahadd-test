import React from 'react';
import { Link } from 'react-router-dom';
import { primaryColor } from '@Assets/css/index';

export default function RoundedButton({ scrollTop = false, scrollTo, onClick = () => null, ...props }) {
  const toTop = () => scrollTop && document.getElementById(scrollTo).scrollIntoView({ behavior: 'smooth' });
  return (
    <Link
      to={props.disabled || props.to}
      onClick={() => { toTop(); onClick(); }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
          cursor: 'pointer',
        }}
        onClick={() => (props.onClick ? props.onClick() : null)}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: '100%',
            background: props.disabled ? 'rgba(128,128,128,0.1)' : primaryColor,
            height: 24,
            width: 24,
          }}
        >
          {props.disabled && <text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>Coming Soon</text>}
          {props.children}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: 'rgba(30,52,101,0.65)',
            }}
          >
            {props.text}
          </p>
        </div>
      </div>
    </Link>
  );
}
