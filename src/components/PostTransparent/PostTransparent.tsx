import React from 'react';
import './PostTransparent.css';
import { DeletePostResponse, ErrorResponse } from 'types';
import { apiUrl } from '../../config';
import { InfoBarList } from '../InfoBarList/InfoBarList';
import { EditRemove } from '../EditRemove/EditRemove';
import { api, HttpMethod } from '../../utils/api';
import { useUser } from '../../hooks/useUser';

interface Props {
  id: string;
  title: string;
  destination: string;
  createdAt: Date;
  description: string;
  photoUrl: string;
  authorId: string;

  refreshPostHandler: () => void;
  excludePost: (postId: string) => void;
}

export function PostTransparent({
  id, title, destination, description, createdAt, photoUrl, refreshPostHandler, excludePost, authorId,
}: Props) {
  const user = useUser();

  const deleteHandler = async () => {
    const { status, body } = await api<DeletePostResponse | ErrorResponse>(`${apiUrl}/post/${id}`, {
      method: HttpMethod.DELETE,
    });

    refreshPostHandler();
  };

  return (
    <section className="PostTransparent">
      {
        user?.id === authorId && (
          <EditRemove
            editPageUrl={`/post/${id}/edit`}
            deleteHandler={() => {
              deleteHandler();
              excludePost(id);
            }}
          />
        )
      }
      <header className="PostTransparent__header">
        <div className="PostTransparent__title-container">
          <h3>{title}</h3>
        </div>

        <div className="PostTransparent__img-container">
          <img src={`${apiUrl}${photoUrl}`} alt={`${title}`} />
        </div>
      </header>

      <div className="PostTransparent__content">
        <InfoBarList
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
