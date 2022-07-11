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
import { AddTravelView } from '../../views/AddTravelView/AddTravelView';
import { TravelView } from '../../views/TravelView/TravelView';
import { UpdateTravelView } from '../../views/UpdateTravelView/UpdateTravelView';
import { AddPostView } from '../../views/AddPostView/AddPostView';
import { UpdatePostView } from '../../views/UpdatePostView/UpdatePostView';
import { MainNav } from '../MainNav/MainNav';

function App() {
  const isAuth = useAuth();
  const userData = useUser();

  return (
    <div className="App">
      <MainNav />
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

        <Route
          path="/travel/add"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <AddTravelView />
            </ProtectRoute>
          )}
        />

        <Route
          path="/travel/:id"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <TravelView />
            </ProtectRoute>
          )}
        />

        <Route
          path="/travel/:id/edit"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <UpdateTravelView />
            </ProtectRoute>
          )}
        />

        <Route
          path="/travel/:id/post/add"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <AddPostView />
            </ProtectRoute>
          )}
        />

        <Route
          path="/post/:id/edit"
          element={(
            <ProtectRoute navigateTo="/login" isAuth={isAuth}>
              <UpdatePostView />
            </ProtectRoute>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
