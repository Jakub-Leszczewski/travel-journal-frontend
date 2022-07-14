import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IconButtonBlack.css';

interface Props {
  onCLick: () => void;
  bootstrapIcon: string;
}

export function IconButtonBlack({ onCLick, bootstrapIcon }: Props) {
  return (
    <button type="button" className="GoBackButton" onClick={onCLick}>
      <i className={bootstrapIcon} />
    </button>
  );
}
