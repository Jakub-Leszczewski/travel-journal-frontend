import React, { ChangeEvent } from 'react';
import { ShortTextInput } from '../ShortTextInput/ShortTextInput';
import './NameFields.css';

interface Props {
  form: {
    firstName: string;
    lastName: string;
  }
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export function NameFields({ form, changeFormHandler }: Props) {
  return (
    <div className="NameFields">
      <ShortTextInput
        value={form.firstName}
        name="firstName"
        onChange={changeFormHandler}
        placeholder="Imie"
        required
        minLength={2}
        maxLength={64}
      />

      <ShortTextInput
        value={form.lastName}
        name="lastName"
        onChange={changeFormHandler}
        placeholder="Nazwisko"
        required
        minLength={2}
        maxLength={64}
      />
    </div>
  );
}
