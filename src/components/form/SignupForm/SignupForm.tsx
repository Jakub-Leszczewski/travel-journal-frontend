import React, { ChangeEvent, FormEvent } from 'react';
import './SignupForm.css';
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput';
import { PasswordInput } from '../../common/PasswordInput/PasswordInput';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { NameFields } from '../NamesFields/NameFields';
import { PasswordFields } from '../PasswordFields/PasswordFields';

interface Props {
  form: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
  }

  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export function SignupForm({ form, onSubmitHandler, changeFormHandler }: Props) {
  return (
    <form className="SignupForm" onSubmit={onSubmitHandler}>
      <NameFields
        form={form}
        changeFormHandler={changeFormHandler}
      />
      <ShortTextInput
        value={form.username}
        name="username"
        onChange={changeFormHandler}
        placeholder="Nazwa użytkownika"
        required
        minLength={2}
        maxLength={64}
      />

      <ShortTextInput
        value={form.email}
        name="email"
        type="email"
        onChange={changeFormHandler}
        placeholder="Email"
        minLength={3}
        maxLength={255}
        required
      />

      <PasswordFields
        form={form}
        changeFormHandler={changeFormHandler}
      />

      <WhiteButton>Stwórz konto</WhiteButton>
    </form>
  );
}
