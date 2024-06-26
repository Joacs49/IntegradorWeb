import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function UsuarioPrincipal() {
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const correo = new URLSearchParams(location.search).get('correo');
        const clave = new URLSearchParams(location.search).get('clave');

        if (!correo || !clave) {
          console.error('Correo y clave son obligatorios');
          return;
        }

        const response = await axios.get(`http://localhost:8090/api/usuario/${correo}?clave=${clave}`);
        if (response.status === 200) {
          setUsuario(response.data);
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud', error);
      }
    };

    obtenerDatosUsuario();
  }, [location.search]);

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Bienvenido, {usuario.nombre}</h2>
      <p>Correo electrónico: {usuario.correo}</p>
      <p>Género: {usuario.genero}</p>
      <p>Altura: {usuario.altura}</p>
      <p>Edad: {usuario.edad}</p>
      <p>Peso: {usuario.peso}</p>
    </div>
  );
}

export default UsuarioPrincipal;
