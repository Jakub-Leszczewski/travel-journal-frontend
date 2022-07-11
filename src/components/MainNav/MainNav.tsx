import React from 'react';
import './MainNav.css';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { apiUrl } from '../../config';

export function MainNav() {
  const isAuth = useAuth();
  const userData = useUser();

  if (!isAuth) return null;

  return (
    <nav className="MainNav">
      <UserAvatar
        imageUrl={userData?.avatar ? `${apiUrl}${userData.avatar}` : '/user.png'}
        alt="User photo"
      />
    </nav>
  );
}
