import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './css/App.css';
import './css/login.css';
import Principal from './vistas/principal';
import LoginForm from './vistas/loginForm';
import UsuarioPrincipal from './vistas/usuarioPrincipal';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  
    const isLoginForm = location.pathname === '/loginForm';
    document.body.className = isLoginForm ? 'login-background' : 'home-background';
  }, [location.pathname]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/usuarioPrincipal');
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
          <Link to="/" className="logo" onClick={(e) => e.preventDefault()}>
            NUTRIFIT
          </Link>
          {!isLoggedIn && location.pathname === '/loginForm' && (
            <div className="nav-links flex items-center gap-4">
              <button onClick={() => navigate('/')} className="nav-link">Volver a Principal</button>
            </div>
          )}
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
          <Route path="/usuarioPrincipal" element={<UsuarioPrincipal onLogout={handleLogout} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
