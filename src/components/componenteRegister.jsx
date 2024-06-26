import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({ setIsLogin }) {
  const [formValues, setFormValues] = useState({
    nombre: '',
    correo: '',
    genero: 'hombre',
    altura: '',
    edad: '',
    peso: '',
    clave: ''
  });
  const [correoEnUso, setCorreoEnUso] = useState(false);
  const [correoFormatoIncorrecto, setCorreoFormatoIncorrecto] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === 'correo') {
      setCorreoEnUso(false);
      setCorreoFormatoIncorrecto(false);

      if (!value.endsWith('@gmail.com')) {
        setCorreoFormatoIncorrecto(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, correo, genero, altura, edad, peso, clave } = formValues;

    if (!nombre || !correo || !genero || !altura || !edad || !peso || !clave) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    if (correoFormatoIncorrecto) {
      console.log('Formato de correo incorrecto');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8090/api/register', { nombre, correo, genero, altura, edad, peso, clave });
      if (response.status === 200) {
        console.log('Registro exitoso');
        setFormValues({ nombre: '', correo: '', genero: 'hombre', altura: '', edad: '', peso: '', clave: '' });
        navigate(`/usuarioPrincipal?correo=${correo}&clave=${clave}`);
      } else {
        console.log('Error en el registro');
      }
    } catch (error) {
      console.error('Error al registrarse', error);
      if (error.response && error.response.status === 409) {
        setCorreoEnUso(true);
      }
    }
  };

  return (
    <form className="formulario_register" onSubmit={handleSubmit}>
      <h2>Registrarse</h2>

        <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} placeholder="Nombre Completo" required />
        <input type="text" name="correo" value={formValues.correo} onChange={handleChange} placeholder="Correo Electrónico" required />
        {correoEnUso && <p style={{ color: 'red' }}>El correo electrónico ya está en uso</p>}
        {correoFormatoIncorrecto && <p style={{ color: 'red' }}>Solo se permiten correos de @gmail.com</p>}

      <div className="group">
        <select id="genero" name="genero" value={formValues.genero} onChange={handleChange}>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
        </select>
        <input type="number" name="altura" value={formValues.altura} onChange={handleChange} placeholder="Altura" min="1" max="3" step="0.01" required />
        <input type="number" name="edad" value={formValues.edad} onChange={handleChange} placeholder="Edad" min="18" max="70" required />
        <input type="number" name="peso" value={formValues.peso} onChange={handleChange} placeholder="Peso" min="40" max="120" step="0.01" required />
        <input type="password" name="clave" value={formValues.clave} onChange={handleChange} placeholder="Contraseña" required />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
