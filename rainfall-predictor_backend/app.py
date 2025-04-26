from flask import Flask, request, jsonify
from monthly_pipeline import predict_monthly_rainfall
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS so frontend can access this API

@app.route('/')
def home():
    return "🌦️ Rainfall Predictor API is running."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        year = int(data['year'])
        el_nino = bool(data['el_nino'])
        la_nina = bool(data['la_nina'])

        predictions = predict_monthly_rainfall(year, el_nino, la_nina)
        return jsonify({'success': True, 'predictions': predictions})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)