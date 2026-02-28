const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Load Balancer running on port ${PORT}`);
});