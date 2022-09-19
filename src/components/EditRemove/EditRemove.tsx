import React, { useState } from 'react';
import './EditRemove.css';
import { Link } from 'react-router-dom';
import { RemoveConfirm } from '../RemoveConfirm/RemoveConfirm';

interface Props {
  deleteHandler: () => void;
  editPageUrl?: string;
}

export function EditRemove({ deleteHandler, editPageUrl }: Props) {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const turnOfConfirmWindowHandler = () => {
    setIsConfirm(false);
  };

  const turnOnConfirmWindowHandler = () => {
    setIsConfirm(true);
  };

  return (
    <>
      <div className="EditRemove">
        <button onClick={turnOnConfirmWindowHandler}>usuń</button>
        {editPageUrl && <Link to={editPageUrl}>edytuj</Link>}
      </div>

      {
        isConfirm && (
          <RemoveConfirm
            deleteHandler={deleteHandler}
            turnOfConfirmWindowHandler={turnOfConfirmWindowHandler}
          />
        )
      }
    </>

  );
}
