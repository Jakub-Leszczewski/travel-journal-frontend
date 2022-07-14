import React, { ChangeEvent, useEffect, useState } from 'react';
import './FindFriendsView.css';
import { useNavigate } from 'react-router-dom';
import {
  CreateFriendResponse, ErrorResponse, GetUserSearchResponse, CreateFriendDtoInterface,
} from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { useUser } from '../../hooks/useUser';
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { AddFriendButton } from '../../components/AddFriendButton/AddFriendButton';
import { ForbiddenWindow } from '../../components/ForbiddenWindow/ForbiddenWindow';
import { api, HttpMethod } from '../../utils/api';

export function FindFriendsView() {
  const user = useUser();
  const navigate = useNavigate();
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [status, body] = useApi<GetUserSearchResponse | ErrorResponse>(
    `${apiUrl}/api/user/${user?.id ?? ''}/search?search=${encodeURIComponent(search)}&friends=false`,
    [search, refreshFlag],
  );

  useEffect(() => {
    const interval = setTimeout(async () => {
      setSearch(searchInput);
    }, 1000);

    return () => clearTimeout(interval);
  }, [searchInput]);

  const goAddFriendsHandler = async (id: string) => {
    const payload: CreateFriendDtoInterface = { friendId: id };

    const { body, status } = await api<CreateFriendResponse | ErrorResponse>(
      `${apiUrl}/api/user/${user?.id ?? ''}/friend`,
      {
        method: HttpMethod.POST,
        payload,
      },
    );

    if (status === 201) setRefreshFlag((prev) => !prev);
  };

  const changeSearchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <main className="FindFriendsView">
      <section className="FindFriendsView__window">
        <ViewTitle>Szukaj znajomych</ViewTitle>
        <div className="FindFriendsView__form-container">
          <form>
            <ShortTextInput
              value={searchInput}
              onChange={changeSearchInputHandler}
              placeholder="Szukaj znajomych"
            />
          </form>
        </div>
        <div className="FindFriendsView__container">
          {
            status === 200 && body && !('error' in body) ? body.map((e, i) => (
              <AddFriendButton
                addFriendHandler={goAddFriendsHandler}
                id={e.id}
                firstName={e.firstName}
                lastName={e.lastName}
                username={e.username}
                avatar={`${apiUrl}${e.avatar}`}
              />
            )) : status !== null && (<ForbiddenWindow />)
          }
        </div>
      </section>
    </main>
  );
}
