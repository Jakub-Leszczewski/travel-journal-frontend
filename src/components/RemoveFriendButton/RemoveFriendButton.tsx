import React, { useState } from 'react';
import './RemoveFriendButton.css';
import { WhiteButton } from '../common/WhiteButton/WhiteButton';
import { FriendButton } from '../FriendButton/FriendButton';

interface Props {
  friendshipId: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  to?: string;
  onClick: (friendshipId: string) => void;
}

export function RemoveFriendButton({
  friendshipId, firstName, lastName, username, avatar, onClick, to,
}: Props) {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const removeFriendHandler = () => {
    setIsConfirm(true);
  };

  const cancelFriendHandler = () => {
    setIsConfirm(false);
  };

  return (
    <div className="RemoveFriendButton">
      <FriendButton
        to={to}
        friendshipId={friendshipId}
        firstName={firstName}
        lastName={lastName}
        username={username}
        avatar={avatar}
        onClick={removeFriendHandler}
        bootstrapIcon="bi bi-person-x-fill"
      />

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
