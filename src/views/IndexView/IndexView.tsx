import React, { useState } from 'react';
import { ErrorResponse, GetUserIndexResponse } from 'types';
import { ForbiddenWindow } from '../../components/ForbiddenWindow/ForbiddenWindow';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { useUser } from '../../hooks/useUser';
import './IndexView.css';
import { PostIndex } from '../../components/PostIndex/PostIndex';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../components/common/Pagination/Pagination';

export function IndexView() {
  const user = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [indexStatus, indexBody] = useApi<GetUserIndexResponse | ErrorResponse>(
    `${apiUrl}/api/user/${user?.id ?? ''}/index?page=${currentPage ?? 1}`,
    [currentPage],
  );

  const changePageHandler = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <main className="IndexView">
      <section className="IndexView__window">
        <div className="IndexView__container">
          {
            indexStatus === 200 && indexBody && !('error' in indexBody) ? indexBody.posts.map((e: any) => (
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
                travelId={e.travelId}
              />
            )) : (indexStatus !== null) && <ForbiddenWindow />
          }

          {(indexStatus === null) ? <LoadingSpinner /> : null}
        </div>
        <Pagination
          totalItems={indexBody && !('error' in indexBody) ? indexBody.totalPostsCount : 1}
          itemPerPage={10}
          onChangePage={changePageHandler}
        />
      </section>
    </main>
  );
}
