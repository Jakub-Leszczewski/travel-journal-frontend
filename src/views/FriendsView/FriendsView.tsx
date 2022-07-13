import React, {
} from 'react';
import './FriendsView.css';
import { useNavigate } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { useUser } from '../../hooks/useUser';
import { IconButton } from '../../components/common/IconButton/IconButton';
import { FriendsList } from '../../components/FriendsList/FriendsList';
import { FriendRequestsList } from '../../components/FriendRequestsList/FriendRequestsList';

export function FriendsView() {
  const user = useUser();
  const navigate = useNavigate();

  const goAddFriendsHandler = () => navigate('/friends/find');

  return (
    <main className="FriendsView">
      <section className="FriendsView__window">
        <ViewTitle>Znajomi</ViewTitle>
        <div className="FriendsView__button-container">
          <IconButton bootstrapIcon="bi bi-people-fill" />
          <IconButton bootstrapIcon="bi bi-envelope-check-fill" />
          <IconButton bootstrapIcon="bi bi-person-plus-fill" onClick={goAddFriendsHandler} />
        </div>
        <div className="FriendsView__container">
          {/* <FriendsList /> */}
          <FriendRequestsList />
        </div>
      </section>
    </main>
  );
}
