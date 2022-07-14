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
  addFriendHandler: (id: string) => void;
}

export function AddFriendButton({
  id, firstName, lastName, username, avatar, addFriendHandler,
}: Props) {
  return (
    <div className="AddFriendButton">
      <Link to="/profile">
        <div className="AddFriendButton__container-right">
          <UserAvatar
            imageUrl={avatar}
            alt={`${firstName} ${lastName}`}
          />

          <div className="AddFriendButton__name-container">
            <p className="AddFriendButton__name">{`${firstName} ${lastName}`}</p>
            <p className="AddFriendButton__username">{username}</p>
          </div>
        </div>
      </Link>

      <div className="AddFriendButton__container-right">
        <IconButton bootstrapIcon="bi bi-person-plus-fill" onClick={() => addFriendHandler(id)} />
      </div>
    </div>
  );
}
