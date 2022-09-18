import React, {
  ChangeEvent, FormEvent,
} from 'react';
import './UpdateAccountForm.css';
import { WhiteButton } from '../../../components/common/WhiteButton/WhiteButton';
import { NameFields } from '../../../components/form/NamesFields/NameFields';
import { NewPasswordFields } from '../NewPasswordFields/NewPasswordFields';
import { LongTextInput } from '../../../components/form/LongTextInput/LongTextInput';
import { FileInput } from '../../../components/form/FileInput/FileInput';
import { UpdateAccountFormInterface } from '../UserAccountView';

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
        <WhiteButton disabled={form.newPassword !== form.repeatNewPassword}>Zapisz</WhiteButton>
        <WhiteButton type="button" onClick={cancelEdit}>Anuluj</WhiteButton>
      </div>
    </form>
  );
}
