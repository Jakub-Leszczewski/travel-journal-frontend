import React from 'react';
import './ErrorMessage.css';

interface Props {
  message: string[] | string | null;
}

export function ErrorMessage({ message }: Props) {
  return (
    <div className="ErrorMessage">
      {
        message instanceof Array
          ? message.map((e, i) => (<p key={i} className="ErrorMessage_message">{e}</p>))
          : message && <p className="ErrorMessage_message">{message}</p>
      }
    </div>
  );
}
