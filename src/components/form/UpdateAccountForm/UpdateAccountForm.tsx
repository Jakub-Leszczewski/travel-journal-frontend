import React, {
  ChangeEvent, FormEvent,
} from 'react';
import './UpdateAccountForm.css';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { NameFields } from '../NamesFields/NameFields';
import { NewPasswordFields } from '../NewPasswordFields/NewPasswordFields';
import { LongTextInput } from '../../common/LongTextInput/LongTextInput';
import { Validation } from '../../../utils/Validation';
import { FileInput } from '../../FileInput/FileInput';

interface Props {
  form: {
    firstName: string;
    lastName: string;
    newPassword: string;
    repeatNewPassword: string;
    password: string;
    bio: string
    file: any
  }

  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  changeFromHandlerFile: (e: any) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export function UpdateAccountForm({
  form, onSubmitHandler, changeFormHandler, changeFromHandlerFile,
}: Props) {
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

      <FileInput
        file={form.file}
        changeFormHandlerFile={changeFromHandlerFile}
        name="file"
        placeholder="Dodaj zdjęcie profilowe"
      />

      <WhiteButton disabled={submitDisabled}>Zapisz</WhiteButton>
    </form>
  );
}
