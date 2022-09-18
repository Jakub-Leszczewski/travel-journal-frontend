import React from 'react';
import { ErrorResponse, GetPostsResponse } from 'types';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { PostTransparent } from '../../../components/PostTransparent/PostTransparent';
import { Pagination } from '../../../components/Pagination/Pagination';

interface Props {
  postsStatus: number | null;
  postsData: GetPostsResponse | ErrorResponse | null;
  excludedPostId: string | null;
  refreshPostHandler: () => void;
  changePageHandler: (page: number) => void;
  excludePost: (postId: string) => void;
  authorId: string;
}

export function TravelPostsList({
  postsStatus, postsData, changePageHandler, excludedPostId, refreshPostHandler, excludePost, authorId,
}: Props) {
  return (
    <>
      <div className="TravelPostsList">
        {
          postsStatus === 200 && postsData && !('error' in postsData)
            ? postsData.posts.map((e, i) => e.id !== excludedPostId
              && (
                <React.Fragment key={e.id}>
                  <PostTransparent
                    id={e.id}
                    title={e.title}
                    destination={e.destination}
                    createdAt={new Date(e.createdAt)}
                    description={e.description}
                    photoUrl={e.photo}
                    authorId={authorId}
                    refreshPostHandler={refreshPostHandler}
                    excludePost={excludePost}
                  />

                  {i < postsData.posts.length - 1 && <hr className="TravelPostsList__hr" />}
                </React.Fragment>
              ))
            : postsStatus !== null && (<ForbiddenWindow />)
      }
      </div>

      <Pagination
        totalItems={postsData && !('error' in postsData) ? postsData.totalPostsCount : 0}
        onChangePage={changePageHandler}
        itemPerPage={10}
      />
    </>
  );
}
