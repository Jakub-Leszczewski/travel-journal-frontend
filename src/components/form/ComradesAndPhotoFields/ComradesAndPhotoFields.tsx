import React, { ChangeEvent } from 'react';
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput';
import './ComradesAndPhotoFields.css';
import { FileInput } from '../../FileInput/FileInput';

interface Props {
  form: {
    comradesCount: number;
    photo: any;
  };
  required?: boolean;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void
  changeFromHandlerFile: (e: any) => void;
}

export function ComradesAndPhotoFields({
  form, changeFormHandler, changeFromHandlerFile, required,
}: Props) {
  return (
    <div className="ComradesAndPhotoFields">
      <label>
        Towarzysze podróży:
        <ShortTextInput
          placeholder="Członkowie podróży"
          name="comradesCount"
          onChange={changeFormHandler}
          value={String(form.comradesCount)}
          min={0}
          max={9999}
          type="number"
          required={required}
        />
      </label>

      <label>
        Towarzysze podróży:

        <FileInput
          file={form.photo}
          changeFormHandlerFile={changeFromHandlerFile}
          name="photo"
          placeholder="Dodaj zdjęcie"
        />
      </label>
    </div>
  );
}
