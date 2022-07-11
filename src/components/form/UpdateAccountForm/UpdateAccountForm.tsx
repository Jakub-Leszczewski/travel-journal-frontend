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
import { UpdateAccountFormInterface } from '../../../views/UserAccountView/UserAccountView';

interface Props {
  form: UpdateAccountFormInterface;

  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  changeFromHandlerFile: (e: any) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  cancelEdit: () => void;
}

export function UpdateAccountForm({
  form, onSubmitHandler, changeFormHandler, changeFromHandlerFile, cancelEdit,
}: Props) {
  const submitDisabled = (
    (form.newPassword && !Validation.passwordValidation(form.newPassword))
    || (form.newPassword !== form.repeatNewPassword)
  );

  return (
    <form className="UpdateAccountForm" onSubmit={onSubmitHandler}>
      <NameFields
        form={form}
        changeFormHandler={changeFormHandler}
      />

      <LongTextInput
        name="bio"
        placeholder="bio"
        value={form.bio}
        onChange={changeFormHandler}
        minLength={0}
        maxLength={512}
      />

      <NewPasswordFields
        form={form}
        changeFormHandler={changeFormHandler}
      />

      <FileInput
        file={form.photo}
        changeFormHandlerFile={changeFromHandlerFile}
        name="photo"
        placeholder="Dodaj zdjęcie profilowe"
      />

      <div className="UpdateAccountForm__buton-container">
        <WhiteButton disabled={submitDisabled}>Zapisz</WhiteButton>
        <WhiteButton type="button" onClick={cancelEdit}>Anuluj</WhiteButton>
      </div>
    </form>
  );
}
