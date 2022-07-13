import React from 'react';
import './FriendsList.css';
import { FriendButton } from '../FriendButton/FriendButton';

export function FriendsList() {
  return (
    <div className="FriendsList">
      <FriendButton />
      <FriendButton />
      <FriendButton />
    </div>
  );
}
