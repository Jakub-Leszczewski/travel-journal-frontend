import React, { ChangeEvent, useState } from 'react';
import './PasswordFields.css';
import { PasswordInput } from '../../../components/form/PasswordInput/PasswordInput';

interface Props {
    form: {
        password: string;
        repeatPassword: string;
    }
    changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export function PasswordFields({ form, changeFormHandler }: Props) {
  const [repeatPasswordWasFocus, setRepeatPasswordWasFocus] = useState<boolean>(false);

  const invalidPasswordInfo = 'Hasło powinno zawierać 8-36 znaków, co najmniej jedną małą, jedną wielką literę i'
    + ' jedną cyfrę';

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
      </div>

      <div className="PasswordFields__container">
        <PasswordInput
          value={form.password}
          name="password"
          onChange={changeFormHandler}
          placeholder="Hasło"
          minLength={8}
          maxLength={36}
          required
          pattern="((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          title={invalidPasswordInfo}
        />

        <PasswordInput
          value={form.repeatPassword}
          name="repeatPassword"
          onChange={changeFormHandler}
          placeholder="Powtórz hasło"
          onBlur={onRepeatPasswordBlur}
          minLength={8}
          maxLength={36}
          required
        />
      </div>
    </div>
  );
}
