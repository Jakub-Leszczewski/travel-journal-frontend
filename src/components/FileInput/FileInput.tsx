import React from 'react';
import './FileInput.css';

interface Props {
  name?: string
  file?: File,
  placeholder?: string;
  changeFormHandlerFile?: (e: any) => void;
}

export function FileInput({
  name, placeholder, file, changeFormHandlerFile,
}: Props) {
  console.log(file);
  return (
    <label className="FileInput">
      <i className="bi bi-camera-fill" />
      {!file ? placeholder || <div>Dodaj plik</div> : <div>{file.name}</div>}
      <input type="file" name={name} onChange={changeFormHandlerFile} />
    </label>
  );
}
