import React from "react";
//import axios from "axios";
import "../css/IngredientesModal.css"; // Asegúrate de tener la ruta correcta al archivo CSS

const IngredientesModal = ({ isOpen, onClose, platosSeleccionados}) => {

  const handleGenerarPDF = async () => {
    
  }
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Detalles de Platos Seleccionados</h2>
        <div className="platos-seleccionados">
          {platosSeleccionados.map((plato, index) => (
            <div key={index} className="plato-detalle">
              <h3>{plato.nombre}</h3>
              <input
                type="text"
                className="id-plato-input"
                value={plato.idReceta} // Mostrar el número de receta aquí
                disabled
              />
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
          <button className="button-generar-pdf" onClick={handleGenerarPDF}>Generar PDF</button>
          <button className="button-cerrar" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default IngredientesModal;
