import React, { useState } from 'react';
import '../css/login.css';
import ComponenteLogin from '../components/componenteLogin';


function LoginForm() {
  const [isLogin] = useState(true);
  const { iniciarSesion, register } = ComponenteLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="contenedor_todo">
        <div className="caja_trasera">
          <div className={`caja_trasera-login ${isLogin ? 'visible' : ''}`}>
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button onClick={iniciarSesion}>Iniciar Sesión</button>
          </div>
          <div className={`caja_trasera-register ${!isLogin ? 'visible' : ''}`}>
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas ingresar</p>
            <button onClick={register}>Registrarse</button>
          </div>
        </div>

        <div className="contenedor_login-register">
          <form className={`formulario_login ${isLogin ? 'visible' : ''}`} onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="Correo Electrónico" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Entrar</button>
          </form>


            <form className={`formulario_register ${!isLogin ? 'visible' : ''}`} onSubmit={handleSubmit}>
              <h2>Registrarse</h2>

              <div className="group">
                <input type="text" placeholder="Nombre Completo" />
                <input type="text" placeholder="Correo Electrónico" />
              </div>

              <div className="group">
                <select id="genero" name="genero">
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </select>
                <input type="number" placeholder="Altura" min="0" />
              </div>

              <div className="group">
                <input type="number" placeholder="Edad" min="0" />
                <input type="number" placeholder="Peso" min="0" />
              </div>
              <div className="group">
                <input type="password" placeholder="Contraseña" />
              </div>
              <button type="submit">Registrarse</button>
            </form>
          </div>
        </div>

    </main>

  );
}

export default LoginForm;