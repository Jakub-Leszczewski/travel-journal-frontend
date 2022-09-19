import React, { ChangeEvent, FormEvent } from 'react';
import './UpdatePostMain.css';
import { UpdatePostDtoInterface } from 'types';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { ViewTitle } from '../../../components/ViewTitle/ViewTitle';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import { PostForm } from '../../../components/form/PostForm/PostForm';

interface Props {
  postStatus: number | null;
  message: string | string[] | null;
  form: UpdatePostDtoInterface;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  changeFromHandlerFile: (e: any) => void;
  cancelHandler: () => void;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function UpdatePostMain({
  postStatus, message, form, onSubmitHandler, changeFromHandlerFile, cancelHandler, changeFormHandler,
}: Props) {
  return (
    <main className="UpdatePostMain">
      <section className="UpdatePostMain__window">
        {(postStatus === null) ? <LoadingSpinner /> : null}

        <ViewTitle>Edytuj post</ViewTitle>
        <div className="UpdatePostMain__container">
          <ErrorMessage message={message} />
          <PostForm
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
