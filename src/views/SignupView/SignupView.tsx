import React, { ChangeEvent, FormEvent, useState } from 'react';
import './SignupView.css';
import { Link, Navigate } from 'react-router-dom';
import { LoginResponse, ErrorResponse, CreateUserDtoInterface } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { SignupForm } from '../../components/form/SignupForm/SignupForm';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

type CreateUser = CreateUserDtoInterface & {repeatPassword: string};

export function SignupView() {
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [form, setForm] = useState<CreateUser>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { repeatPassword, ...createUserData } = form;
    const { status, body } = await api<LoginResponse | ErrorResponse>(`${apiUrl}/api/user`, {
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
    <main className="SignupView">

      <section className="SignupView__window">
        {submitStatus === 201 && <Navigate to="/login" />}
        <ViewTitle>Rejestracja</ViewTitle>

        <div className="SignupView__container">
          <ErrorMessage message={message} />
          <SignupForm
            form={form}
            onSubmitHandler={onSubmitHandler}
            changeFormHandler={changeFormHandler}
          />
          <Link className="SignupView__TextButton" to="/login">Zaloguj się</Link>
        </div>
      </section>

    </main>
  );
}
