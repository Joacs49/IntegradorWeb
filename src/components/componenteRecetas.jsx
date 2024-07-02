import React, { useState } from "react";
import axios from "axios";

function PlanificacionRecetas() {
  const [recetas, setRecetas] = useState([]);
  const [nombreReceta, setNombreReceta] = useState("");
  const [ingredientes, setIngredientes] = useState([{ nombre: "", cantidad: "" }]);

  const obtenerRecetas = () => {
    axios.get("http://localhost:8090/api/recetas$/{idUsuario}")
      .then(response => {
        setRecetas(response.data);
      })
      .catch(error => {
        console.error("Error al obtener recetas:", error);
      });
  };

  const handleRecetaSubmit = (e) => {
    e.preventDefault();

    const ingredientesReceta = [...ingredientes];

    const nuevaReceta = {
      nombreReceta,
      ingredientes: ingredientesReceta,
    };

    // Enviar la nueva receta al backend
    axios.post("http://localhost:8090/api/recetas", nuevaReceta)
      .then(response => {
        obtenerRecetas(); // Actualizar la lista de recetas después de añadir una nueva
        setNombreReceta("");
        setIngredientes([{ nombre: "", cantidad: "" }]);
        alert("Receta añadida correctamente");
      })
      .catch(error => {
        console.error("Error al añadir receta:", error);
      });
  };

  const renderRecetasEnColumnas = () => {
    const columnas = [[], [], []];

    recetas.forEach((receta, index) => {
      columnas[index % 3].push(
        <li key={index}>
          <h4>{receta.nombreReceta}</h4>
          <div className="ingredientes-container">
            {receta.ingredientes.map((ingrediente, idx) => (
              <div key={idx} className="ingrediente-receta">
                <p>{ingrediente.nombre}</p>
                <p>{ingrediente.cantidad} gr</p>
              </div>
            ))}
          </div>
        </li>
      );
    });

    return columnas.map((columna, idx) => (
      <ul key={idx} className="recetas-columna">
        {columna}
      </ul>
    ));
  };

  return (
    <div>
      <h2>Planificación</h2>
      <br />
      <br />
      <form className="formulario-comidas" onSubmit={handleRecetaSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre de la receta"
            value={nombreReceta}
            onChange={(e) => setNombreReceta(e.target.value)}
          />
          <button type="submit">Generar Receta</button>
        </div>
      </form>
      <div>
        <h3>Recetas</h3>
        <div className="recetas-columnas">
          {recetas.length > 0 ? renderRecetasEnColumnas() : <p>No hay recetas aún</p>}
        </div>
      </div>
    </div>
  );
}

export default PlanificacionRecetas;
