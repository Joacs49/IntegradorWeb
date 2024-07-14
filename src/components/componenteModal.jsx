import React from "react";
import "../css/Modal.css";

const Modal = ({ isOpen, onClose, presupuestoActual, presupuesto }) => {
  if (!isOpen) return null;

  const montoRestante = presupuesto - presupuestoActual;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Alerta del Presupuesto </h2>
        <p>El Monto Restante a Gastar es de: S/{montoRestante.toFixed(2)}</p>
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
