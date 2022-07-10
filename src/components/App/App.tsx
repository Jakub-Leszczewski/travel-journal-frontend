import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectRoute } from '../ProtectRoute/ProtectRoute';
import { LoginView } from '../../views/LoginView/LoginView';
import { IndexView } from '../../views/IndexView/IndexView';
import { useAuth } from '../../hooks/useAuth';
import { SignupView } from '../../views/SignupView/SignupView';
import { UserAccountView } from '../../views/UserAccountView/UserAccountView';
import { useUser } from '../../hooks/useUser';
import { ProfileView } from '../../views/ProfileView/ProfileView';

function App() {
  const isAuth = useAuth();
  const userData = useUser();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={(
            <ProtectRoute isAuth={!isAuth} navigateTo="/">
              <LoginView />
            </ProtectRoute>
        )}
        />
        <Route
          path="/signup"
          element={(
            <ProtectRoute isAuth={!isAuth} navigateTo="/">
              <SignupView />
            </ProtectRoute>
        )}
        />

        <Route
          path="/"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <IndexView />
            </ProtectRoute>
        )}
        />

        <Route
          path="/profile/"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <Navigate to={`/profile/${userData?.id}`} />
            </ProtectRoute>
          )}
        />

        <Route
          path="/profile/:id"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <ProfileView />
            </ProtectRoute>
          )}
        />

        <Route
          path="/account/"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <UserAccountView />
            </ProtectRoute>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
