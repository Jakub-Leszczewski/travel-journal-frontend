import React, { ChangeEvent, useState } from 'react';
import './NewPasswordFields.css';
import { PasswordInput } from '../../../components/form/PasswordInput/PasswordInput';

interface Props {
    form: {
      newPassword: string;
      repeatNewPassword: string;
    }
    changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export function NewPasswordFields({ form, changeFormHandler }: Props) {
  const [repeatPasswordWasFocus, setRepeatPasswordWasFocus] = useState<boolean>(false);

  const invalidPasswordInfo = 'Hasło powinno zawierać 8-36 znaków, co najmniej jedną małą, jedną wielką literę i'
    + ' jedną cyfrę';

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
      </div>

      <div className="NewPasswordFields__container">
        <PasswordInput
          value={form.newPassword}
          name="newPassword"
          onChange={changeFormHandler}
          placeholder="Nowe hasło"
          minLength={8}
          maxLength={36}
          pattern="((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          title={invalidPasswordInfo}
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
