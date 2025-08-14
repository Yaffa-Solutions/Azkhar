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
    .then(async (data) => {
      try {
        const tasks = await fetchTasks();
        const tasksForZeker = tasks.filter((task) => task.zekher_id === id);

        for (const task of tasksForZeker) {
          if (data.counter >= task.target_count && !task.is_done) {
            await updateTask(task.id, { ...task, is_done: true });
            console.log(`Task "${task.title}" marked as completed!`);
          }
        }
      } catch (error) {
        console.error("Error checking/updating tasks:", error);
      }

      return data;
    })
    .catch((err) => {
      console.error(err);
      return { count: 0 };
    });
};

const updateZekerFav = (id, isFav) => {
  return fetch(`http://localhost:3000/zeker/${id}/fav`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_fav: isFav }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update favorite");
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

const fetchTasks = () => {
  return fetch("http://localhost:3000/tasks")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Tasks fetched successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      throw error;
    });
};

const fetchTaskById = (id) => {
  return fetch(`http://localhost:3000/tasks/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Task fetched successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching task:", error);
      throw error;
    });
};

const createTask = (taskData) => {
  return fetch(`http://localhost:3000/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to create task");
      return res.json();
    })
    .then((data) => {
      console.log("Task created:", data);
      return data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

const updateTask = (id, taskData) => {
  return fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    })
    .then((data) => {
      console.log("Task updated:", data);
      return data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

const deleteTask = (id) => {
  return fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete task");
      return res.json();
    })
    .then((data) => {
      console.log("Task deleted:", data);
      return data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};
