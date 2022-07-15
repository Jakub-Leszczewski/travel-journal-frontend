import React, {
  ChangeEvent, FormEvent,
} from 'react';
import './TravelForm.css';
import { CreateTravelDtoInterface } from 'types';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { LongTextInput } from '../../common/LongTextInput/LongTextInput';
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput';
import { DateBetweenFields } from '../DateBetweenFields/DateBetweenFields';
import { ComradesAndPhotoFields } from '../ComradesAndPhotoFields/ComradesAndPhotoFields';

interface Props {
  form: CreateTravelDtoInterface;
  required?: boolean;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  changeFromHandlerFile: (e: any) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  cancelHandler: () => void;
}

export function TravelForm({
  form, onSubmitHandler, changeFormHandler, changeFromHandlerFile, required, cancelHandler,
}: Props) {
  return (
    <form className="TravelForm" onSubmit={onSubmitHandler}>
      <ShortTextInput
        placeholder="Tytuł"
        name="title"
        onChange={changeFormHandler}
        value={form.title}
        minLength={2}
        maxLength={64}
        required={required}
      />

      <ShortTextInput
        placeholder="Cel podróży"
        name="destination"
        onChange={changeFormHandler}
        value={form.destination}
        minLength={2}
        maxLength={64}
        required={required}
      />

      <DateBetweenFields
        required
        changeFormHandler={changeFormHandler}
        form={{
          startAt: form.startAt,
          endAt: form.endAt,
        }}
      />

      <LongTextInput
        name="description"
        placeholder="Opis"
        value={form.description}
        onChange={changeFormHandler}
        minLength={0}
        maxLength={512}
      />

      <ComradesAndPhotoFields
        required={required}
        form={form}
        changeFormHandler={changeFormHandler}
        changeFromHandlerFile={changeFromHandlerFile}
      />

      <div className="TravelForm__button-container">
        <WhiteButton>Zapisz</WhiteButton>
        <WhiteButton
          onClick={cancelHandler}
          type="button"
        >
          Anuluj
        </WhiteButton>
      </div>
    </form>
  );
}
