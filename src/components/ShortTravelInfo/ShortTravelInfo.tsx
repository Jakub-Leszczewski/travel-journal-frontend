import React from 'react';
import './ShortTravelInfo.css';
import { UserInfo } from '../UserInfo/UserInfo';
import { apiUrl } from '../../config';

interface Props {
  title: string,
  destination: string,
  travelStartAt: Date,
  travelEndAt: Date,
  comradesCount: number,
  description: string
  photoUrl: string
}

export function ShortTravelInfo({
  title, destination, travelStartAt, travelEndAt, comradesCount, description, photoUrl,
}: Props) {
  return (
    <section className="ShortTravelInfo">
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
            { text: comradesCount ? String(comradesCount) : 'Samotna podróż', bootstrapIconName: 'bi bi-people-fill' },
            { text: description, bootstrapIconName: 'bi bi-chat-dots-fill' },
          ]}
        />
      </div>
    </section>
  );
}
