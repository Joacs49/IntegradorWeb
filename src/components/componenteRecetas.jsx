import React, { useState } from "react";
import axios from "axios";

function PlanificacionRecetas({ idUsuario }) {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [platosSeleccionados, setPlatosSeleccionados] = useState([]);

  
  const obtenerRecomendaciones = async (idUsuario) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/plandecomida/recomendaciones/${idUsuario}`);
      console.log("Respuesta del servidor:", response.data); // Verificar la respuesta completa del servidor
      setRecomendaciones(response.data.split("\n"));
    } catch (error) {
      console.error("Error al obtener las recomendaciones:", error);
    }
  };

  const handleRecomendacionesClick = async (idUsuario) => {
    await obtenerRecomendaciones(idUsuario);
  };

  const handleSeleccionar = (nombrePlato) => {
    if (platosSeleccionados.includes(nombrePlato)) {
      // Si ya está seleccionado, lo quitamos de la lista de seleccionados
      setPlatosSeleccionados(platosSeleccionados.filter((plato) => plato !== nombrePlato));
    } else {
      // Si no está seleccionado, lo agregamos a la lista de seleccionados
      setPlatosSeleccionados([...platosSeleccionados, nombrePlato]);
    }
  };

  const handleDescartar = (nombrePlato) => {
    // Quitar el plato de la lista de seleccionados
    setPlatosSeleccionados(platosSeleccionados.filter((plato) => plato !== nombrePlato));
  };

  return (
    <div className="planificacion-container">
      <h2>Planificación</h2>
      <br />
      <br />
      <div className="recomendaciones-section">
        <h3>Recomendaciones IMC</h3>
        <button onClick={() => handleRecomendacionesClick(idUsuario)}>
          Obtener Recomendaciones IMC
        </button>
        <br />
        <br />
        <div className="recomendaciones-list">
          {recomendaciones.length > 0 ? (
            recomendaciones.map((recomendacion, index) => {
              const [nombrePlato, ingredientesYPrecio] = recomendacion.split(":");
              const [ingredientes, precioTotal] = ingredientesYPrecio.split("(Precio total: ");
              const ingredientesList = ingredientes.split(",").map((ingrediente) => ingrediente.trim());
              const precio = precioTotal ? precioTotal.replace(")", "").trim() : "";

              return (
                <div key={index} className={`plato-box ${platosSeleccionados.includes(nombrePlato) ? "seleccionado" : ""}`}>
                  <div className="plato-header">
                    <h4>{nombrePlato}</h4>
                    {precio && <span className="plato-precio">{`(Precio total: ${precio})`}</span>}
                  </div>
                  <ul>
                    {ingredientesList.map((ingrediente, i) => (
                      <li key={i}>{ingrediente}</li>
                    ))}
                  </ul>
                  <div className="botones-bottom">
                    <button className="boton-seleccionar" onClick={() => handleSeleccionar(nombrePlato)}>
                      Seleccionar
                    </button>
                    <button className="boton-descartar" onClick={() => handleDescartar(nombrePlato)}>
                      Descartar
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No hay recomendaciones disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanificacionRecetas;
