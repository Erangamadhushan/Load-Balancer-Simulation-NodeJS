const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const delay = Math.floor(Math.random() * 500);

  setTimeout(() => {
    res.json({
      message: "Response from Server 1",
    server: "Server 1",
    timestamp: new Date()
    });
  }, delay);
});

app.listen(3000, () => {
  console.log("Server 1 running on port 3001");
});