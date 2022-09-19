import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { CreatePostDtoInterface, CreateTravelResponse, ErrorResponse } from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFormData } from '../../utils/api-form-data';
import { apiUrl } from '../../config';
import { HttpMethod } from '../../utils/api';
import { CreateFormData } from '../../utils/create-form-data';
import { AddPostMain } from './AddPostMain/AddPostMain';

export function AddPostView() {
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);

  const initialForm: CreatePostDtoInterface = {
    title: '',
    destination: '',
    description: '',
    photo: undefined,
  };

  const [form, setForm] = useState<CreatePostDtoInterface>(initialForm);

  useEffect(() => {
    if (submitStatus === 201) navigate(`/travel/${params.id}`);
  }, [submitStatus]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = CreateFormData.createFormData(form);
    const { status, body } = await apiFormData<CreateTravelResponse | ErrorResponse>(
      `${apiUrl}/travel/${params.id}/post`,
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

  const cancelHandler = () => {
    navigate(`/travel/${params.id}`);
  };

  return (
    <AddPostMain
      message={message}
      form={form}
      changeFormHandler={changeFormHandler}
      onSubmitHandler={onSubmitHandler}
      cancelHandler={cancelHandler}
      changeFromHandlerFile={changeFromHandlerFile}
    />
  );
}
