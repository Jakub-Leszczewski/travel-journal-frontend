import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import './AddTravelView.css';
import { CreateTravelDtoInterface, ErrorResponse } from 'types';
import { Navigate } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { TravelForm } from '../../components/form/TravelForm/TravelForm';
import { apiFormData } from '../../utils/apiFormData';
import { apiUrl } from '../../config';
import { HttpMethod } from '../../utils/api';
import { useUser } from '../../hooks/useUser';
import { CreateFormData } from '../../utils/create-form-data';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export function AddTravelView() {
  const user = useUser();
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

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const formData = CreateFormData.createFormData(form);
      const { status, body } = await apiFormData<CreateTravelDtoInterface | ErrorResponse>(
        `${apiUrl}/api/user/${user.id}/travel`,
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

  return (
    <main className="AddTravelView">
      {submitStatus === 201 && <Navigate to="/profile" />}
      <section className="AddTravelView__window">
        <ViewTitle>Nowa podróż</ViewTitle>
        <div className="AddTravelView__container">
          <ErrorMessage message={message} />
          <TravelForm
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
