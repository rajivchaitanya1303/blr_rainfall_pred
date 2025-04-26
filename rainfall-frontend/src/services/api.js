// src/services/api.js

export const getRainfallPrediction = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      // Ensure the response has the expected structure
      if (result.success) {
        return { data: result };  // If successful, return the response with predictions
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error fetching rainfall prediction:", error);
      return { data: { predictions: null } };  // Ensure predictions is null if error occurs
    }
  };
  