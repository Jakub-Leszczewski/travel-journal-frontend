import React from 'react';
import './ForbiddenWindow.css';
import { Link } from 'react-router-dom';
import { WhiteButton } from '../common/WhiteButton/WhiteButton';

export function ForbiddenWindow() {
  return (
    <div className="ForbiddenWindow__forbidden">
      <p>Brak dostępu do tych treść.</p>
      <Link to="/"><WhiteButton>Strona główna</WhiteButton></Link>
    </div>
  );
}
