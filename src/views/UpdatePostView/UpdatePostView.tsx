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
  const navigate = useNavigate();
  const params = useParams();
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

  useEffect(() => {
    if (submitStatus === 200 && postStatus === 200 && postBody && !('error' in postBody)) {
      navigate(`/travel/${postBody.travelId}`);
    }
  }, [submitStatus]);

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

  const cancelHandler = () => {
    if (postStatus === 200 && postBody && !('error' in postBody)) {
      navigate(`/travel/${postBody.travelId}`);
    }
  };

  return (
    <main className="UpdatePostView">
      <section className="UpdatePostView__window">
        <ViewTitle>Edytuj post</ViewTitle>
        <div className="UpdatePostView__container">
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
