import React from "react";

function HistorialPresupuesto({ historialPresupuesto }) {
  return (
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
            {historialPresupuesto && historialPresupuesto.map((item, index) => (
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
  );
}

export default HistorialPresupuesto;
