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
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../components/common/Pagination/Pagination';

export function ProfileView() {
  const idCompare = useCompareUserId();
  const params = useParams();
  const [refreshFlag, setRefreshFlag] = useState<boolean>();
  const [excludedTravelId, setExcludedTravelId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [travelsStatus, travelsBody] = useApi<GetTravelsResponse | ErrorResponse>(
    `${apiUrl}/api/user/${params.id}/travel?page=${currentPage}`,
    [params, refreshFlag, currentPage],
  );

  useEffect(() => {
    setExcludedTravelId(null);
  }, [travelsBody]);

  const refreshTravelsHandler = () => {
    setRefreshFlag((prev) => !prev);
  };

  const excludeTravel = (travelId: string) => {
    setExcludedTravelId(travelId);
  };

  const changePageHandler = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <main className="ProfileView">
      <section className="ProfileView__window">
        {idCompare(params.id) && (
        <Link to="/travel/add"><AddButton /></Link>
        )}

        <div className="ProfileView__container">
          {
            travelsStatus === 200 && travelsBody
            && !('error' in travelsBody) ? travelsBody.travels.map((e) => e.id !== excludedTravelId
              && (
                <ShortTravelInfo
                  key={e.id}
                  to={`/travel/${e.id}`}
                  id={e.id}
                  title={e.title}
                  destination={e.destination}
                  description={e.description}
                  comradesCount={e.comradesCount}
                  travelStartAt={new Date(e.startAt)}
                  travelEndAt={new Date(e.endAt)}
                  photoUrl={`${apiUrl}${e.photo}`}
                  authorId={e.authorId}
                  excludeTravel={excludeTravel}
                  refreshTravels={refreshTravelsHandler}
                />
              )) : (travelsStatus !== null) && <ForbiddenWindow />
          }

          {(travelsStatus === null) ? <LoadingSpinner /> : null}

        </div>
        <Pagination
          totalItems={travelsBody && !('error' in travelsBody) ? travelsBody.totalTravelsCount : 1}
          onChangePage={changePageHandler}
          itemPerPage={10}
        />
      </section>
    </main>
  );
}
