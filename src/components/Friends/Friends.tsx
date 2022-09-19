import React from 'react';
import './Friends.css';
import { useNavigate } from 'react-router-dom';
import { FriendsButtons } from './FriendButtons/FriendsButtons';
import { ViewTitle } from '../ViewTitle/ViewTitle';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function Friends({ children, title }: Props) {
  const navigate = useNavigate();

  const goFriendsHandler = () => navigate('/friends/');
  const goFriendRequestsHandler = () => navigate('/friends/request');
  const goFindFriendsHandler = () => navigate('/friends/find');

  return (
    <main className="Friends">
      <section className="Friends__window">
        <ViewTitle>{title}</ViewTitle>
        <FriendsButtons
          goAddFriendsHandler={goFindFriendsHandler}
          goFriendRequestsHandler={goFriendRequestsHandler}
          goFriendsHandler={goFriendsHandler}
        />

        {children}
      </section>
    </main>
  );
}
