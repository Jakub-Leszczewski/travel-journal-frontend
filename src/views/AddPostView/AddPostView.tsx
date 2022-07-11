import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import './AddPostView.css';
import { CreatePostDtoInterface, CreateTravelDtoInterface, ErrorResponse } from 'types';
import { Navigate, useParams } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { apiFormData } from '../../utils/apiFormData';
import { apiUrl } from '../../config';
import { HttpMethod } from '../../utils/api';
import { CreateFormData } from '../../utils/create-form-data';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { PostForm } from '../../components/form/PostForm/PostForm';

export function AddPostView() {
  const params = useParams();
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);

  const initialForm: CreatePostDtoInterface = {
    title: '',
    destination: '',
    description: '',
    photo: undefined,
  };

  const [form, setForm] = useState<CreatePostDtoInterface>(initialForm);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = CreateFormData.createFormData(form);
    const { status, body } = await apiFormData<CreateTravelDtoInterface | ErrorResponse>(
      `${apiUrl}/api/travel/${params.id}/post`,
      {
        method: HttpMethod.POST,
        payload: formData,
      },
    );

    if (status !== 201 && body && 'message' in body) {
      setMessage(body.message ?? null);
    }

    setSubmitStatus(status);
  };

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(null);
    setMessage(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changeFromHandlerFile = (e: any) => {
    setMessage(null);
    setMessage(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  return (
    <main className="AddPostView">
      {submitStatus === 201 && <Navigate to={`/travel/${params.id}`} />}
      <section className="AddPostView__window">
        <ViewTitle>Nowy post</ViewTitle>
        <div className="AddPostView__container">
          <ErrorMessage message={message} />
          <PostForm
            required
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
