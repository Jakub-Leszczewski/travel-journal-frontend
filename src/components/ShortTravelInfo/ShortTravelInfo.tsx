import React from 'react';
import './ShortTravelInfo.css';
import { Link } from 'react-router-dom';
import { DeleteTravelResponse, ErrorResponse } from 'types';
import { InfoBarList } from '../InfoBarList/InfoBarList';
import { apiUrl } from '../../config';
import { EditRemove } from '../EditRemove/EditRemove';
import { api, HttpMethod } from '../../utils/api';
import { useUser } from '../../hooks/useUser';

interface Props {
  id: string;
  to: string;
  title: string;
  destination: string;
  travelStartAt: Date;
  travelEndAt: Date;
  comradesCount: number;
  description: string;
  photoUrl: string;
  authorId: string;
  refreshTravels: () => void;
  excludeTravel: (travelId: string) => void;
}

export function ShortTravelInfo({
  id,
  to,
  title,
  destination,
  travelStartAt,
  travelEndAt,
  comradesCount,
  description,
  photoUrl,
  refreshTravels,
  excludeTravel,
  authorId,
}: Props) {
  const userData = useUser();

  const deleteHandler = async () => {
    await api<DeleteTravelResponse | ErrorResponse>(`${apiUrl}/api/travel/${id}`, {
      method: HttpMethod.DELETE,
    });

    refreshTravels();
  };

  return (
    <section className="ShortTravelInfo">
      {
        userData?.id === authorId
        && (
        <EditRemove
          editPageUrl={`/travel/${id}/edit`}
          deleteHandler={() => {
            deleteHandler();
            excludeTravel(id);
          }}
        />
        )
      }
      <Link to={to}>
        <header className="ShortTravelInfo__header">
          <div className="ShortTravelInfo__img-container">
            <img src={photoUrl} alt={`${title}`} />
          </div>
          <div className="ShortTravelInfo__title-container">
            <h2>{title}</h2>
          </div>
        </header>

        <div className="ShortTravelInfo__content">
          <InfoBarList
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
