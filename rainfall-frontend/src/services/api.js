export const getRainfallPrediction = async (data) => {
  try {
    const response = await fetch("https://blr-rainfall-pred.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Directly return predictions
    return { data: result };
  } catch (error) {
    console.error("Error fetching rainfall prediction:", error);
    return { data: { predictions: null } };
  }
};
