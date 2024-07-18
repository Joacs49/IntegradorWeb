import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./componenteModal";
import IngredientesModal from "./IngredientesModal";


function PlanificacionRecetas({ idUsuario, nombre, onUpdateBudgetAndExpenses }) {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [platosSeleccionados, setPlatosSeleccionados] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);
  const [presupuestoError, setPresupuestoError] = useState(false);
  const [presupuestoDisplay, setPresupuestoDisplay] = useState("S/0");
  const [presupuestoGuardado, setPresupuestoGuardado] = useState(0);
  const [montoActual, setMontoActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [ingredientes, setIngredientes] = useState(false);
  const [presupuestoPlan, setPresupuestoPlan] = useState(0);
  const [idUsuarioPlan, setIdUsuarioPlan] = useState(0);

  const [dias, setDias] = useState([]);

  const handleSelectChange = async (index, e) => {
    const selectedDay = e.target.value; // Obtener el valor seleccionado directamente

    // Actualizar el estado de los días seleccionados
    setDias(prevDias => {
      const newDias = [...prevDias];
      newDias[index] = selectedDay;
      return newDias;
    });

    // Si ya hay un plato seleccionado para este índice, descartarlo automáticamente
    if (platosSeleccionados[index]) {
      handleDescartar(platosSeleccionados[index].nombre, platosSeleccionados[index].precioTotal);
    }

    // Seleccionar automáticamente el plato con el nuevo día seleccionado
    await handleSeleccionar(recomendaciones[index], index, selectedDay);
  };

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
    if (!presupuesto || presupuesto < 400 || presupuesto > 1000) {
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
      const platosFiltrados = platosSeleccionados.reduce((uniquePlatos, plato) => {
        const exists = uniquePlatos.some((p) => p.dia === plato.dia);
        if (!exists) {
          uniquePlatos.push(plato);
        }
        return uniquePlatos;
      }, []);
  
      const response = await axios.post(
        "http://localhost:8090/api/plandecomida/register",
        {
          usuario: nombre,
          presupuesto: presupuestoGuardado,
          platos: platosFiltrados,
        },
        {
          params: {
            userId: idUsuario,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Plan de comida registrado correctamente:", response.data);
        handleAbrirIngredientesModal();

        const fechaActual = new Date().toISOString().split('T')[0];
        onUpdateBudgetAndExpenses(presupuesto, montoActual, fechaActual );

        setPresupuesto(0); // Limpiar el presupuesto después de guardar el plan
  
        
        setMontoActual(0);
      } else {
        console.error("Error al registrar el plan de comida:", response.data);
      }
    } catch (error) {
      console.error("Error al registrar el plan de comida:", error);
    }
  };

  // Manejar la selección de un plato
  const handleSeleccionar = async (nombrePlatoCompleto, index, selectedDay) => {
    if (!dias[index]) {
      return;
    }

    const precioPlato = await obtenerPlatoPorNombre(nombrePlatoCompleto);

    // Calcular el presupuesto diario
    const presupuestoDiario = presupuesto / 7;

    // Verificar si el plato excede el presupuesto diario


    // Filtrar el nombre del plato para quitar cualquier número al inicio
    const match = nombrePlatoCompleto.match(/^\d+/);
    const nombrePlato = match ? nombrePlatoCompleto.substring(match[0].length).trim() : nombrePlatoCompleto;

    // Verificar si el día ya está seleccionado en otro plato
    if (platosSeleccionados.some((plato) => plato.dia === selectedDay)) {
      console.log(`Ya hay un plato seleccionado para el día ${selectedDay}`);
      return;
    }

    const platoExistente = platosSeleccionados.find((plato) => plato.nombre === nombrePlato);

    if (!platoExistente) {
      try {
        if (precioPlato <= presupuestoDiario) {
          const response = await axios.get(`http://localhost:8090/api/recetas/detallePorNombre/${nombrePlato}`);

          if (response.data) {
            const platoGuardado = {
              nombre: nombrePlato,
              ingredientes: response.data.ingredientes,
              precioTotal: precioPlato,
              idReceta: nombrePlatoCompleto.match(/\d+/)[0], // Guardar idReceta aquí
              dia: selectedDay, // Guardar el día seleccionado
            };

            setPlatosSeleccionados((prevPlatos) => [...prevPlatos, platoGuardado]);
            // Actualizar monto actual
            setMontoActual((prevMonto) => prevMonto + precioPlato);
            console.log(selectedDay)
          } else {
            console.error(`No se pudo obtener detalles para ${nombrePlato}`);
          }
        } else {
          console.log(`El plato ${nombrePlatoCompleto} excede el presupuesto diario.`, selectedDay);
          console.log(selectedDay)
        }
      } catch (error) {
        console.error(`Error al seleccionar ${nombrePlato}:`, error);
      }
    }
  };

  // Función para manejar el descarte de un plato
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
    setIngredientes(true);
  };

  // Cerrar modal de ingredientes
  const handleCerrarIngredientesModal = () => {
    setIngredientes(false);
  };

  const handleCloseModal = () => {
    setModalAbierto(false);
  };

  const getFullDayName = (dayAbbr) => {
    switch (dayAbbr) {
      case 'Lunes':
        return 'Lunes';
      case 'Martes':
        return 'Martes';
      case 'Miércoles':
        return 'Miércoles';
      case 'Jueves':
        return 'Jueves';
      case 'Viernes':
        return 'Viernes';
      case 'Sábado':
        return 'Sábado';
      case 'Domingo':
        return 'Domingo';
      default:
        return ''; // Esto debería manejarse adecuadamente en tu lógica, si ocurre algo inesperado.
    }
  };


  return (
    <div className="planificacion-container">
      <div className="presupuesto-container">
        <div className="monto-actual-display">
          <p>Presupuesto: {presupuestoDisplay}</p>
          <p>Presupuesto Diario: S/{(presupuesto ? (presupuesto / 7).toFixed(2) : '0.00')}</p>
          <p>Monto Actual: S/{montoActual.toFixed(2)}</p>
          <p>Monto Restante: S/{(presupuesto && montoActual >= 0 ? (presupuesto - montoActual).toFixed(2) : '0.00')}</p>
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
      {presupuestoError && <p className="presupuesto-error">Ingrese un presupuesto válido entre 400 y 1000</p>}
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
                    type="hidden"
                    className="id-receta-input"
                    value={idReceta}
                    disabled
                  />
                  <ul>
                    {ingredientesList.map((ingrediente, i) => (
                      <li key={i}>{ingrediente}</li>
                    ))}
                  </ul>
                  <select className={`dias-select ${platosSeleccionados.some((plato) => plato.nombre === nombrePlatoSinNumero && plato.dia === dias[index]) ? "seleccionado" : ""}`}
                  value={dias[index] || ''} onChange={(e) => handleSelectChange(index, e)}>
                    <option value="">Seleccionar Día</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                  </select>
                  <div className="botones-bottom">
                    <button
                      className={`boton-seleccionar ${platosSeleccionados.some((plato) => plato.nombre === nombrePlatoSinNumero && plato.dia === dias[index]) ? "deshabilitado" : ""}`}
                      onClick={() => handleSeleccionar(nombrePlato, index, getFullDayName(dias[index]))}
                      disabled={!dias[index] || platosSeleccionados.some(plato => plato.dia === dias[index])}
                    >
                      Seleccionar
                    </button>
                    <button
                      className="boton-descartar"
                      onClick={() => handleDescartar(nombrePlato, parseFloat(precioTotal))}
                      disabled={!dias[index]}
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
            <button onClick={handleGuardarPlanDeComidas} >
              Guardar plan de comidas
            </button>
          </div>
        )}
      </div>

      {/* Modal de ingredientes */}
      <IngredientesModal
        isOpen={ingredientes}
        onClose={handleCerrarIngredientesModal}
        platosSeleccionados={platosSeleccionados}
        presupuesto={presupuestoPlan}
        idUsuario={idUsuarioPlan}
        nombre={nombre}
        dias={dias}
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
