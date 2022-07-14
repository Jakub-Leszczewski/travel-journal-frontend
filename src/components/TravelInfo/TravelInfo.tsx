import React from 'react';
import './TravelInfo.css';
import { InfoBarList } from '../InfoBarList/InfoBarList';
import { apiUrl } from '../../config';

interface Props {
  title: string,
  destination: string,
  startAt: Date,
  endAt: Date,
  comradesCount: number,
  description: string
  photoUrl: string
}

export function TravelInfo({
  title, destination, startAt, endAt, comradesCount, description, photoUrl,
}: Props) {
  return (
    <section className="TravelInfo">
      <header className="TravelInfo__header">
        <div className="TravelInfo__img-container">
          <img src={`${apiUrl}${photoUrl}`} alt={`${title}`} />
        </div>
        <div className="TravelInfo__title-container">
          <h2>{title}</h2>
        </div>
      </header>

      <div className="TravelInfo__content">
        <InfoBarList
          info={[
            { text: destination, bootstrapIconName: 'bi bi-geo-alt-fill' },
            {
              text: `${startAt.toLocaleDateString()} - ${endAt.toLocaleDateString()}`,
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
