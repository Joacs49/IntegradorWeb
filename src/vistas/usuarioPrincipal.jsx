import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import "../css/usuarioPrincipal.css";
import { LogoutIcon } from "../components/componenteIcon";
import AdministracionCuenta from "../components/componenteCuenta";
import PlanificacionRecetas from "../components/componenteRecetas";
import HistorialPresupuesto from "../components/componentePresupuesto";

function UsuarioPrincipal({ onLogout }) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("cuenta");
  const [usuario, setUsuario] = useState(null);
  const [recetas, setRecetas] = useState([]);
  const [historialPresupuesto, setHistorialPresupuesto] = useState([]);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const correoParam = params.get('correo');
  const claveParam = params.get('clave');

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        if (!correoParam || !claveParam) {
          console.error('Correo y clave son obligatorios');
          return;
        }
        
        const response = await axios.get(`http://localhost:8090/api/usuario/${correoParam}?clave=${claveParam}`);
        if (response.status === 200) {
          setUsuario(response.data);
          setRecetas(response.data.recetas); // Asumiendo que las recetas están en la respuesta del usuario
          setHistorialPresupuesto(response.data.historialPresupuesto); // Asumiendo que el historial de presupuesto está en la respuesta del usuario
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud', error);
      }
    };

    if (!usuario && correoParam && claveParam) {
      obtenerDatosUsuario();
    }
  }, [correoParam, claveParam, usuario]);

  const handleOpcionClick = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  const handleLogoutClick = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8090/api/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Sesión cerrada:", response.data);
        if (typeof onLogout === "function") {
          onLogout();
        }
      })
      .catch(error => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <main className="usuario-principal-container">
      <header>
        <div className="container flex items-center justify-between gap-4">
          <div className="logo">NUTRIFIT</div>
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
            <li className={opcionSeleccionada === "cuenta" ? "active" : ""} onClick={() => handleOpcionClick("cuenta")}>
              Administración de la cuenta
            </li>
            <li className={opcionSeleccionada === "comidas" ? "active" : ""} onClick={() => handleOpcionClick("comidas")}>
              Planificación de Recetas
            </li>
            <li className={opcionSeleccionada === "presupuesto" ? "active" : ""} onClick={() => handleOpcionClick("presupuesto")}>
              Historial de presupuesto
            </li>
          </ul>
        </div>
        <div className="content">
          {opcionSeleccionada === "cuenta" && usuario && <AdministracionCuenta usuario={usuario} />}
          {opcionSeleccionada === "comidas" && usuario && <PlanificacionRecetas recetas={recetas} setRecetas={setRecetas} />}
          {opcionSeleccionada === "presupuesto" && usuario && <HistorialPresupuesto historialPresupuesto={historialPresupuesto} />}
        </div>
      </div>
    </main>
  );
}

export default UsuarioPrincipal;
