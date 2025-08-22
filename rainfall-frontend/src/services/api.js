export const getRainfallPrediction = async (data) => {
  try {
    const response = await fetch("https://blr-rainfall-pred.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      return { data: result };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("Error fetching rainfall prediction:", error);
    return { data: { predictions: null } };
  }
};
