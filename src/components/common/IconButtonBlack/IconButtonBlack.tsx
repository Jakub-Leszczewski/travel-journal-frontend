import React from 'react';
import './IconButtonBlack.css';

interface Props {
  onClick: () => void;
  bootstrapIcon: string;
}

export function IconButtonBlack({ onClick, bootstrapIcon }: Props) {
  return (
    <button
      type="button"
      className="IconButtonBlack"
      onClick={onClick}
    >
      <i className={bootstrapIcon} />
    </button>
  );
}
