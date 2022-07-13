import React from 'react';
import './UserInfo.css';
import { InfoBar } from '../InfoBar/InfoBar';

interface Props {
  info: {
    text: string;
    bootstrapIconName: string;
  }[];
}

export function UserInfo({ info }: Props) {
  return (
    <div className="UserInfo">
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
