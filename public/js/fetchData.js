const fetchZekerData = () => {
  return fetch("http://localhost:3000/zeker")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

const updateZekerCounter = (id, increment = true) => {
  return fetch(`http://localhost:3000/zeker/${id}/counter`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ increment }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update counter");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      return { count: 0 };
    });
};
