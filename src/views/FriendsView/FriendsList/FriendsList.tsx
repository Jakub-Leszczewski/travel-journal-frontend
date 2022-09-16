import React, { useState } from 'react';
import './FriendsList.css';
import {
  DeleteFriendshipResponse, ErrorResponse, FriendshipStatus, GetFriendshipsResponse,
} from 'types';
import { api, HttpMethod } from '../../../utils/api';
import { apiUrl } from '../../../config';
import { useUser } from '../../../hooks/useUser';
import { useApi } from '../../../hooks/useApi';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../../components/common/Pagination/Pagination';
import { RemoveFriendButton } from '../RemoveFriendButton/RemoveFriendButton';

export function FriendsList() {
  const user = useUser();
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [acceptedStatus, acceptedBody] = useApi<GetFriendshipsResponse | ErrorResponse>(
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
    <div className="FriendsList">
      {
        acceptedStatus === 200 && acceptedBody && !('error' in acceptedBody) ? acceptedBody.friends.map((e) => (
          <RemoveFriendButton
            to={`/profile/${e.friend.id}`}
            key={e.id}
            friendshipId={e.id}
            firstName={e.friend.firstName}
            lastName={e.friend.lastName}
            username={e.friend.username}
            avatar={`${apiUrl}${e.friend.avatar}`}
            onClick={removeFriendshipHandler}
          />
        )) : acceptedStatus !== null && (<ForbiddenWindow />)
      }
      <Pagination
        totalItems={acceptedBody && !('error' in acceptedBody) ? acceptedBody.totalFriendsCount : 1}
        itemPerPage={10}
        onChangePage={changePageHandler}
      />
      {(acceptedStatus === null) ? <LoadingSpinner /> : null}
    </div>
  );
}
