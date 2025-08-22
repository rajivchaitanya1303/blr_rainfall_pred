import joblib
import numpy as np

# Load model
model = joblib.load('models/rainfall_model.pkl')

def predict_monthly_rainfall(year, el_nino, la_nina):
    input_features = np.array([[year, int(el_nino), int(la_nina)]])
    prediction = model.predict(input_features)[0]

    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    forecast = {month: round(value, 2) for month, value in zip(months, prediction)}

    return forecast