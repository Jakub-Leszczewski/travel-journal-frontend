import React from 'react';
import './MenuButton.css';

interface Props {
  onClick?: () => void;
  bootstrapIcon?: string;
  children: React.ReactNode;
}

export function MenuButton({ onClick, bootstrapIcon, children }: Props) {
  return (
    <button
      className="MenuButton"
      onClick={onClick}
      type="button"
    >
      {bootstrapIcon && <i className={bootstrapIcon} />}
      {children}
    </button>
  );
}
