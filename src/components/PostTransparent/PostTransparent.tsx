import React from 'react';
import './PostTransparent.css';
import { useParams } from 'react-router-dom';
import { DeletePostResponse, ErrorResponse } from 'types';
import { apiUrl } from '../../config';
import { UserInfo } from '../UserInfo/UserInfo';
import { EditRemove } from '../EditRemove/EditRemove';
import { api, HttpMethod } from '../../utils/api';

interface Props {
  id: string;
  title: string;
  destination: string;
  createdAt: Date;
  description: string;
  photoUrl: string;

  refreshPostHandler: () => void;
  excludePost: (postId: string) => void;
}

export function PostTransparent({
  id, title, destination, description, createdAt, photoUrl, refreshPostHandler, excludePost,
}: Props) {
  const deleteHandler = async () => {
    const { status, body } = await api<DeletePostResponse | ErrorResponse>(`${apiUrl}/api/post/${id}`, {
      method: HttpMethod.DELETE,
    });

    console.log(status);

    refreshPostHandler();
  };

  return (
    <section className="PostTransparent">
      <EditRemove
        editPageUrl={`/post/${id}/edit`}
        deleteHandler={() => {
          deleteHandler();
          excludePost(id);
        }}
      />
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
