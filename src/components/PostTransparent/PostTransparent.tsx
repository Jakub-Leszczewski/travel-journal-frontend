import React from 'react';
import './PostTransparent.css';
import { apiUrl } from '../../config';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  title: string,
  destination: string,
  createdAt: Date,
  description: string
  photoUrl: string
}

export function PostTransparent({
  title, destination, description, createdAt, photoUrl,
}: Props) {
  return (
    <section className="PostTransparent">
      <header className="PostTransparent__header">
        <div className="PostTransparent__title-container">
          <h3>{title}</h3>
        </div>

        <div className="PostTransparent__img-container">
          <img src={`${apiUrl}${photoUrl}`} alt={`${title} - photo`} />
        </div>
      </header>

      <div className="PostTransparent__content">
        <UserInfo
          info={[
            { text: destination, bootstrapIconName: 'bi bi-geo-alt-fill' },
            { text: createdAt.toLocaleDateString(), bootstrapIconName: 'bi bi-calendar-week-fill' },
            { text: description, bootstrapIconName: 'bi bi-chat-dots-fill' },
          ]}
        />
      </div>
    </section>
  );
}
