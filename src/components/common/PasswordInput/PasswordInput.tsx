import React, { ChangeEvent } from 'react';
import './PasswordInput.css';

interface Props {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean
  name?: string;
}

export function PasswordInput({
  value, onChange, placeholder, required, name,
}: Props) {
  return (
    <input
      className="PasswordInput"
      name={name}
      value={value}
      onChange={onChange}
      type="password"
      placeholder={`${placeholder ?? ''}${required ? '*' : ''}`}
      required={required}
    />
  );
}
