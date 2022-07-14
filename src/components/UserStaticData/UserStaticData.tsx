import React from 'react';
import './UserStaticData.css';
import { InfoBarList } from '../InfoBarList/InfoBarList';
import { UserAvatar } from '../UserAvatar/UserAvatar';

interface Props {
  travelsCount: number;
  postsCount: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export function UserStaticData({
  firstName, lastName, imageUrl, email, travelsCount, postsCount,
}: Props) {
  return (
    <div className="UserStaticData">
      <UserAvatar
        alt="user photo"
        imageUrl={imageUrl}
      />
      <h2 className="UserStaticData__name">{`${firstName} ${lastName}`}</h2>
      <InfoBarList
        info={[
          { text: `podróże - ${travelsCount}`, bootstrapIconName: 'bi bi-signpost-fill' },
          { text: `wpisy - ${postsCount}`, bootstrapIconName: 'bi bi-postcard-heart-fill' },
          { text: email, bootstrapIconName: 'bi bi-envelope-open-fill' },
        ]}
      />
    </div>
  );
}
