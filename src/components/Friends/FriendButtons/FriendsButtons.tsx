import React from 'react';
import './FriendsButtons.css';
import { IconButton } from '../../common/IconButton/IconButton';

interface Props {
  goAddFriendsHandler: () => void;
  goFriendRequestsHandler: () => void;
  goFriendsHandler: () => void;
}

export function FriendsButtons({ goFriendRequestsHandler, goFriendsHandler, goAddFriendsHandler }: Props) {
  return (
    <div className="FriendsButtons">
      <IconButton bootstrapIcon="bi bi-people-fill" onClick={goFriendsHandler} />
      <IconButton bootstrapIcon="bi bi-envelope-check-fill" onClick={goFriendRequestsHandler} />
      <IconButton bootstrapIcon="bi bi-person-plus-fill" onClick={goAddFriendsHandler} />
    </div>
  );
}
