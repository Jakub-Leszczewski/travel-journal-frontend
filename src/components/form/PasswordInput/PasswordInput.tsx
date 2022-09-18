import React, { ChangeEvent } from 'react';
import './PasswordInput.css';

interface Props {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean
  name?: string;
  pattern?: string,
  title?: string,
  maxLength?: number;
  minLength?: number;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput({
  value, onChange, placeholder, required, name, onFocus, onBlur, maxLength, minLength, pattern, title,
}: Props) {
  return (
    <input
      className="PasswordInput"
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
      value={value}
      onChange={onChange}
      type="password"
      placeholder={`${placeholder ?? ''}${required ? '*' : ''}`}
      required={required}
      pattern={pattern}
      title={title}
    />
  );
}
