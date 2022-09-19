import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import {
  ErrorResponse, GetPostResponse, UpdatePostDtoInterface, UpdateTravelResponse,
} from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFormData } from '../../utils/api-form-data';
import { apiUrl } from '../../config';
import { HttpMethod } from '../../utils/api';
import { CreateFormData } from '../../utils/create-form-data';
import { useApi } from '../../hooks/useApi';
import { UpdatePostMain } from './UpdatePostMain/UpdatePostMain';

export function UpdatePostView() {
  const navigate = useNavigate();
  const params = useParams();
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [postStatus, postBody] = useApi<GetPostResponse | ErrorResponse>(`${apiUrl}/post/${params.id}`);

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
      `${apiUrl}/post/${params.id}`,
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
    <UpdatePostMain
      postStatus={postStatus}
      message={message}
      form={form}
      onSubmitHandler={onSubmitHandler}
      changeFromHandlerFile={changeFromHandlerFile}
      cancelHandler={cancelHandler}
      changeFormHandler={changeFormHandler}
    />
  );
}
