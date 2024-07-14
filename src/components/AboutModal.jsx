import React from "react";

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Sobre Nosotros</h2>
        <br></br>
        <p>
          ¡Bienvenido a nuestra plataforma de nutrición y bienestar! Nuestra
          misión es proporcionarte los recursos e información que necesitas para
          mantener un estilo de vida equilibrado y saludable. Ya sea que estés
          buscando recetas nutritivas, rutinas de ejercicio o consejos para el
          bienestar mental, te tenemos cubierto. Nuestro equipo de expertos está
          dedicado a ayudarte a alcanzar tus objetivos de salud y a vivir una
          vida más feliz y saludable.
        </p>
        <br></br>
        <p>
          Gracias por visitar nuestro sitio. Esperamos que encuentres nuestro
          contenido útil e inspirador. Si tienes alguna pregunta o comentario,
          no dudes en contactarnos.
        </p>
      </div>
    </div>
  );
};

export default AboutModal;
