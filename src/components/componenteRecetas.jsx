import React, { useState } from "react";

function PlanificacionRecetas({ recetas, setRecetas }) {
  const [nombreReceta, setNombreReceta] = useState("");
  const [ingredientes, setIngredientes] = useState([{ nombre: "", cantidad: "" }]);

  const handleRecetaSubmit = (e) => {
    e.preventDefault();

    const ingredientesReceta = [...ingredientes];

    const nuevaReceta = {
      nombreReceta,
      ingredientes: ingredientesReceta,
    };

    setRecetas([...recetas, nuevaReceta]);
    setNombreReceta("");
    setIngredientes([{ nombre: "", cantidad: "" }]);

    alert("Receta añadida correctamente");
  };


  return (
    <div>
      <h2>Planificación</h2>
      <br />
      <br />
      <form className="formulario-comidas" onSubmit={handleRecetaSubmit}>
        <div className="form-group">
          <button type="submit">Generar Receta</button>
        </div>
      </form>
      <div>
        <h3>Recetas</h3>
        <ul className="recetas-lista">
          {recetas && recetas.map((receta, index) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlanificacionRecetas;
