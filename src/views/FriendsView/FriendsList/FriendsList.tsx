import React from 'react';
import './FriendsList.css';
import { apiUrl } from '../../../config';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../../components/Pagination/Pagination';
import { RemoveFriendButton } from '../RemoveFriendButton/RemoveFriendButton';

interface Props {
  acceptedStatus: number | null;
}

export function FriendsList({ acceptedStatus }: Props) {
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
