import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import './UserAccountView.css';
import { Navigate } from 'react-router-dom';
import { ErrorResponse, UpdateUserResponse } from 'types';
import { ViewTitle } from '../../components/common/ViewTitle/ViewTitle';
import { api, HttpMethod } from '../../utils/api';
import { apiUrl } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { InfoBar } from '../../components/InfoBar/InfoBar';
import { UserStaticData } from '../../components/UserStaticData/UserStaticData';
import { WhiteButton } from '../../components/common/WhiteButton/WhiteButton';
import { UpdateAccountForm } from '../../components/form/UpdateAccountForm/UpdateAccountForm';
import { useUser } from '../../hooks/useUser';
import { PasswordConfirm } from '../../components/PasswordConfirm/PasswordConfirm';
import { useSaveUserData } from '../../hooks/useSaveUserData';

interface SignupData {
  firstName: string;
  lastName: string;
  bio: string;
  newPassword: string;
  repeatNewPassword: string;
  password: string;
}

export function UserAccountView() {
  const user = useUser();
  const saveUserData = useSaveUserData();

  const isAuth = useAuth();
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
  };
  const [form, setForm] = useState<SignupData>(initialForm);

  useEffect(() => {
    setForm(initialForm);
    setIsEditView(false);
  }, [user]);

  const callApi = async () => {
    if (user) {
      const { repeatNewPassword, ...createUserData } = form;
      const { status, body } = await api<UpdateUserResponse | ErrorResponse>(`${apiUrl}/user/${user.id}`, {
        method: HttpMethod.PATCH,
        payload: {
          firstName: createUserData.firstName || undefined,
          lastName: createUserData.lastName || undefined,
          password: createUserData.password || undefined,
          newPassword: createUserData.newPassword || undefined,
          bio: createUserData.bio || undefined,
        },
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

  const toggleEdit = () => setIsEditView((prev) => !prev);

  return (
    <section className="UserAccountView">
      {!isAuth && <Navigate to="/login" />}
      <ViewTitle>Twoje konto</ViewTitle>

      <div className="UserAccountView__container">
        <UserStaticData
          email={user?.email || ''}
          firstName={user?.firstName || ''}
          lastName={user?.lastName || ''}
          imageUrl=""
          postsCount={43}
          travelsCount={12}
        />

        {
          !isEditView
            ? (
              <div className="UserAccountView__static-container">
                <InfoBar
                  text={user?.bio ?? ''}
                  bootstrapIconName="bi bi-chat-dots-fill"
                />

                <WhiteButton onClick={toggleEdit}>Edytuj</WhiteButton>
              </div>
            )
            : (
              <div className="UserAccountView__form-container">
                <UpdateAccountForm
                  onSubmitHandler={onSubmitHandler}
                  changeFormHandler={changeFormHandler}
                  form={form}
                />
              </div>
            )
        }

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
  );
}
