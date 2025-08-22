import React from 'react';
import './PredictionResult.css';

const PredictionResult = ({ predictions }) => {
  if (!predictions) {
    return <p className="info-message">No predictions available.</p>;
  }

  const monthsOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const hasValidData = monthsOrder.some(month => predictions[month] !== undefined);
  if (!hasValidData) {
    return <p className="info-message">No valid prediction data found.</p>;
  }

  return (
    <div className="result-container">
      <h2>🌦️ Predicted Rainfall (mm)</h2>
      <ul className="result-list">
        {monthsOrder.map((month) => (
          predictions[month] !== undefined ? (
            <li
              key={month}
              className={`rainfall-item ${getRainfallClass(predictions[month])}`}
            >
              <span className="month-name">{month}:</span>
              <span className="rainfall-value">
                {getRainfallEmoji(predictions[month])} {predictions[month].toFixed(2)} mm
              </span>
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
};

const getRainfallClass = (rainfall) => {
  if (rainfall < 50) return 'low-rainfall';
  if (rainfall < 150) return 'medium-rainfall';
  return 'high-rainfall';
};

const getRainfallEmoji = (rainfall) => {
  if (rainfall < 50) return '☀️';
  if (rainfall < 150) return '🌧️';
  return '⛈️';
};

export default PredictionResult;
