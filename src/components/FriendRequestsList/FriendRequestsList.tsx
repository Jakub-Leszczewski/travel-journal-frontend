import React from 'react';
import './FriendRequestsList.css';
import { FriendButton } from '../FriendButton/FriendButton';
import { FriendRequestButton } from '../FriendRequestButton/FriendRequestButton';

export function FriendRequestsList() {
  return (
    <div className="FriendRequestsList">
      <h3>Zaproszenia:</h3>
      <div className="FriendRequestsList__container">
        <FriendRequestButton />
        <FriendRequestButton />
        <FriendRequestButton />
      </div>

      <br />

      <h3>Wysłane zaproszenia:</h3>
      <div className="FriendRequestsList__container">
        <FriendButton />
        <FriendButton />
        <FriendButton />
      </div>
    </div>
  );
}
