import React, { ChangeEvent, FormEvent } from 'react';
import { UpdateTravelDtoInterface } from 'types';
import './UpdateTravelView.css';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { ViewTitle } from '../../../components/ViewTitle/ViewTitle';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import { TravelForm } from '../../../components/form/TravelForm/TravelForm';

interface Props {
  travelStatus: number | null;
  message: string | string[] | null;
  form: UpdateTravelDtoInterface;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  changeFromHandlerFile: (e: any) => void;
  cancelHandler: () => void;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function UpdateTravelMain({
  travelStatus, message, cancelHandler, changeFormHandler, changeFromHandlerFile, onSubmitHandler, form,
}: Props) {
  return (
    <main className="UpdateTravelMain">
      <section className="UpdateTravelMain__window">
        {(travelStatus === null) ? <LoadingSpinner /> : null}

        <ViewTitle>Edytuj podróż</ViewTitle>
        <div className="UpdateTravelMain__container">
          <ErrorMessage message={message} />
          <TravelForm
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
