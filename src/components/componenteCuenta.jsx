import React, { useState } from 'react';
import axios from "axios";

function AdministracionCuenta({ usuario }) {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [correo, setCorreo] = useState(usuario.correo);
  const [genero, setGenero] = useState(usuario.genero);
  const [altura, setAltura] = useState(usuario.altura);
  const [edad, setEdad] = useState(usuario.edad);
  const [peso, setPeso] = useState(usuario.peso);
  const [clave, setClave] = useState(usuario.clave);
  const [editandoCuenta, setEditandoCuenta] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const { value } = event.target;
    setCorreo(value);
    setIsValid(value.endsWith('@gmail.com'));
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault(); 

    if (!isValid) {
      console.log('No se puede guardar debido a la validación del correo');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8090/api/usuario/${usuario.idUsuario}`, {
        nombre,
        correo,
        genero,
        altura,
        edad,
        peso,
        clave,
      });
      if (response.status === 200) {
        console.log('Cambios guardados exitosamente');
        setEditandoCuenta(false);
      } else {
        console.error('Error al guardar los cambios');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
    }
  };

  return (
    <div>
      <h2>Administración de la cuenta</h2>
      <br />
      <form className="formulario-cuenta" onSubmit={handleGuardarCambios}>
        <div className="form-group">
          <h4>Nombre</h4>
          <input type="text" placeholder="Nombre Completo" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={!editandoCuenta} required/>
        </div>
        <div className="form-group">
          <h4>Correo Electrónico</h4>
          <input type="text" placeholder="Correo Electrónico" value={correo} onChange={handleChange} disabled={!editandoCuenta} required/>
          {!isValid && <p style={{ color: 'red' }}>Solo se permiten correos de @gmail.com</p>}
        </div>
        <div className="form-group">
          <h4>Género</h4>
          <select id="genero" name="genero" value={genero} onChange={(e) => setGenero(e.target.value)} disabled={!editandoCuenta}>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </div>
        <div className="form-group">
          <h4>Altura</h4>
          <input type="number" placeholder="Altura (cm)" min="1" max="3" step="0.01" value={altura} onChange={(e) => setAltura(e.target.value)} disabled={!editandoCuenta} required/>
        </div>
        <div className="form-group">
          <h4>Edad</h4>
          <input type="number" placeholder="Edad" min="18" max="70" value={edad} onChange={(e) => setEdad(e.target.value)} disabled={!editandoCuenta} required/>
        </div>
        <div className="form-group">
          <h4>Peso</h4>
          <input type="number" placeholder="Peso (kg)" min="40" max="120" step="0.01" value={peso} onChange={(e) => setPeso(e.target.value)} disabled={!editandoCuenta} required/>
        </div>
        <div className="form-group">
          <h4>Clave</h4>
          <input type="text" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} disabled={!editandoCuenta} required/>
        </div>
        <div className="form-group"></div>
        <div className="form-group">
        {!editandoCuenta && <button type="button" onClick={() => setEditandoCuenta(true)}>Realizar Cambios</button>}
        {editandoCuenta && <button type="submit">Guardar Cambios</button>}
        </div>
      </form>
    </div>
  );
}

export default AdministracionCuenta;
