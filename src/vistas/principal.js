import React from "react";
import '../css/App.css';
import img1 from '../img/img1.jpg';
import { DumbbellIcon, LeafIcon, MedalIcon } from '../components/componenteIcon';

function Principal() {
  return (
    <div className="container2">
      <div className="grid-container">
        <div className="text-content">
          <div className="badge">
            Bienestar Integral
          </div>
          <h1 className="main-heading">Nutre tu cuerpo, Alimenta tu mente.</h1>
          <p className="description">
            Encuentra el equilibrio perfecto entre una alimentación saludable y el bienestar mental.
          </p>
          <div className="button-group">
            <a href="/#" className="btn-primary">Posibles</a>
            <a href="/#" className="btn-secondary">Posibles</a>
          </div>
        </div>
        <div className="image-container">
          <img
            src={img1}
            alt="Bienestar Integral"
            className="responsive-image"
          />
        </div>
      </div>
      <div className="grid-features">
        <div className="feature-card">
          <div className="icon-title">
            <LeafIcon className="icon leaf-icon" />
            <h3 className="feature-heading">Alimentación Saludable</h3>
          </div>
          <p className="feature-description">
            Descubre recetas nutritivas y deliciosas que te ayudarán a mantener una dieta equilibrada y saludable.
          </p>
        </div>
        <div className="feature-card">
          <div className="icon-title">
            <MedalIcon className="icon medal-icon" />
            <h3 className="feature-heading">Bienestar Mental</h3>
          </div>
          <p className="feature-description">
            Encuentra recetas saludables que nutren tu cuerpo y mente, ayudándote a mantener un equilibrio y bienestar integral.
          </p>
        </div>
        <div className="feature-card">
          <div className="icon-title">
            <DumbbellIcon className="icon dumbbell-icon" />
            <h3 className="feature-heading">Actividad Física</h3>
          </div>
          <p className="feature-description">
            Descubre recetas saludables que te brindarán la energía necesaria para tus actividades físicas, ayudándote a mantener un estilo de vida activo y equilibrado.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Principal;
