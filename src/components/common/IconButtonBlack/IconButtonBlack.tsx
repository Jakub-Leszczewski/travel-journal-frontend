import React from 'react';
import './IconButtonBlack.css';

interface Props {
  onCLick: () => void;
  bootstrapIcon: string;
}

export function IconButtonBlack({ onCLick, bootstrapIcon }: Props) {
  return (
    <button
      type="button"
      className="IconButtonBlack"
      onClick={onCLick}
    >
      <i className={bootstrapIcon} />
    </button>
  );
}
