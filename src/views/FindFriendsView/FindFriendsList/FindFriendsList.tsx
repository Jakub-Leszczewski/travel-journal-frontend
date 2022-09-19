import React from 'react';
import { ErrorResponse, GetUserSearchResponse } from 'types';
import { FriendButton } from '../../../components/FriendButton/FriendButton';
import { Pagination } from '../../../components/Pagination/Pagination';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { apiUrl } from '../../../config';
import './FindFriendsList.css';
import { IconButton } from '../../../components/common/IconButton/IconButton';

interface Props {
  searchFriendData: GetUserSearchResponse | ErrorResponse | null;
  addFriendsHandler: (id: string) => Promise<void>;
  searchFriendStatus: number | null;
  changePageHandler: (page: number) => void;
  loading: boolean;
}

export function FindFriendsList({
  searchFriendData, addFriendsHandler, searchFriendStatus, changePageHandler, loading,
}: Props) {
  return (
    <div className="FindFriendsList">
      {
        searchFriendStatus === 200 && searchFriendData && !('error' in searchFriendData)
          ? searchFriendData.users.map((e) => (
            <FriendButton
              key={e.id}
              firstName={e.firstName}
              lastName={e.lastName}
              username={e.username}
              avatar={`${apiUrl}${e.avatar}`}
            >
              <IconButton
                bootstrapIcon="bi bi-person-plus-fill"
                onClick={() => addFriendsHandler(e.id)}
              />
            </FriendButton>
          ))
          : searchFriendStatus !== null && (<ForbiddenWindow />)
      }

      <Pagination
        totalItems={searchFriendData && !('error' in searchFriendData) ? searchFriendData.totalUsersCount : 1}
        itemPerPage={10}
        onChangePage={changePageHandler}
      />
      {(loading) ? <LoadingSpinner /> : null}
    </div>
  );
}
