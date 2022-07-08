import React, {
  ChangeEvent, FormEvent, useMemo, useState,
} from 'react';
import './UpdateAccountForm.css';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { NameFields } from '../NamesFields/NameFields';
import { NewPasswordFields } from '../NewPasswordFields/NewPasswordFields';
import { LongTextInput } from '../../common/LongTextInput/LongTextInput';
import { Validation } from '../../../utils/Validation';

interface Props {
  form: {
    firstName: string;
    lastName: string;
    newPassword: string;
    repeatNewPassword: string;
    password: string;
    bio: string
  }

  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export function UpdateAccountForm({ form, onSubmitHandler, changeFormHandler }: Props) {
  const submitDisabled = (
    (form.newPassword && !Validation.passwordValidation(form.newPassword))
    || (form.newPassword !== form.repeatNewPassword)
  );

  return (
    <form className="SignupForm" onSubmit={onSubmitHandler}>
      <NameFields
        form={form}
        changeFormHandler={changeFormHandler}
      />

      <LongTextInput
        name="bio"
        placeholder="bio"
        value={form.bio}
        onChange={changeFormHandler}
      />

      <NewPasswordFields
        form={form}
        changeFormHandler={changeFormHandler}
      />

      <WhiteButton disabled={submitDisabled}>Zapisz</WhiteButton>
    </form>
  );
}
