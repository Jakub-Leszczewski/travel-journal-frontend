import React from 'react';
import './TravelView.css';
import { useParams } from 'react-router-dom';

export function TravelView() {
  const params = useParams();
  return (
    <main>
      {params.id}
    </main>
  );
}
