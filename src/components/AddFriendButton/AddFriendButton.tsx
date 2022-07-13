import React from 'react';
import './AddFriendButton.css';
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

export function AddFriendButton() {
  return (
    <div className="AddFriendButton">
      <Link to="/profile">
        <div className="AddFriendButton__container-right">
          <UserAvatar
            imageUrl="/user.png"
            alt="abc"
          />

          <div className="AddFriendButton__name-container">
            <p className="AddFriendButton__name">Jan Kowalski</p>
            <p className="AddFriendButton__username">ezter</p>
          </div>
        </div>
      </Link>

      <div className="AddFriendButton__container-right">
        <IconButton bootstrapIcon="bi bi-person-plus-fill" />
      </div>
    </div>
  );
}
