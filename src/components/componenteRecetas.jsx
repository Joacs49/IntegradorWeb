import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "./componenteModal"; // Asegúrate de importar correctamente

function PlanificacionRecetas({ idUsuario }) {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [platosSeleccionados, setPlatosSeleccionados] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0); // Inicializar como número
  const [presupuestoError, setPresupuestoError] = useState(false);
  const [presupuestoDisplay, setPresupuestoDisplay] = useState("S/0");
  const [montoActual, setMontoActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Función para obtener las recomendaciones
  const obtenerRecomendaciones = async (idUsuario) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/plandecomida/recomendaciones/${idUsuario}`);
      setRecomendaciones(response.data.split("\n"));
    } catch (error) {
      console.error("Error al obtener las recomendaciones:", error);
    }
  };

  // Función para obtener detalles de un plato por su nombre
  const obtenerPlatoPorNombre = async (nombrePlato) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/plandecomida/busqueda/${idUsuario}/${nombrePlato}`);
      
      if (Array.isArray(response.data) && response.data.length > 0) {
        const detallesPlato = response.data[0];
  
        if (detallesPlato.includes("Precio total")) {
          const precioTotalIndex = detallesPlato.lastIndexOf("Precio total");
          const precioTotal = detallesPlato.substring(precioTotalIndex + 13).trim(); 
  
          console.log("Precio total:", precioTotal);
  
          return parseFloat(precioTotal);
        } else {
          console.error("No se encontró 'Precio total' en los detalles del plato.");
          return null;
        }
      } else {
        console.error("La respuesta de la API no contiene datos válidos.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener detalles del plato:", error);
      return null;
    }
  };

  // Función para actualizar el monto total al seleccionar o descartar platos
  const actualizarMontoActual = useCallback(() => {
    let total = 0;
    platosSeleccionados.forEach((plato) => {
      total += parseFloat(plato.precioTotal);
    });
    setMontoActual(total);
  }, [platosSeleccionados]);

  // Actualizar el monto total cuando cambia la lista de platos seleccionados
  useEffect(() => {
    actualizarMontoActual();
  }, [actualizarMontoActual]);

  // Manejar el clic para obtener recomendaciones
  const handleRecomendacionesClick = async () => {
    if (!presupuesto || presupuesto < 50 || presupuesto > 500) {
      setPresupuestoError(true);
      return;
    }

    await obtenerRecomendaciones(idUsuario);
    setPresupuestoDisplay(`S/${presupuesto}`);
    setPresupuestoError(false); 
  };

  // Manejar la selección de un plato
  const handleSeleccionar = async (nombrePlato) => {
    const platoExistente = platosSeleccionados.find((plato) => plato.nombre === nombrePlato);
  
    if (!platoExistente) {
      const precioTotal = await obtenerPlatoPorNombre(nombrePlato);
  
      if (precioTotal !== null) {
        const nuevoPlato = { nombre: nombrePlato, precioTotal };
        const nuevoTotal = montoActual + precioTotal;

        // Verificar si se excede el presupuesto
        if (presupuesto && nuevoTotal > presupuesto) {
          setModalAbierto(true);
        } else {
          setPlatosSeleccionados(prevPlatos => [...prevPlatos, nuevoPlato]);
          setMontoActual(nuevoTotal);
        }
      }
    }
  };

  // Manejar el descarte de un plato
  const handleDescartar = (nombrePlato, precioTotal) => {
    const nuevosPlatosSeleccionados = platosSeleccionados.filter((plato) => plato.nombre !== nombrePlato);
    setPlatosSeleccionados(nuevosPlatosSeleccionados);
    setMontoActual(prevMonto => prevMonto - precioTotal);
  };

  // Manejar el cambio en el campo de presupuesto
  const handleChangePresupuesto = (e) => {
    const value = parseFloat(e.target.value);
    setPresupuesto(value);
    setPresupuestoError(false); 
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setModalAbierto(false);
  };

  return (
    <div className="planificacion-container">
      <div className="presupuesto-container">
        <div className="presupuesto-display">
          <p>Presupuesto: {presupuestoDisplay}</p>
        </div>
        <div className="monto-actual-display">
          <p>Monto Actual: S/{montoActual.toFixed(2)}</p>
        </div>
      </div>
      <label className="presupuesto-label">Ingrese su Presupuesto:</label>
      <input
        type="number"
        step="0.01"
        min="50"
        max="500"
        placeholder="Ingrese su monto"
        className={`presupuesto-input ${presupuestoError ? "input-error" : ""}`}
        value={presupuesto}
        onChange={handleChangePresupuesto}
        required
      />
      {presupuestoError && <p className="presupuesto-error">Ingrese un presupuesto válido entre 50 y 500</p>}
      <div className="recomendaciones-section">
        <button onClick={handleRecomendacionesClick}>
          Obtener Recomendaciones
        </button>
        <br />
        <br />
        <div className="recomendaciones-list">
          {recomendaciones.length > 0 &&
            recomendaciones.map((recomendacion, index) => {
              const [nombrePlato, ingredientesYPrecio] = recomendacion.split(":");
              const [ingredientes, precioTotal] = ingredientesYPrecio ? ingredientesYPrecio.split("(Precio total: ") : ["", "0"];
              const ingredientesList = ingredientes.split(",").map((ingrediente) => ingrediente.trim());
              const precio = precioTotal ? parseFloat(precioTotal.replace(")", "").trim()) : 0;

              return (
                <div
                  key={index}
                  className={`plato-box ${platosSeleccionados.some((plato) => plato.nombre === nombrePlato) ? "seleccionado" : ""}`}
                >
                  <div className="plato-header">
                    <h4>{nombrePlato}</h4>
                    {precio > 0 && (
                      <span className="plato-precio">{` (Precio total: ${precio})`}</span>
                    )}
                  </div>
                  <ul>
                    {ingredientesList.map((ingrediente, i) => (
                      <li key={i}>{ingrediente}</li>
                    ))}
                  </ul>
                  <div className="botones-bottom">
                    <button
                      className={`boton-seleccionar ${platosSeleccionados.some((plato) => plato.nombre === nombrePlato) ? "seleccionado" : ""}`}
                      onClick={() => handleSeleccionar(nombrePlato)}
                    >
                      Seleccionar
                    </button>
                    <button
                      className="boton-descartar"
                      onClick={() => handleDescartar(nombrePlato, precio)}
                    >
                      Descartar
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Modal
        isOpen={modalAbierto}
        onClose={handleCloseModal}
        presupuestoActual={montoActual}
        presupuesto={presupuesto}
      />
    </div>
  );
}

export default PlanificacionRecetas;


