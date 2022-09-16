import React from 'react';
import './PostIndex.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../config';
import { InfoBarList } from '../../../components/InfoBarList/InfoBarList';
import { UserHeader } from '../UserHeader/UserHeader';
import { IconButtonBlack } from '../../../components/common/IconButtonBlack/IconButtonBlack';

interface Props {
  postTitle: string;
  postPhotoUrl: string;
  postDestination: string;
  postCreatedAt: Date;
  postDescription: string;
  userFirstName: string;
  userLastName: string;
  userPhotoUrl: string;
  userId: string;
  travelId: string;
}

export function PostIndex({
  postTitle, postPhotoUrl, postDestination, postCreatedAt, postDescription, userFirstName, userLastName, userPhotoUrl, userId, travelId,
}: Props) {
  const navigate = useNavigate();

  const goTravelHandler = () => {
    navigate(`/travel/${travelId}`);
  };
  return (
    <div className="PostIndex">
      <UserHeader
        imageUrl={`${apiUrl}${userPhotoUrl}`}
        firstName={userFirstName}
        lastName={userLastName}
        userId={userId}
      />

      <IconButtonBlack
        onClick={goTravelHandler}
        bootstrapIcon="bi bi-geo-alt-fill"
      />
      <header className="PostIndex__header">
        <div className="PostIndex__img-container">
          <img src={postPhotoUrl} alt={`${postTitle}`} />
        </div>
        <div className="PostIndex__title-container">
          <h2>{postTitle}</h2>
        </div>
      </header>

      <div className="PostIndex__content">
        <InfoBarList
          info={[
            { text: postDestination, bootstrapIconName: 'bi bi-geo-alt-fill' },
            {
              text: `${postCreatedAt.toLocaleDateString()}`,
              bootstrapIconName: 'bi bi-calendar-week-fill',
            },
            { text: postDescription, bootstrapIconName: 'bi bi-chat-dots-fill' },
          ]}
        />
      </div>
    </div>
  );
}
