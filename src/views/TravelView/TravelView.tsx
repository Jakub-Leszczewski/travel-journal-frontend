import React from 'react';
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
  const [travelStatus, travelBody] = useApi<GetTravelResponse | ErrorResponse>(`${apiUrl}/api/travel/${params.id}`);
  const [postStatus, postBody] = useApi<GetPostsResponse | ErrorResponse>(`${apiUrl}/api/travel/${params.id}/post`);

  return (
    <main className="UserAccountView">
      <section className="TravelView__window">
        {
          travelStatus === 200 && travelBody && !('error' in travelBody)
            ? (
              <TravelInfo
                title={travelBody.title}
                destination={travelBody.destination}
                travelStartAt={new Date(travelBody.travelStartAt)}
                travelEndAt={new Date(travelBody.travelEndAt)}
                comradesCount={travelBody.comradesCount}
                description={travelBody.description}
                photoUrl={travelBody.photo}
              />
            )
            : (<ForbiddenWindow />)
        }

        <Link to="/post/add"><AddButton /></Link>
        <div className="TravelView__post-container">
          {
            postStatus === 200 && postBody && !('error' in postBody) ? postBody.map((e, i) => (
              <>
                <PostTransparent
                  title={e.title}
                  destination={e.destination}
                  createdAt={new Date(e.createdAt)}
                  description={e.description}
                  photoUrl={e.photo}
                />

                {i < postBody.length - 1 && <hr className="TravelView__hr" />}
              </>
            )) : (<ForbiddenWindow />)
          }
        </div>
      </section>
    </main>
  );
}
