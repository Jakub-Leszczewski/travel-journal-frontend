import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import './UserAccountView.css';
import { ErrorResponse, UpdateUserResponse } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { UserStaticData } from '../../components/UserStaticData/UserStaticData';
import { useUser } from '../../hooks/useUser';
import { PasswordConfirm } from '../../components/PasswordConfirm/PasswordConfirm';
import { useSaveUserData } from '../../hooks/useSaveUserData';
import { apiFormData } from '../../utils/apiFormData';
import { CreateFormData } from '../../utils/create-form-data';
import { UserDynamicData } from '../../components/UserDynamicData/UserDynamicData';

interface SignupData {
  firstName: string;
  lastName: string;
  bio: string;
  newPassword: string;
  repeatNewPassword: string;
  password: string;
  photo: any;
}

export function UserAccountView() {
  const user = useUser();
  const saveUserData = useSaveUserData();
  const [isEditView, setIsEditView] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [message, setMessage] = useState<string | string[] | null>(null);

  const initialForm = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    bio: user?.bio ?? '',
    newPassword: '',
    repeatNewPassword: '',
    password: '',
    photo: undefined,
  };
  const [form, setForm] = useState<SignupData>(initialForm);
  useEffect(() => {
    setForm(initialForm);
    setIsEditView(false);
  }, [user]);

  const callApi = async () => {
    if (user) {
      const { repeatNewPassword, ...createUserData } = form;
      const formData = CreateFormData.createFormDataRemoveEmpty(createUserData);
      const { status, body } = await apiFormData<UpdateUserResponse | ErrorResponse>(`${apiUrl}/api/user/${user.id}`, {
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

  const toggleEdit = () => setIsEditView((prev) => !prev);

  return (
    <main className="UserAccountView">
      <section className="UserAccountView__window">
        <ViewTitle>Twoje konto</ViewTitle>

        <div className="UserAccountView__container">
          <UserStaticData
            email={user?.email || ''}
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
            imageUrl={user?.avatar ? `${apiUrl}${user.avatar}` : ''}
            postsCount={43}
            travelsCount={12}
          />

          <UserDynamicData
            isEditView={isEditView}
            toggleEdit={toggleEdit}
            message={message}
            user={user}
            form={form}
            changeFormHandler={changeFormHandler}
            changeFromHandlerFile={changeFromHandlerFile}
            onSubmitHandler={onSubmitHandler}
          />
        </div>

        {isConfirm && (
          <PasswordConfirm
            changeFormHandler={changeFormHandler}
            message={message}
            form={form}
            header="Potwierdź zmiany aktualnym hasłem"
            onConfirmHandler={async (e) => {
              e.preventDefault();
              await callApi();
            }}
          />
        )}
      </section>
    </main>
  );
}
