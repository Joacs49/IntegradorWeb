import React, { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

import './css/App.css';
import './css/login.css';

import Principal from './vistas/principal';
import LoginForm from './vistas/loginForm';
import UsuarioPrincipal from './vistas/usuarioPrincipal';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const isLoginForm = location.pathname === '/loginForm';
  document.body.className = isLoginForm ? 'login-background' : 'home-background';

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/usuarioPrincipal'); // Redirigir a la página principal del usuario
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('Usuario ha cerrado sesión');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="container flex items-center justify-between gap-4">
          <Link to="/" className="logo">
            NUTRIFIT
          </Link>
          {!isLoggedIn && location.pathname !== '/loginForm' && (
            <div className="nav-links flex items-center gap-4">
              <Link to="/loginForm" className="nav-link">Iniciar Sesión</Link>
            </div>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="nav-link">Cerrar Sesión</button>
          )}
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/loginForm" element={<LoginForm defaultForm="login" onLogin={handleLogin} />} />
          {/* Pasar handleLogout como onLogout */}
          <Route path="/usuarioPrincipal" element={<UsuarioPrincipal onLogout={handleLogout} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
