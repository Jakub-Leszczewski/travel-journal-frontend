import React from 'react';
import './TravelInfo.css';
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

export function TravelInfo({
  title, destination, travelStartAt, travelEndAt, comradesCount, description, photoUrl,
}: Props) {
  return (
    <section className="TravelInfo">
      <header className="TravelInfo__header">
        <div className="TravelInfo__img-container">
          <img src={`${apiUrl}${photoUrl}`} alt={`${title} - photo`} />
        </div>
        <div className="TravelInfo__title-container">
          <h2>{title}</h2>
        </div>
      </header>

      <div className="TravelInfo__content">
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
