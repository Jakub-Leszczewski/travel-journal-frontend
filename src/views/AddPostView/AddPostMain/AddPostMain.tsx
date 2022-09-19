import React, {
  ChangeEvent, FormEvent,
} from 'react';
import './AddPostMain.css';
import { CreatePostDtoInterface } from 'types';
import { ViewTitle } from '../../../components/ViewTitle/ViewTitle';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import { PostForm } from '../../../components/form/PostForm/PostForm';

interface Props {
  message: string | string[] | null;
  form: CreatePostDtoInterface;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  cancelHandler: () => void;
  changeFromHandlerFile: (e: any) => void;
}

export function AddPostMain({
  message, form, changeFormHandler, onSubmitHandler, cancelHandler, changeFromHandlerFile,
}: Props) {
  return (
    <main className="AddPostMain">
      <section className="AddPostMain__window">
        <ViewTitle>Nowy post</ViewTitle>
        <div className="AddPostMain__container">
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
