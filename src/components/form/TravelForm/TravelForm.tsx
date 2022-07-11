import React, {
  ChangeEvent, FormEvent,
} from 'react';
import './TravelForm.css';
import { WhiteButton } from '../../common/WhiteButton/WhiteButton';
import { LongTextInput } from '../../common/LongTextInput/LongTextInput';
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput';
import { DateBetweenFields } from '../DateBetweenFields/DateBetweenFields';
import { ComradesAndPhotoFields } from '../ComradesAndPhotoFields/ComradesAndPhotoFields';

interface Props {
  form: {
    title: string;
    destination: string;
    description: string;
    travelStartAt: string;
    travelEndAt: string;
    comradesCount: number;
    photo: any;
  }

  required?: boolean;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  changeFromHandlerFile: (e: any) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export function TravelForm({
  form, onSubmitHandler, changeFormHandler, changeFromHandlerFile, required,
}: Props) {
  return (
    <form className="TravelForm" onSubmit={onSubmitHandler}>
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

      <DateBetweenFields
        required
        changeFormHandler={changeFormHandler}
        form={{
          startAt: form.travelStartAt,
          endAt: form.travelEndAt,
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

      <WhiteButton>Zapisz</WhiteButton>
    </form>
  );
}
