import React from 'react';
import './ProfileMain.css';
import { Link } from 'react-router-dom';
import { ErrorResponse, GetTravelsResponse } from 'types';
import { ForbiddenWindow } from '../../../components/ForbiddenWindow/ForbiddenWindow';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../../../components/Pagination/Pagination';
import { AddButton } from '../../../components/common/AddButton/AddButton';
import { apiUrl } from '../../../config';
import { ShortTravelInfo } from '../ShortTravelInfo/ShortTravelInfo';

interface Props {
  travelsData: GetTravelsResponse | ErrorResponse | null;
  excludedTravelId: string | null
  travelsStatus: number | null;
  changePageHandler: (page: number) => void;
  excludeTravel: (travelId: string) => void;
  refreshTravelsHandler: () => void;
  isOwner: boolean;
}

export function ProfileMain({
  travelsData, travelsStatus, changePageHandler, excludedTravelId, excludeTravel, refreshTravelsHandler, isOwner,
}: Props) {
  return (
    <main className="ProfileMain">
      <section className="ProfileMain__window">
        {isOwner && (
          <Link to="/travel/add"><AddButton /></Link>
        )}

        <div className="ProfileMain__container">
          {
            travelsStatus === 200 && travelsData
            && !('error' in travelsData) ? travelsData.travels.map((e) => e.id !== excludedTravelId
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
          totalItems={travelsData && !('error' in travelsData) ? travelsData.totalTravelsCount : 1}
          onChangePage={changePageHandler}
          itemPerPage={10}
        />
      </section>
    </main>
  );
}
