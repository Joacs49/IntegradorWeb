import React, { useState } from 'react';
import Login from '../components/componenteIngreso';
import Register from '../components/componenteRegister';
import ComponenteCss from '../components/componenteCss';
import '../css/login.css';

function LoginForm() {
  const [showLogin, setShowLogin] = useState(true); 
  const { iniciarSesion, register } = ComponenteCss();

  const handleShowLogin = () => {
    setShowLogin(true); 
    iniciarSesion(); 
  };

  const handleShowRegister = () => {

    register(); 
  };

  return (
    <main>
      <div className="contenedor_todo">
        <div className="caja_trasera">
          <div className={`caja_trasera-login ${showLogin ? 'visible' : ''}`}>
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button onClick={handleShowLogin}>Iniciar Sesión</button>
          </div>
          
          <div className={`caja_trasera-register ${!showLogin ? 'visible' : ''}`}>
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas ingresar</p>
            <button onClick={handleShowRegister}>Registrarse</button>
          </div>
        </div>

        <div className="contenedor_login-register">
          <Login setIsLogin={() => iniciarSesion()} />
          <Register setIsLogin={() => register()} />
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
