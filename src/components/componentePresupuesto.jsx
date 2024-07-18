import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

function HistorialPresupuesto({ historialPresupuesto }) {

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Presupuesto", 10, 10);
    
    const tableColumn = ["Fecha", "Presupuesto Asignado (S/.)", "Gastos Reales (S/.)"];
    const tableRows = [];

    historialPresupuesto.forEach(item => {
      const historialData = [
        item.fecha || fechaActual,
        item.presupuesto || '',
        item.monto ? item.monto.toFixed(2) : ''
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
    <div className="historial-presupuesto">
      <h2>Historial de Presupuesto</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Presupuesto</th>
            <th>Gastos Reales</th>
          </tr>
        </thead>
        <tbody>
          {historialPresupuesto.map((entry, index) => (
            <tr key={index}>
              <td>{entry.fecha || fechaActual}</td>
              <td>{entry.presupuesto || ''}</td>
              <td>{entry.monto ? entry.monto.toFixed(2) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <button onClick={handleDownloadPDF}>Descargar en PDF</button>
    </div>
  );
}

export default HistorialPresupuesto;
