import React, { useState } from 'react';
import './FriendButton.css';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { IconButton } from '../common/IconButton/IconButton';
import { WhiteButton } from '../common/WhiteButton/WhiteButton';

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
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const removeFriendHandler = () => {
    setIsConfirm(true);
  };

  const cancelFriendHandler = () => {
    setIsConfirm(false);
  };

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
        <IconButton
          bootstrapIcon={bootstrapIcon}
          onClick={removeFriendHandler}
        />
      </div>

      {
        isConfirm && (
        <div className="FriendButton__confirm-remove">
          <WhiteButton onClick={() => onClick(friendshipId)}>Tak</WhiteButton>
          <WhiteButton onClick={cancelFriendHandler}>Nie</WhiteButton>
        </div>
        )
      }
    </div>
  );
}
