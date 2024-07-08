import React from "react";
import "../css/IngredientesModal.css"; // Asegúrate de tener la ruta correcta al archivo CSS

const IngredientesModal = ({ isOpen, onClose, platosSeleccionados }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Detalles de Platos Seleccionados</h2>
        <div className="platos-seleccionados">
          {platosSeleccionados.map((plato, index) => (
            <div key={index} className="plato-detalle">
              <h3>{plato.nombre}</h3>
              <ul>
                {plato.ingredientes.map((ingrediente, i) => (
                  <li key={i}>{ingrediente}</li>
                ))}
              </ul>
              <p>Precio Total: ${plato.precioTotal}</p>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button className="button-generar-pdf">Generar PDF</button>
          <button className="button-cerrar" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default IngredientesModal;
