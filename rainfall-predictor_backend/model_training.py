import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.model_selection import train_test_split

# Load the rainfall data
data = pd.read_csv('data/rainfall_data.csv')

# Feature engineering
data['El NiNo (Y/N)'] = data['El NiNo (Y/N)'].map({'Y': 1, 'N': 0})
data['La Nina (Y/N)'] = data['La Nina (Y/N)'].map({'Y': 1, 'N': 0})

# Drop unwanted columns
data = data.drop(columns=['_id', 'Total'])

# Inputs (X) and targets (y)
X = data[['Year', 'El NiNo (Y/N)', 'La Nina (Y/N)']]
y = data[['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build model
model = MultiOutputRegressor(RandomForestRegressor(n_estimators=200, random_state=42))
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'models/rainfall_model.pkl')
print("✅ Model trained and saved!")