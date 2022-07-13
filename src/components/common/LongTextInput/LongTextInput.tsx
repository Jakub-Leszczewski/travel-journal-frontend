import React, { ChangeEvent } from 'react';
import './LongTextInput.css';

interface Props {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  minLength?: number;
  maxLength?: number;
}

export function LongTextInput({
  value, onChange, placeholder, required, name, maxLength, minLength,
}: Props) {
  return (
    <textarea
      className="LongTextInput"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`${placeholder ?? ''}${required ? '*' : ''}`}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
  );
}
