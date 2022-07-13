import React from 'react';
import './UserAvatar.css';

interface Props {
  imageUrl: string;
  alt: string;
  onClick?: () => void;
}

export function UserAvatar({ imageUrl, alt, onClick }: Props) {
  return (
    <div className="UserAvatar" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'initial' }}>
      <img src={imageUrl || '/user.png'} alt={alt} />
    </div>
  );
}
