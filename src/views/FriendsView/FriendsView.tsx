import React, {
  useState,
} from 'react';
import './FriendsView.css';
import { useNavigate } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { useUser } from '../../hooks/useUser';
import { IconButton } from '../../components/common/IconButton/IconButton';
import { FriendsList } from '../../components/FriendsList/FriendsList';
import { FriendRequestsList } from '../../components/FriendRequestsList/FriendRequestsList';

export function FriendsView() {
  const [isFriendList, setIsFriendList] = useState<boolean>(true);
  const user = useUser();
  const navigate = useNavigate();

  const goAddFriendsHandler = () => navigate('/friends/find');

  const toggleView = (value: boolean) => {
    setIsFriendList(value);
  };

  return (
    <main className="FriendsView">
      <section className="FriendsView__window">
        <ViewTitle>{isFriendList ? 'Znajomi' : 'Zaproszenia do znajomych'}</ViewTitle>
        <div className="FriendsView__button-container">
          <IconButton bootstrapIcon="bi bi-people-fill" onClick={() => toggleView(true)} />
          <IconButton bootstrapIcon="bi bi-envelope-check-fill" onClick={() => toggleView(false)} />
          <IconButton bootstrapIcon="bi bi-person-plus-fill" onClick={goAddFriendsHandler} />
        </div>

        {
          isFriendList
            ? <FriendsList />
            : <FriendRequestsList />
        }
      </section>
    </main>
  );
}
