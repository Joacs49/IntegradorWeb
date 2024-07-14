import React from "react";

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Política de Privacidad</h2>
        <p>
          Tu privacidad es importante para nosotros. Esta política de privacidad
          explica cómo recopilamos, usamos y protegemos tu información personal
          cuando visitas nuestro sitio web.
        </p><br></br>
        <h3>Información que Recopilamos</h3>
        <p>Podemos recopilar la siguiente información:</p>
        <ul>
          <li>
            Información de identificación personal (nombre, dirección de correo
            electrónico, número de teléfono, etc.)
          </li>
          <li>Datos de uso (páginas visitadas, tiempo en el sitio, etc.)</li>
        </ul><br></br>
        <h3>Cómo Usamos Tu Información</h3>
        <p>Usamos la información que recopilamos para:</p>
        <ul>
          <li>Proporcionar y mantener nuestro sitio web</li>
          <li>Mejorar la experiencia del usuario</li>
          <li>Comunicarnos contigo, incluyendo responder a tus consultas</li>
          <li>
            Enviarte actualizaciones, promociones e información de marketing
          </li>
        </ul><br></br>
        <h3>Seguridad</h3>
        <p>
          Nos comprometemos a garantizar la seguridad de tu información.
          Utilizamos una variedad de medidas de seguridad para proteger tus
          datos personales del acceso, uso o divulgación no autorizados.
        </p>
        <p>
          Si tienes alguna pregunta o inquietud sobre nuestra política de
          privacidad, por favor contáctanos.
        </p>
      </div>
    </div>
  );
};

export default PrivacyModal;
