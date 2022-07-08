import React, { ChangeEvent, FormEvent } from 'react';
import './AccountSettingsConfirmForm.css';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { PasswordInput } from '../../common/PasswordInput/PasswordInput';

interface Props {
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  form: string;
}

export function AccountSettingsConfirmForm({ form, changeFormHandler, onSubmitHandler }: Props) {
  return (
    <form onSubmit={onSubmitHandler} className="AccountSettingsConfirmForm">
      <PasswordInput
        placeholder="Hasło"
        value={form}
        onChange={changeFormHandler}
        name="password"
      />

      <WhiteButton disabled={!form}>Zapisz</WhiteButton>
    </form>
  );
}
