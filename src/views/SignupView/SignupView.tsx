import React, { ChangeEvent, FormEvent, useState } from 'react';
import './SignupView.css';
import { Link, Navigate } from 'react-router-dom';
import { LoginResponse, ErrorResponse } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import { SignupForm } from '../../components/form/SignupForm/SignupForm';

interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export function SignupView() {
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [form, setForm] = useState<SignupData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const isAuth = useAuth();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { repeatPassword, ...createUserData } = form;
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
    <section className="SignupView">
      {isAuth && <Navigate to="/" />}
      {submitStatus === 201 && <Navigate to="/login" />}
      <ViewTitle>Rejestracja</ViewTitle>

      <div className="SignupView__container">
        {
          message instanceof Array
            ? message.map((e, i) => (<p key={i} className="SignupView_message">{e}</p>))
            : message && <p className="SignupView_message">{message}</p>
        }
        <SignupForm
          form={form}
          onSubmitHandler={onSubmitHandler}
          changeFormHandler={changeFormHandler}
        />
        <Link className="SignupView__TextButton" to="/login">Zaloguj się</Link>
      </div>
    </section>
  );
}
