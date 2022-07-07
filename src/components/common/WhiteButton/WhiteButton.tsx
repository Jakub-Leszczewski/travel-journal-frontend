import React from 'react';
import './WhiteButton.css';

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export function WhiteButton({ children, onClick, type }: Props) {
  return (
    <button
      className="WhiteButton"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
