import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginResponse, ErrorResponse, CreateUserDtoInterface } from 'types';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { SignupMain } from './SignupMain/SignupMain';

type CreateUser = CreateUserDtoInterface & {repeatPassword: string};

export function SignupView() {
  const navigate = useNavigate();
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
    const { status, body } = await api<LoginResponse | ErrorResponse>(`${apiUrl}/user`, {
      method: HttpMethod.POST,
      payload: createUserData,
    });

    if (status !== 201 && body && 'message' in body) {
      setMessage(body.message ?? null);
    }

    if (status === 201) navigate('/login');
  };

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <SignupMain
      message={message}
      form={form}
      changeFormHandler={changeFormHandler}
      onSubmitHandler={onSubmitHandler}
    />
  );
}
