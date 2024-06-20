import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/usuarioPrincipal.css";
import { LogoutIcon } from "../components/componenteIcon";

function UsuarioPrincipal({ onLogout }) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("cuenta");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [genero, setGenero] = useState("hombre");
  const [altura, setAltura] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [presupuesto, setPresupuesto] = useState("");

  const [recetas, setRecetas] = useState([]);
  const [nombreReceta, setNombreReceta] = useState("");
  const [ingredientes, setIngredientes] = useState([
    { nombre: "", cantidad: "" },
  ]);

  const handleOpcionClick = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  const handleLogoutClick = () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógicar a implementar para actualizar los datos
    console.log("Datos actualizados:", {
      nombreCompleto,
      correoElectronico,
      genero,
      altura,
      edad,
      peso,
      contraseña,
    });
    // Lógica para enviar los datos actualizados al servidor
    alert("Datos actualizados correctamente");
  };

  const handleRecetaSubmit = (e) => {
    e.preventDefault();
  
    const ingredientesReceta = [...ingredientes];

    const nuevaReceta = {
      nombreReceta,
      ingredientes: ingredientesReceta
    };
  
    setRecetas([...recetas, nuevaReceta]);
    setNombreReceta('');
    setIngredientes([{ nombre: '', cantidad: '', precio: '' }]);
  
    alert('Receta añadida correctamente');
  };
  

  const handleIngredienteChange = (index, field, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index][field] = value;
    setIngredientes(newIngredientes);
  };

  const handleAddIngrediente = () => {
    setIngredientes([
      ...ingredientes,
      { nombre: "", cantidad: "", precio: "" },
    ]);
  };

  const calcularCostoTotal = () => {
  let costoTotal = 0;

  recetas.forEach((receta) => {
    receta.ingredientes.forEach((ingrediente) => {
      const precio = parseFloat(ingrediente.precio);
      if (!isNaN(precio)) {
        costoTotal += precio;
      }
    });
  });

  return costoTotal;
};


  //Ejemplo para historial de presupuesto
  const historialPresupuesto = [
    { mes: "17/05/2024", presupuestoAsignado: 1000, gastosReales: 850 },
    { mes: "21/06/2024", presupuestoAsignado: 1200, gastosReales: 1150 },
  ];

  return (
    <main className="usuario-principal-container">
      <header>
        <div className="container flex items-center justify-between gap-4">
          <Link to="/" className="logo">
            NUTRIFIT
          </Link>
          <div className="nav-links flex items-center gap-4">
            <button onClick={handleLogoutClick} className="nav-link">
              <LogoutIcon className="icon" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="main-content">
        <div className="sidebar">
          <ul>
            <li
              className={opcionSeleccionada === "cuenta" ? "active" : ""}
              onClick={() => handleOpcionClick("cuenta")}
            >
              Administración de la cuenta
            </li>
            <li
              className={opcionSeleccionada === "comidas" ? "active" : ""}
              onClick={() => handleOpcionClick("comidas")}
            >
              Planificación de Recetas
            </li>
            <li
              className={opcionSeleccionada === "presupuesto" ? "active" : ""}
              onClick={() => handleOpcionClick("presupuesto")}
            >
              Historial de presupuesto
            </li>
          </ul>
        </div>
        <div className="content">
          {opcionSeleccionada === "cuenta" && (
            <div>
              <h2>Administración de la cuenta</h2>
              <br></br>
              <form className="formulario-cuenta" onSubmit={handleSubmit}>
                <div className="form-group">
                  <h4>Nombre Completo</h4>
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={nombreCompleto}
                    onChange={(e) => setNombreCompleto(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                  <h4>Correo Electrónico</h4>
                  <input
                    type="text"
                    placeholder="Correo Electrónico"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <h4>Género</h4>
                  <select
                    id="genero"
                    name="genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  >
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                  </select>
                  <br></br>
                  <br></br>
                  <h4>Altura</h4>
                  <input
                    type="number"
                    placeholder="Altura (cm)"
                    min="0"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <h4>Edad</h4>
                  <input
                    type="number"
                    placeholder="Edad"
                    min="0"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                  <h4>Peso</h4>
                  <input
                    type="number"
                    placeholder="Peso (kg)"
                    min="0"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                </div>
                <button type="submit">Actualizar Datos</button>
              </form>
            </div>
          )}
          {opcionSeleccionada === "comidas" && (
            <div>
              <h2>Planificación</h2>
              <br />
              <br />
              <form
                className="formulario-comidas"
                onSubmit={handleRecetaSubmit}
              >
                <div className="form-group">
                  <h4>Presupuesto</h4>
                  {ingredientes.map((ingrediente, index) => (
                    <div key={index} className="ingrediente">
                      <input
                        type="text"
                        placeholder="Ingrese el Presupuesto"
                        value={ingrediente.nombre}
                        onChange={(e) =>
                          handleIngredienteChange(
                            index,
                            "nombre",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
                <button type="submit">Generar</button>
              </form>
              <br />
              <br />
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
                          <p>S/. {ingrediente.precio}</p>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
                <h3>
                  
                  
                </h3>
              </ul>
            </div>
          )}

          {opcionSeleccionada === "presupuesto" && (
            <div>
              <h2>Historial de Presupuesto</h2>
              <div className="historial-presupuesto">
                <table>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Presupuesto Asignado (S/.)</th>
                      <th>Gastos Reales (S/.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historialPresupuesto.map((item, index) => (
                      <tr key={index}>
                        <td>{item.mes}</td>
                        <td>{item.presupuestoAsignado}</td>
                        <td>{item.gastosReales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default UsuarioPrincipal;
