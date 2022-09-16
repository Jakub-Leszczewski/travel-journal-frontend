import React, { useEffect, useState } from 'react';
import './TravelView.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorResponse, GetPostsResponse, GetTravelResponse } from 'types';
import { AddButton } from '../../components/common/AddButton/AddButton';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { TravelInfo } from '../../components/TravelInfo/TravelInfo';
import { ForbiddenWindow } from '../../components/ForbiddenWindow/ForbiddenWindow';
import { PostTransparent } from '../../components/PostTransparent/PostTransparent';
import { IconButtonBlack } from '../../components/common/IconButtonBlack/IconButtonBlack';
import { useUser } from '../../hooks/useUser';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../components/common/Pagination/Pagination';

export function TravelView() {
  const user = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshFlag, setRefreshFlag] = useState<boolean>();
  const [excludedPostId, setExcludedPostId] = useState<string | null>(null);
  const [travelStatus, travelBody] = useApi<GetTravelResponse | ErrorResponse>(`${apiUrl}/travel/${params.id}`);
  const [postsStatus, postsBody] = useApi<GetPostsResponse | ErrorResponse>(
    `${apiUrl}/travel/${params.id}/post?page=${currentPage}`,
    [params, refreshFlag, currentPage],
  );

  useEffect(() => {
    setExcludedPostId(null);
  }, [postsBody]);

  const refreshPostHandler = () => {
    setRefreshFlag((prev) => !prev);
  };

  const excludePost = (postId: string) => {
    setExcludedPostId(postId);
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  const goAddPost = () => {
    navigate(`/travel/${params.id}/post/add`);
  };

  const changePageHandler = (page: number) => {
    const elementPosition = document.querySelector('#scrollTo')?.getBoundingClientRect().top ?? 0;
    const scrollY = elementPosition ? elementPosition + window.scrollY : 0;

    window.scrollTo(0, scrollY);
    setCurrentPage(page);
  };

  return (
    <main className="UserAccountView">
      <section className="TravelView__window">
        <IconButtonBlack
          onClick={goBackHandler}
          bootstrapIcon="bi bi-arrow-left-short"
        />
        {
          travelStatus === 200 && travelBody && !('error' in travelBody)
            ? (
              <TravelInfo
                title={travelBody.title}
                destination={travelBody.destination}
                startAt={new Date(travelBody.startAt)}
                endAt={new Date(travelBody.endAt)}
                comradesCount={travelBody.comradesCount}
                description={travelBody.description}
                photoUrl={travelBody.photo}
              />
            )
            : travelStatus !== null && (<ForbiddenWindow />)
        }

        {(travelStatus === null) ? <LoadingSpinner /> : null}

        {
          travelStatus === 200 && travelBody && !('error' in travelBody) && user?.id === travelBody.authorId && (
            <AddButton onClick={goAddPost} />
          )
        }
        <div id="scrollTo" />
        <div className="TravelView__post-container">
          {
            postsStatus === 200 && postsBody && !('error' in postsBody)
              ? postsBody.posts.map((e, i) => e.id !== excludedPostId
                && (
                <React.Fragment key={e.id}>
                  <PostTransparent
                    id={e.id}
                    title={e.title}
                    destination={e.destination}
                    createdAt={new Date(e.createdAt)}
                    description={e.description}
                    photoUrl={e.photo}
                    authorId={travelStatus === 200 && travelBody && !('error' in travelBody) ? travelBody.authorId : ''}
                    refreshPostHandler={refreshPostHandler}
                    excludePost={excludePost}
                  />

                  {i < postsBody.posts.length - 1 && <hr className="TravelView__hr" />}
                </React.Fragment>
                ))
              : postsStatus !== null && (<ForbiddenWindow />)
          }
        </div>

        <Pagination
          totalItems={postsBody && !('error' in postsBody) ? postsBody.totalPostsCount : 0}
          onChangePage={changePageHandler}
          itemPerPage={10}
        />
      </section>
    </main>
  );
}
