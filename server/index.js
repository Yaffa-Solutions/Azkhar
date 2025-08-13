
const app = require("./app");

// app.listen(app.get("port"), () => {
//   console.log(`App is live on http://localhost:${app.get("port")}`);
// });
if (require.main === module) {
  const PORT = app.get("port");
  app.listen(PORT, () => {
    console.log(`App is live on http://localhost:${PORT}`);
  });
}
