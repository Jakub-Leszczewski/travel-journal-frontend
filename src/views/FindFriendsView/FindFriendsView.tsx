import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  CreateFriendshipResponse, ErrorResponse, GetUserSearchResponse, CreateFriendshipDtoInterface,
} from 'types';
import { useUser } from '../../hooks/useUser';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { api, HttpMethod } from '../../utils/api';
import { Friends } from '../../components/Friends/Friends';
import { FindFriendsForm } from './FindFriendsForm/FindFriendsForm';
import { FindFriendsList } from './FindFriendsList/FindFriendsList';

export function FindFriendsView() {
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchFriendStatus, searchFriendData] = useApi<GetUserSearchResponse | ErrorResponse>(
    `${apiUrl}/user/${user?.id ?? ''}/friend/search?search=${encodeURIComponent(search)}&page=${currentPage || 1}`,
    [search, refreshFlag, currentPage],
  );

  useEffect(() => {
    setLoading(false);
  }, [searchFriendData]);

  useEffect(() => {
    const interval = setTimeout(async () => {
      setSearch(searchInput);
    }, 1000);

    return () => clearTimeout(interval);
  }, [searchInput]);

  const addFriendsHandler = async (id: string) => {
    const payload: CreateFriendshipDtoInterface = { friendId: id };

    const { status } = await api<CreateFriendshipResponse | ErrorResponse>(
      `${apiUrl}/user/${user?.id ?? ''}/friendship`,
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

  const changePageHandler = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <Friends title="Szukaj znajomych">
      <FindFriendsForm
        searchInput={searchInput}
        changeSearchInputHandler={changeSearchInputHandler}
      />
      <FindFriendsList
        searchFriendData={searchFriendData}
        addFriendsHandler={addFriendsHandler}
        searchFriendStatus={searchFriendStatus}
        changePageHandler={changePageHandler}
        loading={loading}
      />
    </Friends>
  );
}
