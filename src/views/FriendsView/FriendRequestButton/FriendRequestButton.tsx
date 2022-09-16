import React from 'react';
import './FriendRequestButton.css';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../../../components/UserAvatar/UserAvatar';
import { IconButton } from '../../../components/common/IconButton/IconButton';

interface Props {
  friendshipId: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  removeFriendHandler: (friendshipId: string) => void;
  acceptFriendHandler: (friendshipId: string) => void;
}

export function FriendRequestButton({
  friendshipId, firstName, lastName, username, avatar, removeFriendHandler, acceptFriendHandler,
}: Props) {
  return (
    <div className="FriendRequestButton">
      <Link to="/profile">
        <div className="FriendRequestButton__container-right">
          <UserAvatar
            imageUrl={avatar}
            alt={`${firstName} ${lastName}`}
          />

          <div className="FriendRequestButton__name-container">
            <p className="FriendRequestButton__name">{`${firstName} ${lastName}`}</p>
            <p className="FriendRequestButton__username">{username}</p>
          </div>
        </div>
      </Link>

      <div className="FriendRequestButton__container-right">
        <IconButton
          bootstrapIcon="bi bi-person-check-fill"
          onClick={() => acceptFriendHandler(friendshipId)}
        />

        <IconButton
          bootstrapIcon="bi bi-person-x-fill"
          onClick={() => removeFriendHandler(friendshipId)}
        />
      </div>
    </div>
  );
}
