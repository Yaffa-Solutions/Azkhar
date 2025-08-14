const showZekerNotification = (zeker) => {
  if (document.visibilityState === "visible") {
    const notification = new Notification(zeker.title || "Zeker Reminder", {
      body: zeker.description,
      requireInteraction: true,
    });
    console.log(zeker);

    setTimeout(() => {
      notification.close();
    }, 30000);
  }
};

const fetchRandomZeker = () => {
  fetch("http://localhost:3000/random-zeker")
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.zeker) {
        showZekerNotification(data.zeker);
      }
    })
    .catch((error) => console.error("Error fetching Zeker:", error));
};

const startZekerNotifications = () => {
  fetchRandomZeker();
  setInterval(fetchRandomZeker, 5 * 60 * 5000);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      fetchRandomZeker();
    }
  });
};

if ("Notification" in window) {
  if (
    Notification.permission !== "granted" &&
    Notification.permission !== "denied"
  ) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
        startZekerNotifications();
      }
    });
  } else if (Notification.permission === "granted") {
    startZekerNotifications();
  }
}
