import React, { ChangeEvent, FormEvent, useState } from 'react';
import './LoginView.css';
import { Link } from 'react-router-dom';
import { ErrorResponse, LoginResponse } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { LoginForm } from '../../components/form/LoginForm/LoginForm';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import { useSaveUserData } from '../../hooks/useSaveUserData';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

interface LoginData {
  username: string;
  password: string;
}

export function LoginView() {
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [form, setForm] = useState<LoginData>({
    username: '',
    password: '',
  });

  const isAuth = useAuth();
  const saveUserData = useSaveUserData();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { status, body } = await api<LoginResponse | ErrorResponse>(`${apiUrl}/api/auth/login`, {
      method: HttpMethod.POST,
      payload: form,
    });

    if (status === 200) saveUserData(body as LoginResponse);
    else if (body && 'message' in body) setMessage(body.message ?? null);
  };

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="LoginView">
      <section className="LoginView__window">
        <ViewTitle>Logowanie</ViewTitle>
        <div className="LoginView__container">
          <ErrorMessage message={message} />
          <LoginForm
            form={form}
            onSubmitHandler={onSubmitHandler}
            changeFormHandler={changeFormHandler}
          />
          <Link className="LoginView__TextButton" to="/signup">Stwórz konto</Link>
        </div>
      </section>
    </main>
  );
}
