import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Auth } from '../Auth/Auth';
import { LoginView } from '../../views/LoginView/LoginView';
import { IndexView } from '../../views/IndexView/IndexView';

function App() {
  return (
    <div className="App">
      <Auth>
        <Routes>
          <Route path="/" element={<IndexView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="*" element={<p>NotFound</p>} />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute
                navigateTo="/login"
                isAuth
              >
                profil
              </ProtectedRoute>
            )}
          />
        </Routes>
      </Auth>
    </div>
  );
}

export default App;
