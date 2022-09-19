import React from 'react';
import './FriendsList.css';
import { ErrorResponse, GetFriendshipsResponse } from 'types';
import { apiUrl } from '../../../config';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../../components/Pagination/Pagination';
import { FriendButton } from '../../../components/FriendButton/FriendButton';
import { IconButton } from '../../../components/common/IconButton/IconButton';

interface Props {
  acceptedStatus: number | null;
  acceptedData: GetFriendshipsResponse | ErrorResponse | null;
  removeFriendshipHandler: (friendshipId: string) => Promise<void>;
  changePageHandler: (page: number) => void;
}

export function FriendsList({
  acceptedStatus, acceptedData, removeFriendshipHandler, changePageHandler,
}: Props) {
  return (
    <div className="FriendsList">
      {
        acceptedStatus === 200 && acceptedData && !('error' in acceptedData) ? acceptedData.friends.map((e) => (
          <FriendButton
            key={e.friend.id}
            firstName={e.friend.firstName}
            lastName={e.friend.lastName}
            username={e.friend.username}
            avatar={`${apiUrl}${e.friend.avatar}`}
          >
            <IconButton
              bootstrapIcon="bi bi-person-x-fill"
              onClick={() => removeFriendshipHandler(e.id)}
            />
          </FriendButton>
        )) : acceptedStatus !== null && (<ForbiddenWindow />)
      }
      <Pagination
        totalItems={acceptedData && !('error' in acceptedData) ? acceptedData.totalFriendsCount : 1}
        itemPerPage={10}
        onChangePage={changePageHandler}
      />
      {(acceptedStatus === null) ? <LoadingSpinner /> : null}
    </div>
  );
}
