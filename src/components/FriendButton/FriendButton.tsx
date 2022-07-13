import React from 'react';
import './FriendButton.css';
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

export function FriendButton() {
  return (
    <div className="FriendButton">
      <Link to="/profile">
        <div className="FriendButton__container-right">
          <UserAvatar
            imageUrl="/user.png"
            alt="abc"
          />

          <div className="FriendButton__name-container">
            <p className="FriendButton__name">Jan Kowalski</p>
            <p className="FriendButton__username">ezter</p>
          </div>
        </div>
      </Link>

      <div className="FriendButton__container-right">
        <IconButton bootstrapIcon="bi bi-person-x-fill" />
      </div>
    </div>
  );
}
