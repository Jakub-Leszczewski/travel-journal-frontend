import React from 'react';
import './ShortTravelInfo.css';
import { Link } from 'react-router-dom';
import { DeleteTravelResponse, ErrorResponse } from 'types';
import { UserInfo } from '../UserInfo/UserInfo';
import { apiUrl } from '../../config';
import { EditRemove } from '../EditRemoveButtons/EditRemove';
import { api, HttpMethod } from '../../utils/api';

interface Props {
  id: string
  title: string,
  destination: string,
  travelStartAt: Date,
  travelEndAt: Date,
  comradesCount: number,
  description: string
  photoUrl: string
  to: string,
  refreshTravels: () => void;
  excludeTravel: (travelId: string) => void;
}

export function ShortTravelInfo({
  id,
  title,
  destination,
  travelStartAt,
  travelEndAt,
  comradesCount,
  description,
  photoUrl,
  to,
  refreshTravels,
  excludeTravel,
}: Props) {
  const deleteHandler = async () => {
    await api<DeleteTravelResponse | ErrorResponse>(`${apiUrl}/api/travel/${id}`, {
      method: HttpMethod.DELETE,
    });

    refreshTravels();
  };

  return (
    <section className="ShortTravelInfo">
      <EditRemove
        editPageUrl={`/travel/${id}/edit`}
        deleteHandler={() => {
          deleteHandler();
          excludeTravel(id);
        }}
      />
      <Link to={to}>
        <header className="ShortTravelInfo__header">
          <div className="ShortTravelInfo__img-container">
            <img src={`${apiUrl}${photoUrl}`} alt={`${title} - photo`} />
          </div>
          <div className="ShortTravelInfo__title-container">
            <h2>{title}</h2>
          </div>
        </header>

        <div className="ShortTravelInfo__content">
          <UserInfo
            info={[
              { text: destination, bootstrapIconName: 'bi bi-geo-alt-fill' },
              {
                text: `${travelStartAt.toLocaleDateString()} - ${travelEndAt.toLocaleDateString()}`,
                bootstrapIconName: 'bi bi-calendar-week-fill',
              },
              {
                text: comradesCount ? String(comradesCount) : 'Samotna podróż',
                bootstrapIconName: 'bi bi-people-fill',
              },
              { text: description, bootstrapIconName: 'bi bi-chat-dots-fill' },
            ]}
          />
        </div>
      </Link>
    </section>
  );
}
