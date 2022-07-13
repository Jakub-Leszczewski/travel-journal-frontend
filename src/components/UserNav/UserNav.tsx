import React from 'react';
import './UserNav.css';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse, LogoutResponse } from 'types';
import { MenuButton } from '../common/MenuButton/MenuButton';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useSaveUserData } from '../../hooks/useSaveUserData';

interface Props {
  closeUserNav: () => void;
}

export function UserNav({ closeUserNav }: Props) {
  const navigate = useNavigate();
  const setUser = useSaveUserData();

  const navigateTo = (url: string) => {
    closeUserNav();
    navigate(url);
  };

  const goHomeHandler = () => navigateTo('/');
  const goYourProfileHandler = () => navigateTo('/profile');
  const goAccountHandler = () => navigateTo('/account');

  const logout = async () => {
    const { status } = await api<LogoutResponse | ErrorResponse>(`${apiUrl}/api/auth/logout`, {
      method: HttpMethod.DELETE,
    });

    if (status === 200) setUser(null);
  };
  return (
    <section className="UserNav">
      <MenuButton
        onClick={goHomeHandler}
        bootstrapIcon="bi bi-house-fill"
      >
        Strona główna
      </MenuButton>

      <MenuButton
        onClick={goYourProfileHandler}
        bootstrapIcon="bi bi-person-circle"
      >
        Twój profil
      </MenuButton>

      <MenuButton
        onClick={goAccountHandler}
        bootstrapIcon="bi bi-person-rolodex"
      >
        Twoje dane
      </MenuButton>

      <MenuButton
        onClick={logout}
        bootstrapIcon="bi bi-door-open-fill"
      >
        Wyloguj się
      </MenuButton>
    </section>
  );
}
