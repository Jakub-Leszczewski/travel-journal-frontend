import React, { ChangeEvent } from 'react';
import { ShortTextInput } from '../../../components/form/ShortTextInput/ShortTextInput';
import './FindFriendsForm.css';

interface Props {
  changeSearchInputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

export function FindFriendsForm({ changeSearchInputHandler, searchInput }: Props) {
  return (
    <form className="FindFriendsForm">
      <ShortTextInput
        value={searchInput}
        onChange={changeSearchInputHandler}
        placeholder="Szukaj znajomych"
      />
    </form>
  );
}
