import React from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';

import './css/App.css';
import './css/login.css';

import Principal from './vistas/principal';
import LoginForm from './vistas/loginForm';

function App() {
  const location = useLocation();
  const isLoginForm = location.pathname === '/loginForm'; // Verifica si la ubicación actual es la página de login

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="container flex items-center justify-between gap-4">
          <Link to="/" className="logo">
            NUTRIFIT
          </Link>
          {!isLoginForm && ( // Oculta el enlace de inicio de sesión en la página de login.
            <div className="nav-links flex items-center gap-4">
              <Link to="/loginForm" className="nav-link">Iniciar Sesión</Link>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/loginForm" element={<LoginForm defaultForm="login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
