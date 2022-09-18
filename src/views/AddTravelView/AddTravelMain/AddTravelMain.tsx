import React, {
  ChangeEvent, FormEvent,
} from 'react';
import './AddTravelMain.css';
import { CreateTravelDtoInterface } from 'types';
import { ViewTitle } from '../../../components/ViewTitle/ViewTitle';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import { TravelForm } from '../../../components/form/TravelForm/TravelForm';

interface Props {
  message: string | string[] | null;
  form: CreateTravelDtoInterface;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  changeFromHandlerFile: (e: any) => void;
  cancelHandler: () => void;
}

export function AddTravelMain({
  message, changeFormHandler, onSubmitHandler, form, changeFromHandlerFile, cancelHandler,
}: Props) {
  return (
    <main className="AddTravelMain">
      <section className="AddTravelMain__window">
        <ViewTitle>Nowa podróż</ViewTitle>
        <div className="AddTravelMain__container">
          <ErrorMessage message={message} />
          <TravelForm
            required
            cancelHandler={cancelHandler}
            changeFromHandlerFile={changeFromHandlerFile}
            onSubmitHandler={onSubmitHandler}
            changeFormHandler={changeFormHandler}
            form={form}
          />
        </div>
      </section>
    </main>
  );
}
