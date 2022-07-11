import React from 'react';
import './WhiteButton.css';

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function WhiteButton({
  children, onClick, type, disabled,
}: Props) {
  return (
    <button
      disabled={disabled}
      className="WhiteButton"
      type={type ?? 'submit'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
