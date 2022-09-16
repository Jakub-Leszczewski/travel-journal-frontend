import React, { useState } from 'react';
import './FriendRequestsLists.css';
import {
  ErrorResponse, GetFriendshipsResponse, UpdateFriendshipResponse, DeleteFriendshipResponse, FriendshipStatus,
} from 'types';
import { FriendButton } from '../../../components/FriendButton/FriendButton';
import { FriendRequestButton } from '../FriendRequestButton/FriendRequestButton';
import { useApi } from '../../../hooks/useApi';
import { apiUrl } from '../../../config';
import { useUser } from '../../../hooks/useUser';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { api, HttpMethod } from '../../../utils/api';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../../components/common/Pagination/Pagination';

export function FriendRequestsLists() {
  const user = useUser();
  const [currentWaitingPage, setCurrentWaitingPage] = useState<number>(1);
  const [currentInvitationPage, setCurrentInvitationPage] = useState<number>(1);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [waitingStatus, waitingBody] = useApi<GetFriendshipsResponse | ErrorResponse>(
    `${apiUrl}/user/${user?.id ?? ''}/friend?status=${FriendshipStatus.Waiting}&page=${currentWaitingPage || 1}`,
    [refreshFlag, currentWaitingPage],
  );
  const [invitationStatus, invitationBody] = useApi<GetFriendshipsResponse | ErrorResponse>(
    `${apiUrl}/user/${user?.id ?? ''}/friend?status=${FriendshipStatus.Invitation}&page=${currentInvitationPage || 1}`,
    [refreshFlag, currentInvitationPage],
  );

  const acceptFriendshipHandler = async (friendshipId: string) => {
    const { status } = await api<UpdateFriendshipResponse | ErrorResponse>(
      `${apiUrl}/friendship/${friendshipId}`,
      {
        method: HttpMethod.PATCH,
      },
    );

    if (status === 200) setRefreshFlag((prev) => !prev);
  };

  const removeFriendshipHandler = async (friendshipId: string) => {
    const { status } = await api<DeleteFriendshipResponse | ErrorResponse>(
      `${apiUrl}/friendship/${friendshipId}`,
      {
        method: HttpMethod.DELETE,
      },
    );

    if (status === 200) setRefreshFlag((prev) => !prev);
  };

  const changeWaitingPageHandler = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentWaitingPage(page);
  };

  const changePageInvitationHandler = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentInvitationPage(page);
  };

  return (
    <div className="FriendRequestsList">
      <h3>Przychodzące:</h3>
      <div className="FriendRequestsList__container">
        {
          invitationStatus === 200 && invitationBody && !('error' in invitationBody) ? invitationBody.friends.map((e) => (
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
        <Pagination
          totalItems={invitationBody && !('error' in invitationBody) ? invitationBody.totalFriendsCount : 1}
          itemPerPage={10}
          onChangePage={changePageInvitationHandler}
        />
      </div>

      <hr />

      <h3>Wysłane:</h3>
      <div className="FriendRequestsList__container">
        {
          waitingStatus === 200 && waitingBody && !('error' in waitingBody) ? waitingBody.friends.map((e) => (
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
      <Pagination
        totalItems={waitingBody && !('error' in waitingBody) ? waitingBody.totalFriendsCount : 1}
        itemPerPage={10}
        onChangePage={changeWaitingPageHandler}
      />

      {(waitingStatus === null) ? <LoadingSpinner /> : null}
    </div>
  );
}
