import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import './LoginView.css';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorResponse, LoginResponse } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { LoginForm } from './LoginForm/LoginForm';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useSaveUserData } from '../../hooks/useSaveUserData';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

interface LoginData {
  username: string;
  password: string;
}

export function LoginView() {
  const navigate = useNavigate();
  const saveUserData = useSaveUserData();
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [form, setForm] = useState<LoginData>({
    username: '',
    password: '',
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { status, body } = await api<LoginResponse | ErrorResponse>(`${apiUrl}/auth/login`, {
      method: HttpMethod.POST,
      payload: form,
    });

    if (status === 200) {
      saveUserData(body as LoginResponse);
      navigate('/');
    } else if (body && 'message' in body) setMessage(body.message ?? null);
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
