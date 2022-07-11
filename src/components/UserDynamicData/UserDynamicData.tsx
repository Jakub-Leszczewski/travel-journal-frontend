import React, { ChangeEvent, FormEvent } from 'react';
import './UserDynamicData.css';
import { UserSaveResponseData } from 'types';
import { InfoBar } from '../InfoBar/InfoBar';
import { WhiteButton } from '../common/WhiteButton/WhiteButton';
import { UpdateAccountFormInterface } from '../../views/UserAccountView/UserAccountView';
import { UpdateAccountForm } from '../form/UpdateAccountForm/UpdateAccountForm';

interface Props {
  isEditView: boolean;
  setEditHandler: (editVisible: boolean) => void;
  message: string | string[] | null;
  user: UserSaveResponseData | null
  form: UpdateAccountFormInterface;

  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  changeFromHandlerFile: (e: any) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export function UserDynamicData({
  isEditView, setEditHandler, message, changeFromHandlerFile, changeFormHandler, onSubmitHandler, form, user,
}: Props) {
  return (
    <div>
      {
        !isEditView
          ? (
            <div className="UserDynamicData__static-container">
              <InfoBar
                text={user?.bio ?? ''}
                bootstrapIconName="bi bi-chat-dots-fill"
              />

              <WhiteButton onClick={() => setEditHandler(true)}>Edytuj</WhiteButton>
            </div>
          )
          : (
            <div className="UserDynamicData__form-container">
              {
                message instanceof Array
                  ? message.map((e, i) => (<p key={i} className="UserDynamicData_message">{e}</p>))
                  : message && <p className="UserDynamicData_message">{message}</p>
              }
              <UpdateAccountForm
                cancelEdit={() => setEditHandler(false)}
                changeFromHandlerFile={changeFromHandlerFile}
                onSubmitHandler={onSubmitHandler}
                changeFormHandler={changeFormHandler}
                form={form}
              />
            </div>
          )
      }
    </div>
  );
}
