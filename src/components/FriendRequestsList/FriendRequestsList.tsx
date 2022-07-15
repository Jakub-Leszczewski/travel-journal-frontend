import React, { useState } from 'react';
import './FriendRequestsList.css';
import {
  ErrorResponse, GetFriendsResponse, UpdateFriendResponse, DeleteFriendResponse,
} from 'types';
import { FriendButton } from '../FriendButton/FriendButton';
import { FriendRequestButton } from '../FriendRequestButton/FriendRequestButton';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { useUser } from '../../hooks/useUser';
import { ForbiddenWindow } from '../ForbiddenWindow/ForbiddenWindow';
import { api, HttpMethod } from '../../utils/api';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export function FriendRequestsList() {
  const user = useUser();
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [waitingStatus, waitingBody] = useApi<GetFriendsResponse | ErrorResponse>(
    `${apiUrl}/api/user/${user?.id ?? ''}/friend?waiting=true`,
    [refreshFlag],
  );
  const [invitationStatus, invitationBody] = useApi<GetFriendsResponse | ErrorResponse>(
    `${apiUrl}/api/user/${user?.id ?? ''}/friend?invitation=true`,
    [refreshFlag],
  );

  const acceptFriendshipHandler = async (friendshipId: string) => {
    const { status } = await api<UpdateFriendResponse | ErrorResponse>(
      `${apiUrl}/api/friend/${friendshipId}`,
      {
        method: HttpMethod.PATCH,
      },
    );

    if (status === 200) setRefreshFlag((prev) => !prev);
  };

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
    <div className="FriendRequestsList">
      <h3>Przychodzące:</h3>
      <div className="FriendRequestsList__container">
        {
          invitationStatus === 200 && invitationBody && !('error' in invitationBody) ? invitationBody.map((e) => (
            <FriendRequestButton
              key={e.friend.id}
              friendshipId={e.id}
              firstName={e.friend.firstName}
              lastName={e.friend.lastName}
              username={e.friend.username}
              avatar={`${apiUrl}${e.friend.avatar}`}
              acceptFriendHandler={acceptFriendshipHandler}
              removeFriendHandler={removeFriendshipHandler}
            />
          )) : invitationStatus !== null && (<ForbiddenWindow />)
        }

        {(invitationStatus === null) ? <LoadingSpinner /> : null}

      </div>

      <br />

      <h3>Wysłane:</h3>
      <div className="FriendRequestsList__container">
        {
          waitingStatus === 200 && waitingBody && !('error' in waitingBody) ? waitingBody.map((e) => (
            <FriendButton
              key={e.friend.id}
              friendshipId={e.id}
              firstName={e.friend.firstName}
              lastName={e.friend.lastName}
              username={e.friend.username}
              avatar={`${apiUrl}${e.friend.avatar}`}
              bootstrapIcon="bi bi-person-x-fill"
              onClick={removeFriendshipHandler}
            />
          )) : waitingStatus !== null && (<ForbiddenWindow />)
        }
      </div>

      {(waitingStatus === null) ? <LoadingSpinner /> : null}
    </div>
  );
}
