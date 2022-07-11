import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import './UpdatePostView.css';
import {
  ErrorResponse, GetPostResponse, UpdatePostDtoInterface, UpdateTravelResponse,
} from 'types';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { apiFormData } from '../../utils/apiFormData';
import { apiUrl } from '../../config';
import { HttpMethod } from '../../utils/api';
import { CreateFormData } from '../../utils/create-form-data';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { PostForm } from '../../components/form/PostForm/PostForm';
import { useApi } from '../../hooks/useApi';

export function UpdatePostView() {
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [postStatus, postBody] = useApi<GetPostResponse | ErrorResponse>(`${apiUrl}/api/post/${params.id}`);

  const initialForm: UpdatePostDtoInterface = {
    title: '',
    destination: '',
    description: '',
    photo: undefined,
  };

  const [form, setForm] = useState<UpdatePostDtoInterface>(initialForm);

  useEffect(() => {
    if (postStatus === 200 && postBody && !('error' in postBody)) {
      setForm((prev) => ({
        ...prev,
        title: postBody.title,
        destination: postBody.destination,
        description: postBody.description,
      }));
    }
  }, [postBody]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = CreateFormData.createFormData(form);
    const { status, body } = await apiFormData<UpdateTravelResponse | ErrorResponse>(
      `${apiUrl}/api/post/${params.id}`,
      {
        method: HttpMethod.PATCH,
        payload: formData,
      },
    );

    if (status !== 200 && body && 'message' in body) {
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
    <main className="UpdatePostView">
      {
        submitStatus === 200
        && postStatus === 200
        && postBody
        && !('error' in postBody)
        && <Navigate to={`/travel/${postBody.travelId}`} />
      }
      <section className="UpdatePostView__window">
        <ViewTitle>Edytuj post</ViewTitle>
        <div className="UpdatePostView__container">
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
