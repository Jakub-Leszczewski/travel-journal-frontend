import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Auth } from '../Auth/Auth';
import { LoginView } from '../../views/LoginView/LoginView';
import { IndexView } from '../../views/IndexView/IndexView';
import { useAuth } from '../../hooks/useAuth';
import { SignupView } from '../../views/SignupView/SignupView';

function App() {
  const isAuth = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute
              navigateTo="/login"
              isAuth={isAuth}
            >
              profil
            </ProtectedRoute>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
