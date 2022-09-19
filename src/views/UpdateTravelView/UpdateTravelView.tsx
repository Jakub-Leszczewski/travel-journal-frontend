import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import {
  ErrorResponse, GetTravelResponse, UpdateTravelDtoInterface, UpdateTravelResponse,
} from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFormData } from '../../utils/api-form-data';
import { apiUrl } from '../../config';
import { HttpMethod } from '../../utils/api';
import { CreateFormData } from '../../utils/create-form-data';
import { useApi } from '../../hooks/useApi';
import { UpdateTravelMain } from './UpdateTravelMain/UpdateTravelMain';

export function UpdateTravelView() {
  const navigate = useNavigate();
  const params = useParams();
  const [travelStatus, travelData] = useApi<GetTravelResponse | ErrorResponse>(`${apiUrl}/travel/${params.id}`);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string | string[] | null>(null);

  const initialForm: UpdateTravelDtoInterface = {
    title: '',
    destination: '',
    description: '',
    startAt: new Date().toISOString().substring(0, 10),
    endAt: new Date().toISOString().substring(0, 10),
    comradesCount: 0,
    photo: undefined,
  };

  const [form, setForm] = useState<UpdateTravelDtoInterface>(initialForm);
  useEffect(() => {
    if (travelStatus === 200 && travelData && !('error' in travelData)) {
      setForm((prev) => ({
        ...prev,
        title: travelData.title,
        destination: travelData.destination,
        description: travelData.description,
        startAt: new Date(travelData.startAt).toISOString().substring(0, 10),
        endAt: new Date(travelData.endAt).toISOString().substring(0, 10),
        comradesCount: travelData.comradesCount,
      }));
    }
  }, [travelData]);

  useEffect(() => {
    if (submitStatus === 200 || (travelStatus !== 200 && travelStatus !== null)) navigate('/profile');
  }, [submitStatus]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = CreateFormData.createFormDataRemoveEmpty(form, ['description']);
    const { status, body } = await apiFormData<UpdateTravelResponse | ErrorResponse>(
      `${apiUrl}/travel/${params.id}`,
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

  const changeFormHandlerFile = (e: any) => {
    setMessage(null);
    setMessage(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const cancelHandler = () => {
    navigate('/profile');
  };

  return (
    <UpdateTravelMain
      travelStatus={travelStatus}
      message={message}
      form={form}
      onSubmitHandler={onSubmitHandler}
      changeFromHandlerFile={changeFormHandlerFile}
      changeFormHandler={changeFormHandler}
      cancelHandler={cancelHandler}
    />
  );
}
