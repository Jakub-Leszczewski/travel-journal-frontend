import React, {
} from 'react';
import './FindFriendsView.css';
import { useNavigate } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { useUser } from '../../hooks/useUser';
import { FoundFriendsList } from '../../components/FoundFriendsList/FoundFriendsList';
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput';

export function FindFriendsView() {
  const user = useUser();
  const navigate = useNavigate();

  const goAddFriendsHandler = () => navigate('/friends/add');

  return (
    <main className="FindFriendsView">
      <section className="FindFriendsView__window">
        <ViewTitle>Szukaj znajomych</ViewTitle>
        <div className="FindFriendsView__form-container">
          <form>
            <ShortTextInput
              placeholder="Szukaj znajomych"
            />
          </form>
        </div>
        <div className="FindFriendsView__container">
          <FoundFriendsList />
        </div>
      </section>
    </main>
  );
}
