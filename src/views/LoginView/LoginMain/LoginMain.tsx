import React, { ChangeEvent, FormEvent } from 'react';
import './LoginMain.css';
import { Link } from 'react-router-dom';
import { LoginDtoInterface } from 'types';
import { ViewTitle } from '../../../components/ViewTitle/ViewTitle';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import { LoginForm } from '../LoginForm/LoginForm';

interface Props {
  message: string | string[] | null;
  form: LoginDtoInterface;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function LoginMain({
  form, message, changeFormHandler, onSubmitHandler,
}: Props) {
  return (
    <main className="LoginMain">
      <section className="LoginMain__window">
        <ViewTitle>Logowanie</ViewTitle>
        <div className="LoginMain__container">
          <ErrorMessage message={message} />
          <LoginForm
            form={form}
            onSubmitHandler={onSubmitHandler}
            changeFormHandler={changeFormHandler}
          />
          <Link className="LoginMain__TextButton" to="/signup">Stwórz konto</Link>
        </div>
      </section>
    </main>
  );
}
