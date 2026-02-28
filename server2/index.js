const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Response from Server 2",
    server: "Server 2",
    timestamp: new Date()
  });
});

app.listen(3002, () => {
  console.log("Server 2 running on port 3002");
});