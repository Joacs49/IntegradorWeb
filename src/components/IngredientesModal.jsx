import React from "react";
import axios from "axios";
import "../css/IngredientesModal.css";

const IngredientesModal = ({ isOpen, onClose, platosSeleccionados, idUsuario }) => {

  const handleGenerarPDF = async () => {
    try {
        const idsRecetas = platosSeleccionados.map(plato => parseInt(plato.idReceta));

        console.log("IDs de receta a enviar:", idsRecetas);
        console.log("ID de usuario a enviar:", idUsuario);

        const response = await axios.post(
            "http://localhost:8090/api/plandecomida/recetaplan",idsRecetas,
            {
                params: {
            userId: idUsuario
        }
            }
        );

        if (response.status === 200) {
            console.log("Plan de comida guardado correctamente:", response.data);
            // Implementa lógica adicional si es necesario
        } else {
            console.error("Error al guardar el plan de comida:", response.data);
            // Maneja el error según sea necesario
        }
    } catch (error) {
        console.error("Error al guardar el plan de comida:", error);
        // Maneja el error según sea necesario
    }
};



  
  
   

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


