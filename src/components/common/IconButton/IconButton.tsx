import React from 'react';
import './IconButton.css';

interface Props {
  onClick?: () => void;
  bootstrapIcon: string;
}

export function IconButton({ onClick, bootstrapIcon }: Props) {
  return (
    <button
      onClick={onClick}
      className="IconButton"
    >
      <i className={bootstrapIcon} />
    </button>
  );
}
