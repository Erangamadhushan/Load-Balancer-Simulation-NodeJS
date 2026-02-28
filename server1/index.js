const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Response from Server 1",
    server: "Server 1",
    timestamp: new Date()
  });
});

app.listen(3001, () => {
  console.log("Server 1 running on port 3001");
});