import React, { ChangeEvent, FormEvent, useState } from 'react';
import './UserAccountView.css';
import { Link, Navigate } from 'react-router-dom';
import { LoginResponse, ErrorResponse } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { InfoBar } from '../../components/InfoBar/InfoBar';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { UserStaticData } from '../../components/UserStaticData/UserStaticData';

interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  newPassword: string;
  repeatNewPassword: string;
  password: string;
}

export function UserAccountView() {
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [form, setForm] = useState<SignupData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    newPassword: '',
    repeatNewPassword: '',
    password: '',
  });

  const isAuth = useAuth();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { repeatNewPassword, ...createUserData } = form;
    const { status, body } = await api<LoginResponse | ErrorResponse>(`${apiUrl}/user`, {
      method: HttpMethod.POST,
      payload: createUserData,
    });

    if (status !== 201 && body && 'message' in body) {
      setMessage(body.message ?? null);
    }
    setSubmitStatus(status);
  };

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="UserAccountView">
      {!isAuth && <Navigate to="/login" />}
      <ViewTitle>Twoje konto</ViewTitle>

      <div className="UserAccountView__container">
        <UserStaticData
          email="jakubxleszczewski@gmail.com"
          firstName="Jakub"
          lastName="Leszczewski"
          imageUrl=""
          postsCount={43}
          travelsCount={12}
        />

        <InfoBar
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget commodo sapien. Proin ipsum risus, eleifend vel sodales id, bibendum ac ex. Morbi gravida mollis orci, non rutrum magna. Quisque a dolor quis est ornare efficitur. Quisque lorem nunc, feugiat at finibus vitae, venenatis sed felis. Nam orci libero, pulvinar quis mollis et, rhoncus in sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget commodo sapien. Proin ipsum risus, eleifend vel sodales id, bibendum"
          bootstrapIconName="bi bi-chat-dots-fill"
        />
      </div>
    </section>
  );
}
