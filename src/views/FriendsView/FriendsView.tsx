import React, { useState } from 'react';
import {
  DeleteFriendshipResponse, ErrorResponse, FriendshipStatus, GetFriendshipsResponse,
} from 'types';
import { FriendsList } from './FriendsList/FriendsList';
import { Friends } from '../../components/Friends/Friends';
import { useUser } from '../../hooks/useUser';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { api, HttpMethod } from '../../utils/api';

export function FriendsView() {
  const user = useUser();
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [acceptedStatus, acceptedData] = useApi<GetFriendshipsResponse | ErrorResponse>(
    `${apiUrl}/user/${user?.id ?? ''}/friend?status=${FriendshipStatus.Accepted}&page=${currentPage || 1}`,
    [refreshFlag, currentPage],
  );

  const removeFriendshipHandler = async (friendshipId: string) => {
    const { status } = await api<DeleteFriendshipResponse | ErrorResponse>(
      `${apiUrl}/friendship/${friendshipId}`,
      {
        method: HttpMethod.DELETE,
      },
    );

    if (status === 200) setRefreshFlag((prev) => !prev);
  };

  const changePageHandler = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <Friends title="Znajomi">
      <FriendsList
        acceptedStatus={acceptedStatus}
        acceptedData={acceptedData}
        removeFriendshipHandler={removeFriendshipHandler}
        changePageHandler={changePageHandler}
      />
    </Friends>
  );
}
