import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { CreateTravelDtoInterface, ErrorResponse } from 'types';
import { useNavigate } from 'react-router-dom';
import { apiFormData } from '../../utils/api-form-data';
import { apiUrl } from '../../config';
import { HttpMethod } from '../../utils/api';
import { useUser } from '../../hooks/useUser';
import { CreateFormData } from '../../utils/create-form-data';
import { AddTravelMain } from './AddTravelMain/AddTravelMain';

export function AddTravelView() {
  const user = useUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);

  const initialForm: CreateTravelDtoInterface = {
    title: '',
    destination: '',
    description: '',
    startAt: new Date().toISOString().substring(0, 10),
    endAt: new Date().toISOString().substring(0, 10),
    comradesCount: 0,
    photo: undefined,
  };

  const [form, setForm] = useState<CreateTravelDtoInterface>(initialForm);
  useEffect(() => {
    setForm(initialForm);
  }, [user]);

  useEffect(() => {
    if (submitStatus === 201) navigate('/profile');
  }, [submitStatus]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const formData = CreateFormData.createFormData(form);
      const { status, body } = await apiFormData<CreateTravelDtoInterface | ErrorResponse>(
        `${apiUrl}/user/${user.id}/travel`,
        {
          method: HttpMethod.POST,
          payload: formData,
        },
      );

      if (status !== 201 && body && 'message' in body) {
        setMessage(body.message ?? null);
      }

      setSubmitStatus(status);
    }
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
    navigate('/profile');
  };

  return (
    <AddTravelMain
      message={message}
      form={form}
      changeFormHandler={changeFormHandler}
      onSubmitHandler={onSubmitHandler}
      changeFromHandlerFile={changeFromHandlerFile}
      cancelHandler={cancelHandler}
    />
  );
}
