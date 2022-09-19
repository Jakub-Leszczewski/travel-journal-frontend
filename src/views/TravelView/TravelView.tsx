import React, { useEffect, useState } from 'react';
import './TravelMain/TravelMain.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorResponse, GetPostsResponse, GetTravelResponse } from 'types';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { useCompareUserId } from '../../hooks/useCompareUserId';
import { TravelMain } from './TravelMain/TravelMain';
import { TravelPostsList } from './TravelPostsList/TravelPostsList';

export function TravelView() {
  const userIdCompare = useCompareUserId();
  const navigate = useNavigate();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshFlag, setRefreshFlag] = useState<boolean>();
  const [excludedPostId, setExcludedPostId] = useState<string | null>(null);
  const [travelStatus, travelBody] = useApi<GetTravelResponse | ErrorResponse>(`${apiUrl}/travel/${params.id}`);
  const [postsStatus, postsData] = useApi<GetPostsResponse | ErrorResponse>(
    `${apiUrl}/travel/${params.id}/post?page=${currentPage}`,
    [params, refreshFlag, currentPage],
  );

  useEffect(() => {
    setExcludedPostId(null);
  }, [postsData]);

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
    <TravelMain
      travelStatus={travelStatus}
      travelData={travelBody}
      isOwner={userIdCompare(travelBody && ('authorId' in travelBody) && travelBody.authorId)}
      goBackHandler={goBackHandler}
      goAddPost={goAddPost}
    >
      <TravelPostsList
        postsStatus={postsStatus}
        postsData={postsData}
        excludedPostId={excludedPostId}
        refreshPostHandler={refreshPostHandler}
        changePageHandler={changePageHandler}
        excludePost={excludePost}
        authorId={travelBody && ('authorId' in travelBody) ? travelBody.authorId : ''}
      />
    </TravelMain>
  );
}
