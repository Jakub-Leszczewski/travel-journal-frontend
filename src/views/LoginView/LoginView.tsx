import React, { ChangeEvent, FormEvent, useState } from 'react';
import './LoginView.css';
import { Link, Navigate } from 'react-router-dom';
import { LoginResponse } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { LoginForm } from '../../components/form/LoginForm/LoginForm';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import { useSaveUserData } from '../../hooks/useSaveUserData';

interface LoginData {
  username: string;
  password: string;
}

export function LoginView() {
  const [form, setForm] = useState<LoginData>({
    username: '',
    password: '',
  });

  const isAuth = useAuth();
  const saveUserData = useSaveUserData();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { status, body } = await api<LoginResponse>(`${apiUrl}/auth/login`, {
      method: HttpMethod.POST,
      payload: form,
    });

    if (status === 200) saveUserData(body);
  };

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="LoginView">
      {isAuth && <Navigate to="/" />}
      <ViewTitle>Logowanie</ViewTitle>
      <LoginForm
        form={form}
        onSubmitHandler={onSubmitHandler}
        changeFormHandler={changeFormHandler}
      />
      <Link className="LoginView__TextButton" to="/signup">Stwórz konto</Link>
    </section>
  );
}
