import React, {
  ChangeEvent, FormEvent,
} from 'react';
import './SignupView.css';
import { Link } from 'react-router-dom';
import { CreateUserDtoInterface } from 'types';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import { SignupForm } from '../SignupForm/SignupForm';
import { ViewTitle } from '../../../components/ViewTitle/ViewTitle';

type CreateUser = CreateUserDtoInterface & {repeatPassword: string};

interface Props {
  message: string | string[] | null;
  form: CreateUser;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function SignupMain({
  message, form, changeFormHandler, onSubmitHandler,
}: Props) {
  return (
    <main className="SignupMain">
      <section className="SignupMain__window">
        <ViewTitle>Rejestracja</ViewTitle>

        <div className="SignupMain__container">
          <ErrorMessage message={message} />
          <SignupForm
            form={form}
            onSubmitHandler={onSubmitHandler}
            changeFormHandler={changeFormHandler}
          />
          <Link className="SignupMain__TextButton" to="/login">Zaloguj się</Link>
        </div>
      </section>
    </main>
  );
}
