import React from 'react';
import './UserAvatar.css';

interface Props {
  imageUrl: string;
  alt: string;
}

export function UserAvatar({ imageUrl, alt }: Props) {
  return (
    <div className="UserAvatar">
      <img src={imageUrl || '/user.png'} alt={alt} />
    </div>
  );
}
