import React from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../css/IngredientesModal.css";

const IngredientesModal = ({ isOpen, onClose, platosSeleccionados, idUsuario, dias }) => {
  
  // Filtrar días duplicados y eliminar días vacíos
  const diasSeleccionados = Array.from(new Set(dias.filter(dia => dia !== '')));

  const handleGenerarPDF = async () => {
    try {
      const idsRecetas = platosSeleccionados.map((plato) => parseInt(plato.idReceta));

      const data = {
        recetas: idsRecetas,
        dias: diasSeleccionados
      };

      console.log("Datos a enviar:", data);

      const response = await axios.post(
        `http://localhost:8090/api/plandecomida/recetaplan`,
        data,
        {
          params: {
            userId: idUsuario
          }
        }
      );

      if (response.status === 200) {
        console.log("Plan de comida guardado correctamente:", response.data);

        // Generar PDF con los datos
        const doc = new jsPDF();
        let y = 20; // Posición inicial en Y para cada plato

        platosSeleccionados.forEach((plato, index) => {
          // Añadir página nueva si es necesario
          if (y > 270) { // Ajustar según el tamaño de la página y el espacio entre platos
            doc.addPage();
            y = 20; // Reiniciar posición en Y para nueva página
          }

          // Agregar texto del plato
          doc.setFontSize(12);
          doc.text(`Plato ${index + 1}: ${plato.nombre}`, 15, y);
          
          // Agregar ingredientes
          doc.setFontSize(10);
          let ingredientesText = "";
          plato.ingredientes.forEach((ingrediente, i) => {
            ingredientesText += `${i + 1}. ${ingrediente}\n`;
          });
          doc.text(ingredientesText, 15, y + 10);
          
          // Agregar precio total al final de la lista de ingredientes
          doc.setFontSize(12);
          doc.text(`Precio Total: $${plato.precioTotal}`, 15, y + 80);

          // Dibujar borde alrededor del plato
          doc.rect(10, y - 5, 190, 90); // Ajustar tamaño del cuadro según el contenido

          // Aumentar posición en Y para siguiente plato
          y += 100; // Ajustar según el tamaño del cuadro y el espacio entre platos
        });

        doc.save("detalles_platos_seleccionados.pdf");
        
      } else {
        console.error("Error al guardar el plan de comida:", response.data);
        // Maneja el error según sea necesario
      }
    } catch (error) {
      console.error("Error al guardar el plan de comida:", error);
      // Maneja el error según sea necesario
    }
  };

  return (
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        <h2>Detalles de Platos Seleccionados</h2>
        <div className="platos-seleccionados">
          {platosSeleccionados && platosSeleccionados.length > 0 ? (
            platosSeleccionados.map((plato, index) => (
              <div key={index} className="plato-detalle">
                <h3>{plato.nombre}</h3>
                <input
                  type="hidden"
                  className="id-plato-input"
                  value={plato.idReceta} // Mostrar el número de receta aquí
                  disabled
                />
                <ul>
                  {plato.ingredientes.map((ingrediente, i) => (
                    <li key={i}>{ingrediente}</li>
                  ))}
                </ul>
                <div className="select-container">
                  <span className="dia-seleccionado">
                    {plato.dia ? `Día seleccionado: ${plato.dia}` : "Selecciona un día"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No hay platos seleccionados.</p>
          )}
        </div>
        <div className="button-container">
          <button className="button-generar-pdf" onClick={handleGenerarPDF}>
            Generar PDF
          </button>
          <button className="button-cerrar" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientesModal;

