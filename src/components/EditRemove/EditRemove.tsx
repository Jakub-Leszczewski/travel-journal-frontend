import React, { useState } from 'react';
import './EditRemove.css';
import { Link } from 'react-router-dom';
import { WhiteButton } from '../common/WhiteButton/WhiteButton';

interface Props {
  deleteHandler?: () => void;
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
        {deleteHandler && <button onClick={turnOnConfirmWindowHandler}>usuń</button>}
        {editPageUrl && <Link to={editPageUrl}>edytuj</Link>}
      </div>

      {
        isConfirm && (
          <section className="EditRemove__confirm">
            <p>Czy na pewno chcesz to usunąć?</p>
            <div className="EditRemove__button-container">
              <WhiteButton onClick={deleteHandler}>Tak</WhiteButton>
              <WhiteButton onClick={turnOfConfirmWindowHandler}>Nie</WhiteButton>
            </div>
          </section>
        )
      }
    </>

  );
}
