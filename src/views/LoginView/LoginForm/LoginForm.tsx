import React, { ChangeEvent, FormEvent } from 'react';
import './LoginForm.css';
import { ShortTextInput } from '../../../components/form/ShortTextInput/ShortTextInput';
import { PasswordInput } from '../../../components/form/PasswordInput/PasswordInput';
import { WhiteButton } from '../../../components/common/WhiteButton/WhiteButton';

interface Props {
  form: {
    username: string;
    password: string;
  }

  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({ form, onSubmitHandler, changeFormHandler }: Props) {
  return (
    <form className="LoginForm" onSubmit={onSubmitHandler}>
      <ShortTextInput
        value={form.username}
        name="username"
        onChange={changeFormHandler}
        placeholder="Nazwa użytkownika"
        required
      />

      <PasswordInput
        value={form.password}
        name="password"
        onChange={changeFormHandler}
        placeholder="Hasło"
        required
      />

      <WhiteButton>Zaloguj się</WhiteButton>
    </form>
  );
}
