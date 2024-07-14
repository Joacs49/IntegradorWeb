import React from "react";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Contáctanos</h2>
        <br></br>
        <p>
          Si tienes alguna pregunta, comentario o sugerencia, ¡nos encantaría
          saber de ti! Puedes contactarnos a través de los siguientes métodos:
        </p>
        <br></br>
        <ul>
          <li>Email: info@nutricionywellness.com</li>
          <li>Teléfono: +123 456 7890</li>
          <li>Dirección: Calle Wellness 123, Ciudad Saludable, CS 12345</li>
        </ul>
        <br></br>
        <p>
          Nos comprometemos a responder todas las consultas dentro de las 48
          horas. ¡Gracias por ponerte en contacto con nosotros!
        </p>
      </div>
    </div>
  );
};

export default ContactModal;
