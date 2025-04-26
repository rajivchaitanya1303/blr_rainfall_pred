import React, { useState } from 'react';
import PredictionResult from './PredictionResult';
import { getRainfallPrediction } from '../services/api';
import './PredictionForm.css';

const PredictionForm = () => {
  const [year, setYear] = useState('');
  const [elNino, setElNino] = useState(false);
  const [laNina, setLaNina] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPredictions(null);

    try {
      const data = {
        year: year,
        el_nino: elNino,
        la_nina: laNina,
      };

      console.log('Sending data to API:', data);

      const response = await getRainfallPrediction(data);

      if (response.data && response.data.success) {
        setPredictions(response.data.predictions);
      } else {
        setError('Prediction failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            min="1900"
            max="2100"
            autoFocus
          />
        </div>

        {/* Toggle Switches for El Niño and La Niña */}
        <div className="toggle-group">
          <div className="toggle-label">
            <label htmlFor="el-nino">El Niño:</label>
            <label className="switch">
              <input
                type="checkbox"
                id="el-nino"
                checked={elNino}
                onChange={(e) => setElNino(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="toggle-label">
            <label htmlFor="la-nina">La Niña:</label>
            <label className="switch">
              <input
                type="checkbox"
                id="la-nina"
                checked={laNina}
                onChange={(e) => setLaNina(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Rainfall'}
        </button>
      </form>

      {error && (
        <p className="error-message" aria-live="polite">
          {error}
        </p>
      )}

      {predictions ? (
        <PredictionResult predictions={predictions} />
      ) : (
        !loading && !error && (
          <p className="info-message" aria-live="polite">
            Enter details to see prediction.
          </p>
        )
      )}
    </div>
  );
};

export default PredictionForm;
