import React, { useState } from 'react';
import './FriendsList.css';
import { DeleteFriendResponse, ErrorResponse, GetFriendsResponse } from 'types';
import { FriendButton } from '../FriendButton/FriendButton';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useUser } from '../../hooks/useUser';
import { useApi } from '../../hooks/useApi';
import { ForbiddenWindow } from '../ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export function FriendsList() {
  const user = useUser();
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [acceptedStatus, acceptedBody] = useApi<GetFriendsResponse | ErrorResponse>(
    `${apiUrl}/api/user/${user?.id ?? ''}/friend?accepted=true`,
    [refreshFlag],
  );

  const removeFriendshipHandler = async (friendshipId: string) => {
    const { status } = await api<DeleteFriendResponse | ErrorResponse>(
      `${apiUrl}/api/friend/${friendshipId}`,
      {
        method: HttpMethod.DELETE,
      },
    );

    if (status === 200) setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="FriendsList">
      {
        acceptedStatus === 200 && acceptedBody && !('error' in acceptedBody) ? acceptedBody.map((e) => (
          <FriendButton
            to={`/profile/${e.friend.id}`}
            key={e.id}
            friendshipId={e.id}
            firstName={e.friend.firstName}
            lastName={e.friend.lastName}
            username={e.friend.username}
            avatar={`${apiUrl}${e.friend.avatar}`}
            bootstrapIcon="bi bi-person-x-fill"
            onClick={removeFriendshipHandler}
          />
        )) : acceptedStatus !== null && (<ForbiddenWindow />)
      }

      {(acceptedStatus === null) ? <LoadingSpinner /> : null}
    </div>
  );
}
