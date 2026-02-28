const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Response from Server 3",
    server: "Server 3",
    timestamp: new Date()
  });
});

app.listen(3003, () => {
  console.log("Server 3 running on port 3003");
});