import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLogin }) {
  const [formValues, setFormValues] = useState({ correo: '', clave: '' });
  const [errorMessages, setErrorMessages] = useState({ correo: '', clave: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: '' }); // Limpiar mensaje de error al editar el campo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { correo, clave } = formValues;

    if (!correo || !clave) {
      console.log('Correo y clave son obligatorios');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8090/api/login', { correo, clave });
      if (response.status === 200) {
        console.log('Inicio de sesión exitoso');
        navigate(`/usuarioPrincipal?correo=${correo}&clave=${clave}`);
      } else {
        console.log('Respuesta no esperada del servidor');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessages({ ...errorMessages, clave: 'Clave incorrecta' });
        } else if (error.response.status === 404) {
          setErrorMessages({ ...errorMessages, correo: 'Correo no encontrado' });
        }
      }
    }
  };

  return (
    <form className="formulario_login" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        name="correo"
        value={formValues.correo}
        onChange={handleChange}
        placeholder="Correo Electrónico"
        required
      />
      {errorMessages.correo && <p style={{ color: 'red' }}>{errorMessages.correo}</p>}
      <input
        type="password"
        name="clave"
        value={formValues.clave}
        onChange={handleChange}
        placeholder="Contraseña"
        required
      />
      {errorMessages.clave && <p style={{ color: 'red' }}>{errorMessages.clave}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
