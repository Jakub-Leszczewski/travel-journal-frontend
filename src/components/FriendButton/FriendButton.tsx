import React from 'react';
import './FriendButton.css';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../UserAvatar/UserAvatar';

interface Props {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  to?: string;
  children: React.ReactNode;
}

export function FriendButton({
  firstName, lastName, username, avatar, to, children,
}: Props) {
  return (
    <div className="FriendButton">
      <Link to={to ?? '#'}>
        <div className="FriendButton__container-right">
          <UserAvatar
            imageUrl={avatar}
            alt={`${firstName} ${lastName}`}
          />

          <div className="FriendButton__name-container">
            <p className="FriendButton__name">{`${firstName} ${lastName}`}</p>
            <p className="FriendButton__username">{username}</p>
          </div>
        </div>
      </Link>

      <div className="FriendButton__container-right">
        {children}
      </div>
    </div>
  );
}
