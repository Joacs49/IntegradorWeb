import React from 'react';

const ResumenPlatos = ({ platosSeleccionados }) => {
  if (!platosSeleccionados || platosSeleccionados.length === 0) {
    return (
      <div className="resumen-platos">
        <h2>Resumen de Platos Seleccionados</h2>
        <p>No hay platos seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="resumen-platos">
      <h2>Resumen de Platos Seleccionados</h2>
      <ul>
        {platosSeleccionados.map((plato, index) => (
          <li key={index}>
            <h3>{plato.nombre}</h3>
            <p>Ingredientes: {plato.ingredientes}</p>
            <p>Precio Total: S/{plato.precioTotal.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumenPlatos;


