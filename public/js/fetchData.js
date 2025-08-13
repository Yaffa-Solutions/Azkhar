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
const fetchArticlesData = () => {
  return fetch("http://localhost:3000/articles")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .catch(err => {
      console.error("Error fetching articles:", err);
      return [];
    });
};

const fetchArticleById = (id) => {
  return fetch(`http://localhost:3000/articles/${id}`)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      return null;
    });
};
