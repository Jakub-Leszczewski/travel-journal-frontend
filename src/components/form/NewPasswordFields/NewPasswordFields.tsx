import React, { ChangeEvent, useState } from 'react';
import './NewPasswordFields.css';
import { PasswordInput } from '../../common/PasswordInput/PasswordInput';
import { Validation } from '../../../utils/Validation';

interface Props {
    form: {
      newPassword: string;
      repeatNewPassword: string;
    }
    changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export function NewPasswordFields({ form, changeFormHandler }: Props) {
  const [passwordWasFocus, setPasswordWasFocus] = useState<boolean>(false);
  const [repeatPasswordWasFocus, setRepeatPasswordWasFocus] = useState<boolean>(false);

  const onPasswordBlur = () => {
    setPasswordWasFocus(true);
  };

  const onRepeatPasswordBlur = () => {
    setRepeatPasswordWasFocus(true);
  };

  return (
    <div className="NewPasswordFields">
      <div className="NewPasswordFields__error">
        {
          form.newPassword === form.repeatNewPassword || !repeatPasswordWasFocus
            ? null
            : (
              <p className="NewPasswordFields__validation-error">
                Hasła muszą być takie same.
              </p>
            )
        }
        {
          Validation.passwordValidation(form.newPassword)
          || !passwordWasFocus
          || (!form.newPassword && !form.repeatNewPassword)
            ? null
            : (
              <p className="NewPasswordFields__validation-error">
                Hasło powinno zawierać 8-36 znaków, co najmniej jedną małą i wielką literę i jedną cyfrę.
              </p>
            )
        }
      </div>

      <div className="NewPasswordFields__container">
        <PasswordInput
          value={form.newPassword}
          name="newPassword"
          onChange={changeFormHandler}
          placeholder="Nowe hasło"
          onBlur={onPasswordBlur}
          minLength={8}
          maxLength={36}
        />

        <PasswordInput
          value={form.repeatNewPassword}
          name="repeatNewPassword"
          onChange={changeFormHandler}
          placeholder="Powtórz nowe hasło"
          onBlur={onRepeatPasswordBlur}
          minLength={8}
          maxLength={36}
        />
      </div>
    </div>
  );
}
