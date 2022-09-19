import React from 'react';
import { WhiteButton } from '../common/WhiteButton/WhiteButton';
import './RemoveConfirm.css';

interface Props {
  deleteHandler: () => void;
  turnOfConfirmWindowHandler: () => void;
}

export function RemoveConfirm({ deleteHandler, turnOfConfirmWindowHandler }: Props) {
  return (
    <section className="RemoveConfirm">
      <p>Czy na pewno chcesz to usunąć?</p>
      <div className="RemoveConfirm__button-container">
        <WhiteButton onClick={deleteHandler}>Tak</WhiteButton>
        <WhiteButton onClick={turnOfConfirmWindowHandler}>Nie</WhiteButton>
      </div>
    </section>
  );
}
