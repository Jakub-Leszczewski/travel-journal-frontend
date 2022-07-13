import React, {
} from 'react';
import './FriendsView.css';
import { useNavigate } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { useUser } from '../../hooks/useUser';
import { IconButton } from '../../components/common/IconButton/IconButton';

export function FriendsView() {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <main className="FriendsView">
      <section className="FriendsView__window">
        <ViewTitle>Znajomi</ViewTitle>
        <div className="FriendsView__button-container">
          <IconButton bootstrapIcon="bi bi-people-fill" />
          <IconButton bootstrapIcon="bi bi-envelope-check-fill" />
          <IconButton bootstrapIcon="bi bi-person-plus-fill" />
        </div>
        <div className="FriendsView__container" />
      </section>
    </main>
  );
}
