import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorResponse, LoginDtoInterface, LoginResponse } from 'types';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useSaveUserData } from '../../hooks/useSaveUserData';
import { LoginMain } from './LoginMain/LoginMain';

export function LoginView() {
  const navigate = useNavigate();
  const saveUserData = useSaveUserData();
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [form, setForm] = useState<LoginDtoInterface>({
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
    <LoginMain
      message={message}
      form={form}
      changeFormHandler={changeFormHandler}
      onSubmitHandler={onSubmitHandler}
    />
  );
}
