import React, { useEffect, useState } from 'react';
import './MainNav.css';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { apiUrl } from '../../config';
import { UserNav } from './UserNav/UserNav';

export function MainNav() {
  const isAuth = useAuth();
  const userData = useUser();
  const [openNav, setOpenNav] = useState<boolean>(false);

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      if (
        event
          .composedPath()
          .filter((element) => (element as HTMLBodyElement).className === 'MainNav')
          .length === 0
      ) {
        setOpenNav(false);
      }
    });
  }, []);

  const toggleUserMenu = () => {
    setOpenNav((prev) => !prev);
  };

  const closeUserNav = () => {
    setOpenNav(false);
  };

  if (!isAuth) return null;

  return (
    <nav className="MainNav">
      <UserAvatar
        onClick={toggleUserMenu}
        imageUrl={userData?.avatar ? `${apiUrl}${userData.avatar}` : '/user.png'}
        alt="User photo"
      />

      {openNav && <UserNav closeUserNav={closeUserNav} />}
    </nav>
  );
}
