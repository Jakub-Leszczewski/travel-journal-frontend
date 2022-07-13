import React from 'react';
import './FoundFriendsList.css';
import { AddFriendButton } from '../AddFriendButton/AddFriendButton';

export function FoundFriendsList() {
  return (
    <div className="FoundFriendsList">
      <div className="FoundFriendsList__container">
        <AddFriendButton />
        <AddFriendButton />
        <AddFriendButton />
      </div>
    </div>
  );
}
