import React from 'react';
import { ErrorResponse, ForeignPostSaveData, GetUserIndexResponse } from 'types';
import { PostIndex } from '../PostIndex/PostIndex';
import { Pagination } from '../../../components/Pagination/Pagination';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { apiUrl } from '../../../config';
import './IndexMain.css';

interface Props {
  indexData: GetUserIndexResponse | ErrorResponse | null;
  indexStatus: number | null;
  changePageHandler: (page: number) => void;
}

export function IndexMain({ indexData, indexStatus, changePageHandler }: Props) {
  return (
    <main className="IndexMain">
      <section className="IndexMain__window">
        <div className="IndexMain__container">
          {
            indexStatus === 200
            && indexData
            && !('error' in indexData) ? indexData.posts.map((e: ForeignPostSaveData) => (
              <PostIndex
                key={e.id}
                postTitle={e.title}
                postPhotoUrl={`${apiUrl}${e.photo}`}
                postDestination={e.destination}
                postCreatedAt={new Date(e.createdAt)}
                postDescription={e.description}
                userFirstName={e.user.firstName}
                userLastName={e.user.lastName}
                userPhotoUrl={e.user.avatar}
                userId={e.user.id}
                travelId={e.travel.id}
              />
              )) : (indexStatus !== null) && <ForbiddenWindow />
          }

          {(indexStatus === null) ? <LoadingSpinner /> : null}
        </div>

        <Pagination
          totalItems={indexData && !('error' in indexData) ? indexData.totalPostsCount : 1}
          itemPerPage={10}
          onChangePage={changePageHandler}
        />
      </section>
    </main>
  );
}
