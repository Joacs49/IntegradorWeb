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

  const handleIngredienteChange = (index, field, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index][field] = value;
    setIngredientes(newIngredientes);
  };

  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, { nombre: "", cantidad: "" }]);
  };

  return (
    <div>
      <h2>Planificación</h2>
      <br />
      <br />
      <form className="formulario-comidas" onSubmit={handleRecetaSubmit}>
        <div className="form-group">
          <h4>Nombre de la Receta</h4>
          <input
            type="text"
            placeholder="Ingrese el nombre de la receta"
            value={nombreReceta}
            onChange={(e) => setNombreReceta(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h4>Ingredientes</h4>
          {ingredientes.map((ingrediente, index) => (
            <div key={index} className="ingrediente-inputs">
              <input
                type="text"
                placeholder={`Nombre del ingrediente ${index + 1}`}
                value={ingrediente.nombre}
                onChange={(e) =>
                  handleIngredienteChange(index, "nombre", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Cantidad (gr)"
                value={ingrediente.cantidad}
                onChange={(e) =>
                  handleIngredienteChange(index, "cantidad", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={handleAddIngrediente}>
            Agregar Ingrediente
          </button>
        </div>
        <button type="submit">Generar Receta</button>
      </form>
      <div>
        <h3>Recetas</h3>
        <ul className="recetas-lista">
          {recetas.map((receta, index) => (
            <li key={index}>
              <h4>{receta.nombreReceta}</h4>
              <div className="ingredientes-container">
                {receta.ingredientes.map((ingrediente, idx) => (
                  <div key={idx} className="ingrediente-receta">
                    <p>{ingrediente.nombre}</p>
                    <p>{ingrediente.cantidad} gr</p>
                    {/* Aquí debería mostrarse el costo si lo tienes */}
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
