import React, { ChangeEvent, useState } from 'react';
import './PasswordFields.css';
import { PasswordInput } from '../../common/PasswordInput/PasswordInput';
import { Validation } from '../../../utils/Validation';

interface Props {
    form: {
        password: string;
        repeatPassword: string;
    }
    changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export function PasswordFields({ form, changeFormHandler }: Props) {
  const [passwordWasFocus, setPasswordWasFocus] = useState<boolean>(false);
  const [repeatPasswordWasFocus, setRepeatPasswordWasFocus] = useState<boolean>(false);

  const onPasswordBlur = () => {
    setPasswordWasFocus(true);
  };

  const onRepeatPasswordBlur = () => {
    setRepeatPasswordWasFocus(true);
  };

  return (
    <div className="PasswordFields">
      <div className="PasswordFields__error">
        {
          form.password === form.repeatPassword || !repeatPasswordWasFocus
            ? null
            : (
              <p className="PasswordInputFields__validation-error">
                Hasła muszą być takie same.
              </p>
            )
        }
        {
          Validation.passwordValidation(form.password) || !passwordWasFocus
            ? null
            : (
              <p className="PasswordInputFields__validation-error">
                Hasło powinno zawierać 8-36 znaków, co najmniej jedną małą i wielką literę i jedną cyfrę.
              </p>
            )
        }
      </div>

      <div className="PasswordFields__container">
        <PasswordInput
          value={form.password}
          name="password"
          onChange={changeFormHandler}
          placeholder="Hasło"
          onBlur={onPasswordBlur}
          required
        />

        <PasswordInput
          value={form.repeatPassword}
          name="repeatPassword"
          onChange={changeFormHandler}
          placeholder="Powtórz hasło"
          onBlur={onRepeatPasswordBlur}
          required
        />
      </div>
    </div>
  );
}
