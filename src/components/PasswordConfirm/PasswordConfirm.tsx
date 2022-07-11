import React, { ChangeEvent, FormEvent } from 'react';
import { AccountSettingsConfirmForm } from '../form/AccountSettingsConfirmForm/AccountSettingsConfirmForm';
import './PasswordConfirm.css';

interface Props {
  header: string;
  message: string | string[] | null;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onConfirmHandler: (e: FormEvent<HTMLFormElement>) => void;
  setConfirmHandler: (confirmVisible: boolean) => void;
  form: {
    password?: string;
  };
}

export function PasswordConfirm({
  message, form, header, changeFormHandler, onConfirmHandler, setConfirmHandler,
}: Props) {
  return (
    <section className="PasswordConfirm">
      <div className="PasswordConfirm__container">
        <p className="PasswordConfirm__header">{header}</p>
        {
          message instanceof Array
            ? message.map((e, i) => (<p key={i} className="PasswordConfirm__message">{e}</p>))
            : message && <p className="PasswordConfirm__message">{message}</p>
        }
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
