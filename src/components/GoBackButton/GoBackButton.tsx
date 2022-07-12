import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GoBackButton.css';

interface Props {
  to: string;
}

export function GoBackButton({ to }: Props) {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(to);
  };

  return (
    <button type="button" className="GoBackButton" onClick={goBackHandler}>
      <i className="bi bi-arrow-left-short" />
    </button>
  );
}
