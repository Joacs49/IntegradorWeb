import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function HistorialPresupuesto({ historialPresupuesto = [], presupuestoDisplay, montoActual }) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Presupuesto", 10, 10);
    
    const tableColumn = ["Fecha", "Presupuesto Asignado (S/.)", "Gastos Reales (S/.)"];
    const tableRows = [];

    historialPresupuesto.forEach(item => {
      const historialData = [
        item.mes || fechaActual,
        item.presupuestoAsignado || presupuestoDisplay,
        item.gastosReales || montoActual.toFixed(2)
      ];
      tableRows.push(historialData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("historial_presupuesto.pdf");
  };

  const fechaActual = new Date().toLocaleDateString();

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
            {historialPresupuesto.map((item, index) => (
              <tr key={index}>
                <td>{item.mes || fechaActual}</td>
                <td>{item.presupuestoAsignado || presupuestoDisplay}</td>
                <td>{item.gastosReales || montoActual.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleDownloadPDF}>Descargar en PDF</button>
    </div>
  );
}

export default HistorialPresupuesto;