import React from 'react';
import '../css/Noticias.css';

import noticia1 from '../img/noticia1.jpg';
import noticia2 from '../img/noticia2.jpg';
import noticia3 from '../img/noticia3.jpg';

const LatestNews = () => {

  const noticias = [
    {
      id: 1,
      titulo: 'Estudio sugiere que una dieta mediterránea puede reducir el riesgo de enfermedades cardíacas',
      fecha: 'Julio 2024',
      imagen: noticia1,
      descripcion: 'Un estudio publicado en la revista científica Nutrition ha encontrado que seguir una dieta mediterránea puede reducir significativamente el riesgo de enfermedades cardíacas en adultos mayores. La dieta, rica en frutas, verduras, grasas saludables y pescado, mostró beneficios claros en la salud cardiovascular de los participantes del estudio.',
      enlace: 'https://www.atresmedia.com/objetivo-bienestar/actualidad/seguir-dieta-mediterranea-reduce-casi-tercio-riesgo-cardiovascular-mujeres_20230322641ad8c97262e50001b88739.html#:~:text=Llevar%20una%20dieta%20mediterránea%20reduce,en%20la%20revista%20%27Heart%27.&text=Llevar%20cabo%20una%20alimentación%20saludable%20es%20fundamental%20para%20la%20prevención%20de%20enfermedades.'
    },
    {
      id: 2,
      titulo: 'Investigación revela que el consumo regular de nueces puede reducir el riesgo de enfermedades cardiovasculares',
      fecha: 'Julio 2024',
      imagen: noticia2,
      descripcion: 'Un estudio reciente publicado en una revista científica destacada ha encontrado que incluir nueces regularmente en la dieta puede tener beneficios significativos para la salud cardiovascular, gracias a sus propiedades nutricionales únicas.',
      enlace: 'https://www.mayoclinic.org/es/diseases-conditions/heart-disease/in-depth/nuts/art-20046635#:~:text=Las%20investigaciones%20han%20demostrado%20que,la%20salud%20de%20las%20arterias.'
    },
    {
        id: 3,
        titulo: 'Estudio encuentra que el consumo de vegetales de hoja verde está asociado con una menor incidencia de deterioro cognitivo',
        fecha: 'Julio 2024',
        imagen: noticia3,
        descripcion: 'Investigadores de una universidad reconocida han descubierto que las personas que consumen regularmente vegetales de hoja verde, como espinacas y kale, tienen menos probabilidades de experimentar deterioro cognitivo con el paso de los años.',
        enlace: 'https://www.aarp.org/espanol/salud/salud-cerebral/info-2018/beneficios-de-comer-vegetales-para-la-memoria.html#:~:text=Un%20estudio%20encontró%20que%20los,personas%2011%20años%20más%20jóvenes.'
      },
  ];


  return (
    <div className="latest-news">
      <h2>Buenas Nuevas</h2>
      <div className="news-list">
        {noticias.map(noticia => (
          <div key={noticia.id} className="news-item">
          <img src={noticia.imagen} alt={noticia.titulo} className="news-image" />
            <div className="news-info">
              <h3>{noticia.titulo}</h3>
              <p>{noticia.descripcion}</p>
              <a href={noticia.enlace} className="read-more" target="_blank" rel="noopener noreferrer">Leer más</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
