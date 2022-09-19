import React from 'react';
import './FriendRequestsLists.css';
import { ErrorResponse, GetFriendshipsResponse } from 'types';
import { FriendRequestsList } from '../FriendRequestsList/FriendRequestsList';

interface Props {
  invitationStatus: number | null;
  waitingStatus: number | null;
  invitationData: GetFriendshipsResponse | ErrorResponse | null;
  waitingData: GetFriendshipsResponse | ErrorResponse | null;
  acceptFriendshipHandler: (friendshipId: string) => Promise<void>;
  removeFriendshipHandler: (friendshipId: string) => Promise<void>;
  changeWaitingPageHandler: (page: number) => void;
  changeInvitationPageHandler: (page: number) => void;
}

export function FriendRequestsLists({
  invitationStatus,
  waitingStatus,
  invitationData,
  waitingData,
  acceptFriendshipHandler,
  removeFriendshipHandler,
  changeWaitingPageHandler,
  changeInvitationPageHandler,
}: Props) {
  return (
    <div className="FriendRequestsLists">
      {
        invitationData && !('error' in invitationData) && invitationData.totalFriendsCount > 0 && (
        <>
          <FriendRequestsList
            listStatus={invitationStatus}
            title="Przychodzące:"
            listData={invitationData}
            acceptFriendshipHandler={acceptFriendshipHandler}
            removeFriendshipHandler={removeFriendshipHandler}
            changePageHandler={changeInvitationPageHandler}
          />
          <hr />
        </>
        )
      }

      {
        waitingData && !('error' in waitingData) && waitingData.totalFriendsCount > 0 && (
        <FriendRequestsList
          listStatus={waitingStatus}
          title="Wysłane:"
          listData={waitingData}
          removeFriendshipHandler={removeFriendshipHandler}
          changePageHandler={changeWaitingPageHandler}
        />
        )
      }
    </div>
  );
}
