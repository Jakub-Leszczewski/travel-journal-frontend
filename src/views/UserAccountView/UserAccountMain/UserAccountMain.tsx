import React, { ChangeEvent, FormEvent } from 'react';
import './UserAccountMain.css';
import {
  ErrorResponse, GetUserStatsResponse, UserSaveResponseData,
} from 'types';
import { ViewTitle } from '../../../components/ViewTitle/ViewTitle';
import { UserStaticData } from '../UserStaticData/UserStaticData';
import { UserDynamicData } from '../UserDynamicData/UserDynamicData';
import { PasswordConfirm } from '../PasswordConfirm/PasswordConfirm';
import { apiUrl } from '../../../config';
import { UpdateAccountFormInterface } from '../UserAccountView';

interface Props {
  user: UserSaveResponseData | null;
  form: UpdateAccountFormInterface;
  userStatsStatus: number | null;
  isEditView: boolean;
  message: string | string[] | null;
  isConfirm: boolean;
  callApi: () => Promise<void>;
  userStatsBody: GetUserStatsResponse | ErrorResponse | null;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  changeFromHandlerFile: (e: any) => void;
  setConfirmHandler: (confirmVisible: boolean) => void;
  setEditHandler: (editVisible: boolean) => void;
}

export function UserAccountMain({
  user,
  onSubmitHandler,
  changeFormHandler,
  changeFromHandlerFile,
  setConfirmHandler,
  setEditHandler,
  form,
  userStatsBody,
  userStatsStatus,
  isEditView,
  message,
  isConfirm,
  callApi,
}: Props) {
  return (
    <main className="UserAccountMain">
      <section className="UserAccountMain__window">
        <ViewTitle>Twoje konto</ViewTitle>

        <div className="UserAccountMain__container">
          <UserStaticData
            email={user?.email || ''}
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
            imageUrl={user?.avatar ? `${apiUrl}${user.avatar}` : ''}
            postsCount={
              userStatsStatus === 200 && userStatsBody && !('error' in userStatsBody)
                ? userStatsBody.postCount
                : 0
            }
            travelsCount={
              userStatsStatus === 200 && userStatsBody && !('error' in userStatsBody)
                ? userStatsBody.travelCount
                : 0
            }
          />

          <UserDynamicData
            isEditView={isEditView}
            setEditHandler={setEditHandler}
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
            setConfirmHandler={setConfirmHandler}
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
