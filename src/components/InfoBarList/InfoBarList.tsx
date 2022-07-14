import React from 'react';
import './InfoBarList.css';
import { InfoBar } from '../InfoBar/InfoBar';

interface Props {
  info: {
    text: string;
    bootstrapIconName: string;
  }[];
}

export function InfoBarList({ info }: Props) {
  return (
    <div className="InfoBarList">
      {
        info.map((e, i) => (
          <InfoBar
            key={i}
            text={e.text}
            bootstrapIconName={e.bootstrapIconName}
          />
        ))
      }
    </div>
  );
}
