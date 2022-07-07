import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { Auth } from '../Auth/Auth';
import { LoginView } from '../../views/LoginView/LoginView';

function App() {
  return (
    <div className="App">
      <Auth>
        <Routes>
          <Route path="/" element={<p>index</p>} />
          <Route path="/login" element={<LoginView />} />
          <Route path="*" element={<p>NotFound</p>} />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute
                navigateTo="/login"
                isAuth={false}
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
