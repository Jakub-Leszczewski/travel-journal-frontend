import React from 'react';
import './FriendButton.css';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { IconButton } from '../common/IconButton/IconButton';

interface Props {
  friendshipId: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  to?: string;
  onClick: (friendshipId: string) => void;
  bootstrapIcon: string;
}

export function FriendButton({
  friendshipId, firstName, lastName, username, avatar, onClick, bootstrapIcon, to,
}: Props) {
  return (
    <div className="FriendButton">
      <Link to={to ?? '#'}>
        <div className="FriendButton__container-right">
          <UserAvatar
            imageUrl={avatar}
            alt={`${firstName} ${lastName}-avatar`}
          />

          <div className="FriendButton__name-container">
            <p className="FriendButton__name">{`${firstName} ${lastName}`}</p>
            <p className="FriendButton__username">{username}</p>
          </div>
        </div>
      </Link>

      <div className="FriendButton__container-right">
        <IconButton
          bootstrapIcon={bootstrapIcon}
          onClick={() => onClick(friendshipId)}
        />
      </div>
    </div>
  );
}
