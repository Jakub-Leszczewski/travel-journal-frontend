import React, { ChangeEvent } from 'react';
import { ShortTextInput } from '../../ShortTextInput/ShortTextInput';
import './DateBetweenFields.css';

interface Props {
  form: {
    startAt: string;
    endAt: string;
  };
  required?: boolean;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export function DateBetweenFields({ form, changeFormHandler, required }: Props) {
  return (
    <div className="DateBetweenFields">
      <label>
        od:
        <ShortTextInput
          value={form.startAt}
          name="startAt"
          onChange={changeFormHandler}
          required={required}
          type="date"
        />
      </label>

      <label>
        do:
        <ShortTextInput
          value={form.endAt}
          name="endAt"
          onChange={changeFormHandler}
          required={required}
          type="date"
        />
      </label>
    </div>
  );
}
