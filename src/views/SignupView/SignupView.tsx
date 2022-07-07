import React, { ChangeEvent, FormEvent, useState } from 'react';
import './SignupView.css';
import { Link, Navigate } from 'react-router-dom';
import { LoginResponse } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import { useSaveUserData } from '../../hooks/useSaveUserData';
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
    const { status } = await api<LoginResponse>(`${apiUrl}/user`, {
      method: HttpMethod.POST,
      payload: createUserData,
    });

    setSubmitStatus(status);
  };

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
      <SignupForm
        form={form}
        onSubmitHandler={onSubmitHandler}
        changeFormHandler={changeFormHandler}
      />
      <Link className="SignupView__TextButton" to="/login">Zaloguj się</Link>
    </section>
  );
}
