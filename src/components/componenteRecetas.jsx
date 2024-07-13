import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./componenteModal";
import IngredientesModal from "./IngredientesModal";

function PlanificacionRecetas({ idUsuario, nombre }) {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [platosSeleccionados, setPlatosSeleccionados] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);
  const [presupuestoError, setPresupuestoError] = useState(false);
  const [presupuestoDisplay, setPresupuestoDisplay] = useState("S/0");
  const [presupuestoGuardado, setPresupuestoGuardado] = useState(0);
  const [montoActual, setMontoActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [ingredientesModalAbierto, setIngredientesModalAbierto] = useState(false);
  const [presupuestoPlan, setPresupuestoPlan] = useState(0);
  const [idUsuarioPlan, setIdUsuarioPlan] = useState(0);

  // Función para obtener las recomendaciones
  const obtenerRecomendaciones = async (idUsuario) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/plandecomida/recomendaciones/${idUsuario}`);
      setRecomendaciones(response.data.split("\n"));
    } catch (error) {
      console.error("Error al obtener las recomendaciones:", error);
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

  const handleRecomendacionesClick = async () => {
    if (!presupuesto || presupuesto < 50 || presupuesto > 500) {
      setPresupuestoError(true);
      return;
    }
  
    try {
      setPresupuestoGuardado(presupuesto); // Guardar el presupuesto antes de actualizar el display
      setPresupuestoDisplay(`S/${presupuesto}`);
      setPresupuestoError(false);
  
      await obtenerRecomendaciones(idUsuario);
      // No establezcas presupuesto a cero aquí
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
    }
  };
  
  const handleGuardarPlanDeComidas = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8090/api/plandecomida/register",
        {
          usuario: nombre,
          presupuesto: presupuestoGuardado, // Usar presupuestoGuardado en lugar de presupuesto
          platos: platosSeleccionados
        },
        {
          params: {
            userId: idUsuario
          }
        }
      );
  
      if (response.status === 200) {
        console.log("Plan de comida registrado correctamente:", response.data);
        handleAbrirIngredientesModal();
        setPresupuesto(0); // Limpiar el presupuesto después de guardar el plan
      } else {
        console.error("Error al registrar el plan de comida:", response.data);
      }
    } catch (error) {
      console.error("Error al registrar el plan de comida:", error);
    }
  };
  
  

  // Manejar la selección de un plato
  const handleSeleccionar = async (nombrePlatoCompleto) => {
    // Filtrar el nombre del plato para quitar cualquier número al inicio
    const match = nombrePlatoCompleto.match(/^\d+/);
    const nombrePlato = match ? nombrePlatoCompleto.substring(match[0].length).trim() : nombrePlatoCompleto;

    const platoExistente = platosSeleccionados.find((plato) => plato.nombre === nombrePlato);
    const idReceta = nombrePlatoCompleto ? nombrePlatoCompleto.match(/\d+/)[0] : '';

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
        const response = await axios.get(`http://localhost:8090/api/recetas/detallePorNombre/${nombrePlato}`);

        if (response.data) {
          const platoGuardado = {
            nombre: nombrePlato,
            ingredientes: response.data.ingredientes,
            precioTotal: precioPlato,
            idReceta: idReceta // Guardar idReceta aquí
          };

          setPlatosSeleccionados(prevPlatos => [...prevPlatos, platoGuardado]);
          // Actualizar monto actual
          setMontoActual(prevMonto => prevMonto + precioPlato);
        } else {
          console.error(`No se pudo obtener detalles para ${nombrePlato}`);
        }
      } catch (error) {
        console.error(`Error al seleccionar ${nombrePlato}:`, error);
      }
    }
  };

  // Manejar el descarte de un plato
  const handleDescartar = (nombrePlato, precioTotal) => {
    const match = nombrePlato.match(/^\d+/);
    const nombrePlato1 = match ? nombrePlato.substring(match[0].length).trim() : nombrePlato;
    const platoDescartado = platosSeleccionados.find((plato) => plato.nombre === nombrePlato1);

    if (platoDescartado) {
      const nuevosPlatosSeleccionados = platosSeleccionados.filter((plato) => plato.nombre !== nombrePlato1);
      setPlatosSeleccionados(nuevosPlatosSeleccionados);
      setMontoActual(prevMonto => prevMonto - parseFloat(precioTotal)); // Asegurarse de parsear precioTotal a float
    }
  };

  // Manejar el cambio en el campo de presupuesto
  const handleChangePresupuesto = (e) => {
    const value = parseFloat(e.target.value);
    setPresupuesto(value);
    setPresupuestoError(false);
  };

  // Abrir modal de ingredientes
  const handleAbrirIngredientesModal = () => {
    setPresupuestoPlan(presupuestoGuardado);
    setIdUsuarioPlan(idUsuario);
    setIngredientesModalAbierto(true);
  };

  // Cerrar modal de ingredientes
  const handleCerrarIngredientesModal = () => {
    setIngredientesModalAbierto(false);
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
              const [nombrePlato, detalle] = recomendacion.split(":");
              const [ingredientes, precioTotal] = detalle ? detalle.split("(Precio total: ") : ["", "0"];
              const ingredientesList = ingredientes.split(",").map((ingrediente) => ingrediente.trim());
              const idReceta = nombrePlato ? nombrePlato.match(/\d+/)[0] : '';

              // Eliminar el número de receta del inicio del nombre del plato
              const nombrePlatoSinNumero = nombrePlato.replace(/^\d+/, '').trim();

              return (
                <div
                  key={index}
                  className={`plato-box ${platosSeleccionados.some((plato) => plato.nombre === nombrePlatoSinNumero) ? "seleccionado" : ""}`}
                >
                  <div className="plato-info">
                    <h4>{nombrePlatoSinNumero}</h4>
                    {precioTotal && (
                      <span className="plato-precio"> (Precio total: ${precioTotal})</span>
                    )}
                  </div>
                  <input
                    type="text"
                    className="id-receta-input"
                    value={idReceta}
                    disabled
                  />
                  <ul>
                    {ingredientesList.map((ingrediente, i) => (
                      <li key={i}>{ingrediente}</li>
                    ))}
                  </ul>
                  <div className="botones-bottom">
                    <button
                      className={`boton-seleccionar ${platosSeleccionados.some((plato) => plato.nombre === nombrePlatoSinNumero) ? "seleccionado" : ""}`}
                      onClick={() => handleSeleccionar(nombrePlato)}
                    >
                      Seleccionar
                    </button>
                    <button
                      className="boton-descartar"
                      onClick={() => handleDescartar(nombrePlato, parseFloat(precioTotal))}
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
        presupuesto={presupuestoPlan}
        idUsuario={idUsuarioPlan}
        nombre={nombre} 
      />

      <Modal
        isOpen={modalAbierto}
        onClose={handleCloseModal}
        presupuestoActual={montoActual}
        presupuesto={presupuestoGuardado}
      />

      {/* Input hidden para el idUsuario */}
      <input type="hidden" name="idUsuario" value={idUsuario} disabled />
      <input type="hidden" name="nombre" value={nombre} disabled />

    </div>
  );
}

export default PlanificacionRecetas;
