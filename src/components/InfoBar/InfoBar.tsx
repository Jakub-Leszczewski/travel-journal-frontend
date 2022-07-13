import React from 'react';
import './InfoBar.css';

interface Props {
  bootstrapIconName: string;
  text: string;
}

export function InfoBar({ bootstrapIconName, text }: Props) {
  return (
    <div className="InfoBar">
      <i className={bootstrapIconName} />
      <p>{text}</p>
    </div>
  );
}
