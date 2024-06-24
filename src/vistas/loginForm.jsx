import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ComponenteLogin from '../components/componenteLogin';

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { iniciarSesion, register } = ComponenteLogin();
  const navigate = useNavigate();

  // Estado local para los valores del formulario
  const [formValues, setFormValues] = useState({
    nombre: '',
    correo: '',
    genero: 'hombre',
    altura: '',
    edad: '',
    peso: '',
    clave: ''
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Iniciar sesión
      const correo = e.target.correo.value;
      const clave = e.target.clave.value;

      if (!correo || !clave) {
        console.log('Correo y clave son obligatorios');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8090/api/login', { correo, clave });
        if (response.status === 200) {
          console.log('Inicio de sesión exitoso');
          navigate('/usuarioPrincipal'); // Redirigir después del inicio de sesión exitoso
        } else {
          console.log('Correo o contraseña incorrectos');
        }
      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    } else {
      // Registro
      const { nombre, correo, genero, altura, edad, peso, clave } = formValues;

      if (!nombre || !correo || !genero || !altura || !edad || !peso || !clave) {
        console.log('Todos los campos son obligatorios');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8090/api/register', {
          nombre, correo, genero, altura, edad, peso, clave
        });

        if (response.status === 200) {
          console.log('Registro exitoso');
          // Limpiar los valores del formulario después del registro exitoso
          setFormValues({
            nombre: '',
            correo: '',
            genero: 'hombre',
            altura: '',
            edad: '',
            peso: '',
            clave: ''
          });
        } else {
          console.log('Error en el registro');
        }
      } catch (error) {
        console.error('Error al registrarse', error);
      }
    }
  };

  return (
    <main>
      <div className="contenedor_todo">
        <div className="caja_trasera">
          <div className={`caja_trasera-login ${isLogin ? 'visible' : ''}`}>
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button onClick={() => {setIsLogin(true); iniciarSesion();}} >Iniciar Sesión</button>
          </div>
          <div className={`caja_trasera-register ${!isLogin ? 'visible' : ''}`}>
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas ingresar</p>
            <button onClick={() => {setIsLogin(false); register();}}>Registrarse</button>
          </div>
        </div>

        <div className="contenedor_login-register">
          <form className={`formulario_login ${isLogin ? 'visible' : ''}`} onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <input type="text" name="correo" value={formValues.correo} onChange={handleChange} placeholder="Correo Electrónico" />
            <input type="password" name="clave" value={formValues.clave} onChange={handleChange} placeholder="Contraseña" />
            <button type="submit">Entrar</button>
          </form>

          <form className={`formulario_register ${!isLogin ? 'visible' : ''}`} onSubmit={handleSubmit}>
            <h2>Registrarse</h2>
            <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} placeholder="Nombre Completo" />
            <input type="text" name="correo" value={formValues.correo} onChange={handleChange} placeholder="Correo Electrónico" />
            <div className="group">
              <select id="genero" name="genero" value={formValues.genero} onChange={handleChange}>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
              <input type="number" name="altura" value={formValues.altura} onChange={handleChange} placeholder="Altura" min="0" />
            </div>
            <div className="group">
              <input type="number" name="edad" value={formValues.edad} onChange={handleChange} placeholder="Edad" min="0" />
              <input type="number" name="peso" value={formValues.peso} onChange={handleChange} placeholder="Peso" min="0" />
            </div>
            <div className="group">
              <input type="password" name="clave" value={formValues.clave} onChange={handleChange} placeholder="Contraseña" />
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
