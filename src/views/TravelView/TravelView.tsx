import React, { useEffect, useState } from 'react';
import './TravelView.css';
import { Link, useParams } from 'react-router-dom';
import { ErrorResponse, GetPostsResponse, GetTravelResponse } from 'types';
import { AddButton } from '../../components/common/AddButton/AddButton';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { TravelInfo } from '../../components/TravelInfo/TravelInfo';
import { ForbiddenWindow } from '../../components/ForbiddenWindow/ForbiddenWindow';
import { PostTransparent } from '../../components/PostTransparent/PostTransparent';

export function TravelView() {
  const params = useParams();
  const [refreshFlag, setRefreshFlag] = useState<boolean>();
  const [excludedPostId, setExcludedPostId] = useState<string | null>(null);
  const [travelStatus, travelBody] = useApi<GetTravelResponse | ErrorResponse>(`${apiUrl}/api/travel/${params.id}`);
  const [postStatus, postBody] = useApi<GetPostsResponse | ErrorResponse>(`${apiUrl}/api/travel/${params.id}/post`, [
    params, refreshFlag,
  ]);

  useEffect(() => {
    setExcludedPostId(null);
  }, [postBody]);

  const refreshPostHandler = () => {
    setRefreshFlag((prev) => !prev);
  };

  const excludePost = (postId: string) => {
    setExcludedPostId(postId);
  };

  return (
    <main className="UserAccountView">
      <section className="TravelView__window">
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

        <Link to={`/travel/${params.id}/post/add`}><AddButton /></Link>
        <div className="TravelView__post-container">
          {
            postStatus === 200 && postBody && !('error' in postBody) ? postBody.map((e, i) => e.id !== excludedPostId
              && (
              <React.Fragment key={e.id}>
                <PostTransparent
                  id={e.id}
                  title={e.title}
                  destination={e.destination}
                  createdAt={new Date(e.createdAt)}
                  description={e.description}
                  photoUrl={e.photo}
                  refreshPostHandler={refreshPostHandler}
                  excludePost={excludePost}
                />

                {i < postBody.length - 1 && <hr className="TravelView__hr" />}
              </React.Fragment>
              )) : postStatus !== null && (<ForbiddenWindow />)
          }
        </div>
      </section>
    </main>
  );
}
