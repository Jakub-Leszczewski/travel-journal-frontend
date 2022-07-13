import React from 'react';
import './ViewTitle.css';

interface Props {
  children: React.ReactNode;
}

export function ViewTitle({ children }: Props) {
  return <h1 className="ViewTitle">{children}</h1>;
}
