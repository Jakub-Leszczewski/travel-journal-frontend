import React from 'react';
import './ProfileView.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ErrorResponse, GetTravelsResponse } from 'types';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { AddButton } from '../../components/common/AddButton/AddButton';
import { ShortTravelInfo } from '../../components/ShortTravelInfo/ShortTravelInfo';
import { WhiteButton } from '../../components/common/WhiteButton/WhiteButton';
import { useCompareUserId } from '../../hooks/useCompareUserId';
import { ForbiddenWindow } from '../../components/ForbiddenWindow/ForbiddenWindow';

export function ProfileView() {
  const idCompare = useCompareUserId();
  const params = useParams();
  const [status, body] = useApi<GetTravelsResponse | ErrorResponse>(`${apiUrl}/api/user/${params.id}/travel`);

  return (
    <main className="ProfileView">
      <section className="ProfileView__window">
        {idCompare(params.id) && (
        <Link to="/travel/add"><AddButton /></Link>
        )}

        <div className="ProfileView__container">
          {
            status === 200 && body && !('error' in body) ? body.map((e) => (
              <Link
                to={`/travel/${e.id}`}
                key={e.id}
              >
                <ShortTravelInfo
                  title={e.title}
                  destination={e.destination}
                  travelStartAt={new Date(e.travelStartAt)}
                  travelEndAt={new Date(e.travelEndAt)}
                  comradesCount={e.comradesCount}
                  description={e.description}
                  photoUrl={e.photo}
                />
              </Link>
            )) : (<ForbiddenWindow />)
          }
        </div>
      </section>
    </main>
  );
}
