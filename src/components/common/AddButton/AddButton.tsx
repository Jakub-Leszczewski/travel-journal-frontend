import React from 'react';
import './AddButton.css';

interface Props {
  onClick?: () => void;
}

export function AddButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="AddButton"
    >
      <i className="bi bi-plus" />
    </button>
  );
}
