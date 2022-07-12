import React, {
  ChangeEvent, FormEvent,
} from 'react';
import './PostForm.css';
import { CreatePostDtoInterface } from 'types';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { LongTextInput } from '../../common/LongTextInput/LongTextInput';
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput';
import { FileInput } from '../../FileInput/FileInput';

interface Props {
  form: CreatePostDtoInterface;
  required?: boolean;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  changeFromHandlerFile: (e: any) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  cancelHandler: () => void;
}

export function PostForm({
  form, onSubmitHandler, changeFormHandler, changeFromHandlerFile, required, cancelHandler,
}: Props) {
  return (
    <form className="PostForm" onSubmit={onSubmitHandler}>
      <ShortTextInput
        placeholder="Tytuł"
        name="title"
        onChange={changeFormHandler}
        value={form.title}
        minLength={2}
        maxLength={128}
        required={required}
      />

      <ShortTextInput
        placeholder="Cel podróży"
        name="destination"
        onChange={changeFormHandler}
        value={form.destination}
        minLength={2}
        maxLength={128}
        required={required}
      />

      <LongTextInput
        name="description"
        placeholder="Opis"
        value={form.description}
        onChange={changeFormHandler}
        minLength={0}
        maxLength={512}
      />

      <FileInput
        file={form.photo}
        changeFormHandlerFile={changeFromHandlerFile}
        name="photo"
        placeholder="Dodaj zdjęcie"
      />

      <div className="PostForm__button-container">
        <WhiteButton>Zapisz</WhiteButton>
        <WhiteButton type="button" onClick={cancelHandler}>Anuluj</WhiteButton>
      </div>
    </form>
  );
}
