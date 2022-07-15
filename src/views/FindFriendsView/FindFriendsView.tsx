import React, { ChangeEvent, useEffect, useState } from 'react';
import './FindFriendsView.css';
import {
  CreateFriendResponse, ErrorResponse, GetUserSearchResponse, CreateFriendDtoInterface,
} from 'types';
import { useNavigate } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { useUser } from '../../hooks/useUser';
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { ForbiddenWindow } from '../../components/ForbiddenWindow/ForbiddenWindow';
import { api, HttpMethod } from '../../utils/api';
import { FriendButton } from '../../components/FriendButton/FriendButton';
import { IconButton } from '../../components/common/IconButton/IconButton';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../components/common/Pagination/Pagination';

export function FindFriendsView() {
  const navigate = useNavigate();
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchStatus, searchBody] = useApi<GetUserSearchResponse | ErrorResponse>(
    `${apiUrl}/api/user/${user?.id ?? ''}/search?search=${encodeURIComponent(search)}&friends=false&page=${currentPage || 1}`,
    [search, refreshFlag, currentPage],
  );

  useEffect(() => {
    setLoading(false);
  }, [searchBody]);

  useEffect(() => {
    const interval = setTimeout(async () => {
      setSearch(searchInput);
    }, 1000);

    return () => clearTimeout(interval);
  }, [searchInput]);

  const addFriendsHandler = async (id: string) => {
    const payload: CreateFriendDtoInterface = { friendId: id };

    const { status } = await api<CreateFriendResponse | ErrorResponse>(
      `${apiUrl}/api/user/${user?.id ?? ''}/friend`,
      {
        method: HttpMethod.POST,
        payload,
      },
    );

    if (status === 201) setRefreshFlag((prev) => !prev);
  };

  const changeSearchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchInput(e.target.value);
  };

  const goBackHandler = () => {
    navigate('/friends/');
  };

  const changePageHandler = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <main className="FindFriendsView">
      <section className="FindFriendsView__window">
        <IconButton
          onClick={goBackHandler}
          bootstrapIcon="bi bi-arrow-left-short"
        />
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
            searchStatus === 200 && searchBody && !('error' in searchBody) ? searchBody.users.map((e) => (
              <FriendButton
                bootstrapIcon="bi bi-person-plus-fill"
                key={e.id}
                onClick={addFriendsHandler}
                friendshipId={e.id}
                firstName={e.firstName}
                lastName={e.lastName}
                username={e.username}
                avatar={`${apiUrl}${e.avatar}`}
              />
            )) : searchStatus !== null && (<ForbiddenWindow />)
          }

          <Pagination
            totalItems={searchBody && !('error' in searchBody) ? searchBody.totalUsersCount : 1}
            itemPerPage={10}
            onChangePage={changePageHandler}
          />

          {(loading) ? <LoadingSpinner /> : null}

        </div>
      </section>
    </main>
  );
}
