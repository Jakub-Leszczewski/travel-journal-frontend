import React from 'react';
import './UserNav.css';
import { useNavigate } from 'react-router-dom';
import { MenuButton } from '../common/MenuButton/MenuButton';

interface Props {
  closeUserNav: () => void;
}

export function UserNav({ closeUserNav }: Props) {
  const navigate = useNavigate();

  const navigateTo = (url: string) => {
    closeUserNav();
    navigate(url);
  };

  const goHomeHandler = () => navigateTo('/');
  const goYourProfileHandler = () => navigateTo('/profile');
  const goAccountHandler = () => navigateTo('/account');
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
    </section>
  );
}
