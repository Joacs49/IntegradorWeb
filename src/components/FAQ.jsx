import React, { useState } from 'react';
import '../css/FAQ.css';

const FAQ = () => {
  const faqData = [
    {
      id: 1,
      question: '¿Cómo puedo comenzar una dieta equilibrada?',
      answer: 'Para comenzar una dieta equilibrada, es importante incluir alimentos ricos en nutrientes como frutas, verduras, proteínas magras y granos enteros. También es esencial mantenerse hidratado y limitar el consumo de alimentos procesados y azúcares añadidos.',
    },
    {
      id: 2,
      question: '¿Cuánto ejercicio debo hacer cada semana?',
      answer: 'Se recomienda realizar al menos 150 minutos de ejercicio moderado a vigoroso cada semana, distribuidos en varios días. Esto puede incluir caminar rápido, correr, nadar, o actividades aeróbicas como bailar. Además, es beneficioso complementar con ejercicios de fuerza para fortalecer los músculos y huesos.',
    },
    {
        id: 3,
        question: '¿Cuáles son los beneficios de beber suficiente agua todos los días?',
        answer: 'Beber suficiente agua ayuda a mantener la hidratación adecuada del cuerpo, mejora la salud de la piel, facilita la digestión, regula la temperatura corporal y ayuda a transportar nutrientes y oxígeno a las células.',
    },
    {
        id: 4,
        question: '¿Qué alimentos son ricos en proteínas y son ideales para incluir en una dieta equilibrada?',
        answer: 'Algunos alimentos ricos en proteínas incluyen carnes magras (pollo, pavo, cerdo), pescado, huevos, productos lácteos bajos en grasa, legumbres (frijoles, lentejas, garbanzos) y tofu.',
    },
    {
        id: 5,
        question: '¿Es necesario consumir suplementos vitamínicos si llevo una dieta balanceada?',
        answer: 'En general, si llevas una dieta variada y equilibrada, no necesitas suplementos vitamínicos adicionales. Sin embargo, algunas personas pueden necesitar suplementos específicos según sus necesidades de salud o bajo la recomendación de un profesional de la salud.',
    },
    {
        id: 6,
        question: '¿Cuáles son algunos consejos para mejorar la calidad del sueño?',
        answer: 'Para mejorar la calidad del sueño, es recomendable establecer horarios regulares para dormir y despertar, crear un ambiente propicio para dormir (oscuro, tranquilo y fresco), evitar la cafeína y las comidas pesadas antes de dormir, y practicar técnicas de relajación como la meditación o la respiración profunda.',
    },
    {
        id: 7,
        question: '¿Qué ejercicios son recomendables para fortalecer el core?',
        answer: 'Algunos ejercicios efectivos para fortalecer el core incluyen planchas abdominales, elevaciones de piernas, crunches, y ejercicios con pelota de estabilidad. También son útiles actividades como el yoga y el pilates, que mejoran la estabilidad y fuerza central.',
    },
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleAnswer = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="faq-section">
      <h2 className='text-special'>Preguntas Frecuentes</h2>
      {faqData.map((item) => (
  <div key={item.id} className="faq-item">
    <button className="question" onClick={() => toggleAnswer(item.id)}>
      {item.question}
    </button>
    {expandedId === item.id && (
      <div className="answer">
        <p>{item.answer}</p>
      </div>
    )}
  </div>
))}

    </div>
  );
};

export default FAQ;
