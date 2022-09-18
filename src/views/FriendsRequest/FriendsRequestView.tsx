import React, { useState } from 'react';
import {
  DeleteFriendshipResponse,
  ErrorResponse,
  FriendshipStatus,
  GetFriendshipsResponse,
  UpdateFriendshipResponse,
} from 'types';
import { Friends } from '../../components/Friends/Friends';
import { FriendRequestsLists } from './FriendRequestsLists/FriendRequestsLists';
import { useUser } from '../../hooks/useUser';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { api, HttpMethod } from '../../utils/api';

export function FriendsRequestView() {
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
    <Friends title="Zaproszenia do znajomych">
      <FriendRequestsLists
        invitationStatus={invitationStatus}
        waitingStatus={waitingStatus}
        invitationData={invitationBody}
        waitingData={waitingBody}
        acceptFriendshipHandler={acceptFriendshipHandler}
        removeFriendshipHandler={removeFriendshipHandler}
        changeWaitingPageHandler={changeWaitingPageHandler}
        changePageInvitationHandler={changePageInvitationHandler}
      />
    </Friends>
  );
}
