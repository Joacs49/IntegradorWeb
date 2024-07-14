import React from "react";
import axios from "axios";
import "../css/IngredientesModal.css";

const IngredientesModal = ({ isOpen, onClose, platosSeleccionados, idUsuario, dias }) => {

  const handleGenerarPDF = async () => {
    try {
      const idsRecetas = platosSeleccionados.map((plato) => parseInt(plato.idReceta));
      const diasSeleccionados = dias.filter(dia => dia !== ''); // Filtrar días no seleccionados

      const data = {
        recetas: idsRecetas,
        dias: diasSeleccionados
      };

      console.log("Datos a enviar:", data);

      const response = await axios.post(
        `http://localhost:8090/api/plandecomida/recetaplan`,
        data,
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
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        <h2>Detalles de Platos Seleccionados</h2>
        <div className="platos-seleccionados">
          {platosSeleccionados && platosSeleccionados.length > 0 ? (
            platosSeleccionados.map((plato, index) => (
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
                <div className="select-container">
                  <span className="dia-seleccionado">
                    {dias[index] !== undefined ? `Día seleccionado: ${dias[index]}` : "Selecciona un día"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No hay platos seleccionados.</p>
          )}
        </div>
        <div className="button-container">
          <button className="button-generar-pdf" onClick={handleGenerarPDF}>
            Generar PDF
          </button>
          <button className="button-cerrar" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientesModal;
