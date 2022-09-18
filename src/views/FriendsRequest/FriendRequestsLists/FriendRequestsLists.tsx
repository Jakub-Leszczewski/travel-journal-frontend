import React from 'react';
import './FriendRequestsLists.css';
import { ErrorResponse, GetFriendshipsResponse } from 'types';
import { FriendButton } from '../../../components/FriendButton/FriendButton';
import { apiUrl } from '../../../config';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../../components/Pagination/Pagination';
import { FriendRequestButton } from '../../FriendsView/FriendRequestsButton/FriendRequestButton';

interface Props {
  invitationStatus: number | null;
  waitingStatus: number | null;
  invitationData: GetFriendshipsResponse | ErrorResponse | null;
  waitingData: GetFriendshipsResponse | ErrorResponse | null;
  acceptFriendshipHandler: (friendshipId: string) => Promise<void>;
  removeFriendshipHandler: (friendshipId: string) => Promise<void>;
  changeWaitingPageHandler: (page: number) => void;
  changePageInvitationHandler: (page: number) => void;
}

export function FriendRequestsLists({
  invitationStatus,
  waitingStatus,
  invitationData,
  waitingData,
  acceptFriendshipHandler,
  removeFriendshipHandler,
  changeWaitingPageHandler,
  changePageInvitationHandler,
}: Props) {
  return (
    <div className="FriendRequestsList">
      <h3>Przychodzące:</h3>
      <div className="FriendRequestsList__container">
        {
          invitationStatus === 200 && invitationData && !('error' in invitationData) ? invitationData.friends.map((e) => (
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
          totalItems={invitationData && !('error' in invitationData) ? invitationData.totalFriendsCount : 1}
          itemPerPage={10}
          onChangePage={changePageInvitationHandler}
        />
      </div>

      <hr />

      <h3>Wysłane:</h3>
      <div className="FriendRequestsList__container">
        {
          waitingStatus === 200 && waitingData && !('error' in waitingData) ? waitingData.friends.map((e) => (
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
        totalItems={waitingData && !('error' in waitingData) ? waitingData.totalFriendsCount : 1}
        itemPerPage={10}
        onChangePage={changeWaitingPageHandler}
      />

      {(waitingStatus === null) ? <LoadingSpinner /> : null}
    </div>
  );
}
