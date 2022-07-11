import React, { useEffect, useState } from 'react';
import './ProfileView.css';
import { Link, useParams } from 'react-router-dom';
import { ErrorResponse, GetTravelsResponse } from 'types';
import { useApi } from '../../hooks/useApi';
import { apiUrl } from '../../config';
import { AddButton } from '../../components/common/AddButton/AddButton';
import { ShortTravelInfo } from '../../components/ShortTravelInfo/ShortTravelInfo';
import { useCompareUserId } from '../../hooks/useCompareUserId';
import { ForbiddenWindow } from '../../components/ForbiddenWindow/ForbiddenWindow';

export function ProfileView() {
  const idCompare = useCompareUserId();
  const params = useParams();
  const [refreshFlag, setRefreshFlag] = useState<boolean>();
  const [excludedTravelId, setExcludedTravelId] = useState<string | null>(null);
  const [status, body] = useApi<GetTravelsResponse | ErrorResponse>(
    `${apiUrl}/api/user/${params.id}/travel`,
    [params, refreshFlag],
  );

  useEffect(() => {
    setExcludedTravelId(null);
  }, [body]);

  const refreshTravelsHandler = () => {
    setRefreshFlag((prev) => !prev);
  };

  const excludeTravel = (travelId: string) => {
    setExcludedTravelId(travelId);
  };

  return (
    <main className="ProfileView">
      <section className="ProfileView__window">
        {idCompare(params.id) && (
        <Link to="/travel/add"><AddButton /></Link>
        )}

        <div className="ProfileView__container">
          {
            status === 200 && body && !('error' in body) ? body.map((e) => e.id !== excludedTravelId && (
              <ShortTravelInfo
                excludeTravel={excludeTravel}
                refreshTravels={refreshTravelsHandler}
                key={e.id}
                id={e.id}
                title={e.title}
                destination={e.destination}
                travelStartAt={new Date(e.travelStartAt)}
                travelEndAt={new Date(e.travelEndAt)}
                comradesCount={e.comradesCount}
                description={e.description}
                photoUrl={e.photo}
                to={`/travel/${e.id}`}
              />
            )) : (<ForbiddenWindow />)
          }
        </div>
      </section>
    </main>
  );
}
