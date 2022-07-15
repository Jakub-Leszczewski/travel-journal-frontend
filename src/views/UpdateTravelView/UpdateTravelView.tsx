import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import './UpdateTravelView.css';
import {
  ErrorResponse, GetTravelResponse, UpdateTravelDtoInterface, UpdateTravelResponse,
} from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { TravelForm } from '../../components/form/TravelForm/TravelForm';
import { apiFormData } from '../../utils/apiFormData';
import { apiUrl } from '../../config';
import { HttpMethod } from '../../utils/api';
import { CreateFormData } from '../../utils/create-form-data';
import { useApi } from '../../hooks/useApi';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

export function UpdateTravelView() {
  const navigate = useNavigate();
  const params = useParams();
  const [travelStatus, travelBody] = useApi<GetTravelResponse | ErrorResponse>(`${apiUrl}/api/travel/${params.id}`);
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
    if (travelStatus === 200 && travelBody && !('error' in travelBody)) {
      setForm((prev) => ({
        ...prev,
        title: travelBody.title,
        destination: travelBody.destination,
        description: travelBody.description,
        startAt: new Date(travelBody.startAt).toISOString().substring(0, 10),
        endAt: new Date(travelBody.endAt).toISOString().substring(0, 10),
        comradesCount: travelBody.comradesCount,
      }));
    }
  }, [travelBody]);

  useEffect(() => {
    if (submitStatus === 200 || (travelStatus !== 200 && travelStatus !== null)) navigate('/profile');
  }, [submitStatus]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = CreateFormData.createFormDataRemoveEmpty(form, ['description']);
    const { status, body } = await apiFormData<UpdateTravelResponse | ErrorResponse>(
      `${apiUrl}/api/travel/${params.id}`,
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
    navigate('/profile');
  };

  return (
    <main className="UpdateTravelView">
      <section className="UpdateTravelView__window">
        {(travelStatus === null) ? <LoadingSpinner /> : null}

        <ViewTitle>Edytuj podróż</ViewTitle>
        <div className="UpdateTravelView__container">
          <ErrorMessage message={message} />
          <TravelForm
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
