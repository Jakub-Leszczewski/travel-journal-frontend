import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import {
  ErrorResponse, GetUserStatsResponse, UpdateUserDtoInterface, UpdateUserResponse,
} from 'types';
import { HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useUser } from '../../hooks/useUser';
import { useSaveUserData } from '../../hooks/useSaveUserData';
import { apiFormData } from '../../utils/api-form-data';
import { CreateFormData } from '../../utils/create-form-data';
import { useApi } from '../../hooks/useApi';
import { UserAccountMain } from './UserAccountMain/UserAccountMain';

export type UpdateAccountFormInterface = UpdateUserDtoInterface & {repeatNewPassword: string}

export function UserAccountView() {
  const user = useUser();
  const saveUserData = useSaveUserData();
  const [isEditView, setIsEditView] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [userStatsStatus, userStatsBody] = useApi<GetUserStatsResponse | ErrorResponse>(
    `${apiUrl}/user/${user?.id}/stats`,
  );

  const initialForm: UpdateAccountFormInterface = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    bio: user?.bio ?? '',
    newPassword: '',
    repeatNewPassword: '',
    password: '',
    photo: undefined,
  };
  const [form, setForm] = useState<UpdateAccountFormInterface>(initialForm);

  useEffect(() => {
    setForm(initialForm);
    setIsEditView(false);
  }, [user]);

  const callApi = async () => {
    if (user) {
      const { repeatNewPassword, ...createUserData } = form;
      const formData = CreateFormData.createFormDataRemoveEmpty(createUserData, ['bio']);
      const { status, body } = await apiFormData<UpdateUserResponse | ErrorResponse>(`${apiUrl}/user/${user.id}`, {
        method: HttpMethod.PATCH,
        payload: formData,
      });

      if (status !== 401) setIsConfirm(false);
      if (status === 200 && body) saveUserData(body as UpdateUserResponse);
      if (status !== 200 && body && 'message' in body) {
        setMessage(body.message ?? null);
      }
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.newPassword) setIsConfirm(true);
    else await callApi();
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

  const setConfirmHandler = (confirmVisible: boolean) => {
    setIsConfirm(confirmVisible);

    if (!confirmVisible) {
      setForm((prev) => ({
        ...prev,
        password: '',
        repeatNewPassword: '',
        newPassword: '',
      }));
    }
  };

  const setEditHandler = (editVisible: boolean) => {
    setIsEditView(editVisible);
  };

  return (
    <UserAccountMain
      user={user}
      form={form}
      userStatsStatus={userStatsStatus}
      userStatsBody={userStatsBody}
      isEditView={isEditView}
      message={message}
      isConfirm={isConfirm}
      callApi={callApi}
      onSubmitHandler={onSubmitHandler}
      changeFormHandler={changeFormHandler}
      changeFromHandlerFile={changeFromHandlerFile}
      setConfirmHandler={setConfirmHandler}
      setEditHandler={setEditHandler}
    />
  );
}
