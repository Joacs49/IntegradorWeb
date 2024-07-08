import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./componenteModal";
import IngredientesModal from "./IngredientesModal";

function PlanificacionRecetas({ idUsuario }) {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [platosSeleccionados, setPlatosSeleccionados] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);
  const [presupuestoError, setPresupuestoError] = useState(false);
  const [presupuestoDisplay, setPresupuestoDisplay] = useState("S/0");
  const [presupuestoGuardado, setPresupuestoGuardado] = useState(0);
  const [montoActual, setMontoActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false); // Estado para controlar la apertura del modal
  const [ingredientesModalAbierto, setIngredientesModalAbierto] = useState(false); // Estado para controlar la apertura del modal de ingredientes

  // Función para obtener las recomendaciones
  const obtenerRecomendaciones = async (idUsuario) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/plandecomida/recomendaciones/${idUsuario}`);
      setRecomendaciones(response.data.split("\n"));
    } catch (error) {
      console.error("Error al obtener las recomendaciones:", error);
    }
  };

  // Función para guardar un plato por su nombre
  const guardarPorNombre = async (nombrePlato) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/recetas/detallePorNombre/${nombrePlato}`);

      if (response.data) {
        const platoGuardado = {
          nombre: nombrePlato,
          ingredientes: response.data.ingredientes,
          precioTotal: await obtenerPlatoPorNombre(nombrePlato)
        };

        setPlatosSeleccionados(prevPlatos => [...prevPlatos, platoGuardado]);
      } else {
        console.error(`No se pudo obtener detalles para ${nombrePlato}`);
      }
    } catch (error) {
      console.error(`Error al intentar guardar ${nombrePlato}:`, error);
    }
  };

  // Función para obtener el precio total de un plato por su nombre
  const obtenerPlatoPorNombre = async (nombrePlato) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/plandecomida/busqueda/${idUsuario}/${nombrePlato}`);

      if (Array.isArray(response.data) && response.data.length > 0) {
        const detallesPlato = response.data[0];

        if (detallesPlato.includes("Precio total")) {
          const precioTotalIndex = detallesPlato.lastIndexOf("Precio total");
          const precioTotal = detallesPlato.substring(precioTotalIndex + 13).trim();

          return parseFloat(precioTotal);
        } else {
          console.error("No se encontró 'Precio total' en los detalles del plato.");
          return 0;
        }
      } else {
        console.error("La respuesta de la API no contiene datos válidos.");
        return 0;
      }
    } catch (error) {
      console.error("Error al obtener detalles del plato:", error);
      return 0;
    }
  };

  // Función para actualizar el monto total al seleccionar o descartar platos
  useEffect(() => {
    let total = 0;
    platosSeleccionados.forEach((plato) => {
      total += parseFloat(plato.precioTotal);
    });
    setMontoActual(total);
  }, [platosSeleccionados]);

  // Manejar el clic para obtener recomendaciones
  const handleRecomendacionesClick = async () => {
    if (!presupuesto || presupuesto < 50 || presupuesto > 500) {
      setPresupuestoError(true);
      return;
    }

    await obtenerRecomendaciones(idUsuario);
    setPresupuestoDisplay(`S/${presupuesto}`);
    setPresupuestoGuardado(presupuesto);
    setPresupuesto(0);
    setPresupuestoError(false);
  };

  // Manejar la selección de un plato
  const handleSeleccionar = async (nombrePlato) => {
    const platoExistente = platosSeleccionados.find((plato) => plato.nombre === nombrePlato);

    if (!platoExistente) {
      try {
        // Obtener el precio total del plato por su nombre
        const precioPlato = await obtenerPlatoPorNombre(nombrePlato);

        // Verificar si se excede el presupuesto guardado
        const nuevoTotal = montoActual + precioPlato;
        if (presupuestoGuardado && nuevoTotal > presupuestoGuardado) {
          setModalAbierto(true);
          return; // Evitar agregar el plato si se excede el presupuesto
        }

        // Guardar el plato por su nombre usando la función existente
        await guardarPorNombre(nombrePlato);

        // Actualizar monto actual
        setMontoActual(prevMonto => prevMonto + precioPlato);
      } catch (error) {
        console.error(`Error al seleccionar ${nombrePlato}:`, error);
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

  // Abrir modal de ingredientes
  const handleAbrirIngredientesModal = () => {
    setIngredientesModalAbierto(true);
  };

  // Cerrar modal de ingredientes
  const handleCerrarIngredientesModal = () => {
    setIngredientesModalAbierto(false);
  };

  // Manejar el guardado del plan de comidas
  const handleGuardarPlanDeComidas = () => {
 
    // Abrir modal de ingredientes al guardar el plan de comidas
    handleAbrirIngredientesModal();

  };

  const handleCloseModal = () => {
    setModalAbierto(false);
  };

  return (
    <div className="planificacion-container">
      <div className="presupuesto-container">
        <div className="monto-actual-display">
          <p>Presupuesto: {presupuestoDisplay}</p>
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
                  <div className="plato-info">
                    <h4>{nombrePlato}</h4>
                    {precio > 0 && (
                      <span className="plato-precio"> (Precio total: ${precio})</span>
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
        {platosSeleccionados.length > 0 && (
          <div className="guardar-plan-comidas">
            <button onClick={handleGuardarPlanDeComidas}>
              Guardar plan de comidas
            </button>
          </div>
        )}
      </div>

      {/* Modal de ingredientes */}
      <IngredientesModal
        isOpen={ingredientesModalAbierto}
        onClose={handleCerrarIngredientesModal}
        platosSeleccionados={platosSeleccionados}
      />

      <Modal
        isOpen={modalAbierto} // Pasar estado de modalAbierto como prop isOpen
        onClose={handleCloseModal} // Pasar función de cierre como prop onClose
        presupuestoActual={montoActual} // Pasar montoActual como prop
        presupuesto={presupuestoGuardado} // Pasar presupuestoGuardado como prop
      />
    </div>
  );
}

export default PlanificacionRecetas;
