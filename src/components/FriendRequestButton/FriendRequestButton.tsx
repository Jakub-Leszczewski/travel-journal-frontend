import React from 'react';
import './FriendRequestButton.css';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { IconButton } from '../common/IconButton/IconButton';

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
}

export function FriendRequestButton() {
  return (
    <div className="FriendRequestButton">
      <Link to="/profile">
        <div className="FriendRequestButton__container-right">
          <UserAvatar
            imageUrl="/user.png"
            alt="abc"
          />

          <div className="FriendRequestButton__name-container">
            <p className="FriendRequestButton__name">Jan Kowalski</p>
            <p className="FriendRequestButton__username">ezter</p>
          </div>
        </div>
      </Link>

      <div className="FriendRequestButton__container-right">
        <IconButton bootstrapIcon="bi bi-person-check-fill" />
        <IconButton bootstrapIcon="bi bi-person-x-fill" />
      </div>
    </div>
  );
}
