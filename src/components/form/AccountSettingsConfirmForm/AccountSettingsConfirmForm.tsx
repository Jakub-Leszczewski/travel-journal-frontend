import React, { ChangeEvent, FormEvent } from 'react';
import './AccountSettingsConfirmForm.css';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { PasswordInput } from '../../common/PasswordInput/PasswordInput';

interface Props {
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  canceHandler: () => void;
  form: {
    password?: string;
  };
}

export function AccountSettingsConfirmForm({
  form, changeFormHandler, onSubmitHandler, canceHandler,
}: Props) {
  return (
    <form onSubmit={onSubmitHandler} className="AccountSettingsConfirmForm">
      <PasswordInput
        placeholder="Hasło"
        value={form.password}
        onChange={changeFormHandler}
        name="password"
      />

      <div className="AccountSettingsConfirmForm__button-container">
        <WhiteButton disabled={!form}>Zapisz</WhiteButton>
        <WhiteButton onClick={canceHandler} type="button">Anuluj</WhiteButton>
      </div>
    </form>
  );
}
