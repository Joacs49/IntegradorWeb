import React, { useState } from "react";
import "../css/IMCCalculator.css";

const IMCCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  // Función para calcular el IMC
  const calculateBMI = () => {
    const heightMeters = parseFloat(height) / 100;
    // Calcula el IMC
    const bmi = parseFloat(weight) / (heightMeters * heightMeters);
    // Redondea el resultado a dos decimales
    setResult(bmi.toFixed(2));
  };

  return (
    <div className="calculator">
      <h2>Calculadora de IMC</h2>
      <div className="bmi-calculator">
        <div className="input-container">
          <label htmlFor="height">Altura (cm):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="weight">Peso (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button className="calculate-button" onClick={calculateBMI}>
          Calcular IMC
        </button>
        {result && (
          <div className="result-container">
            <p>Tu IMC es: {result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IMCCalculator;
