import React, { ChangeEvent, FormEvent } from 'react';
import { AccountSettingsConfirmForm } from '../form/AccountSettingsConfirmForm/AccountSettingsConfirmForm';
import './PasswordConfirm.css';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

interface Props {
  header: string;
  message: string | string[] | null;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onConfirmHandler: (e: FormEvent<HTMLFormElement>) => void;
  setConfirmHandler: (confirmVisible: boolean) => void;
  form: {
    password: string;
  };
}

export function PasswordConfirm({
  message, form, header, changeFormHandler, onConfirmHandler, setConfirmHandler,
}: Props) {
  return (
    <section className="PasswordConfirm">
      <div className="PasswordConfirm__container">
        <p className="PasswordConfirm__header">{header}</p>
        <ErrorMessage message={message} />
        <AccountSettingsConfirmForm
          form={form}
          changeFormHandler={changeFormHandler}
          onSubmitHandler={onConfirmHandler}
          canceHandler={() => setConfirmHandler(false)}
        />
      </div>
    </section>
  );
}
