import React from 'react';
import { ErrorResponse, GetFriendshipsResponse } from 'types';
import { apiUrl } from '../../../config';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../../components/Pagination/Pagination';
import { FriendButton } from '../../../components/FriendButton/FriendButton';
import { IconButton } from '../../../components/common/IconButton/IconButton';
import './FriendRequestsList.css';

interface Props {
  listStatus: number | null;
  title: string;
  listData: GetFriendshipsResponse | ErrorResponse | null;
  acceptFriendshipHandler?: (friendshipId: string) => Promise<void>;
  removeFriendshipHandler?: (friendshipId: string) => Promise<void>;
  changePageHandler: (page: number) => void;
}

export function FriendRequestsList({
  title,
  listStatus,
  listData,
  acceptFriendshipHandler,
  removeFriendshipHandler,
  changePageHandler,
}: Props) {
  return (
    <div className="FriendRequestsList">
      <h3>{title}</h3>
      <div className="FriendRequestsList__container">
        {
          listStatus === 200 && listData && !('error' in listData) ? listData.friends.map((e) => (
            <FriendButton
              key={e.friend.id}
              firstName={e.friend.firstName}
              lastName={e.friend.lastName}
              username={e.friend.username}
              avatar={`${apiUrl}${e.friend.avatar}`}
            >
              {acceptFriendshipHandler && (
                <IconButton
                  bootstrapIcon="bi bi-person-plus-fill"
                  onClick={() => acceptFriendshipHandler(e.id)}
                />
              )}

              {removeFriendshipHandler && (
              <IconButton
                bootstrapIcon="bi bi-person-x-fill"
                onClick={() => removeFriendshipHandler(e.id)}
              />
              )}
            </FriendButton>
          )) : listStatus !== null && (<ForbiddenWindow />)
        }

        {(listStatus === null) ? <LoadingSpinner /> : null}
        <Pagination
          totalItems={listData && !('error' in listData) ? listData.totalFriendsCount : 1}
          itemPerPage={10}
          onChangePage={changePageHandler}
        />
      </div>
    </div>
  );
}
