const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const delay = Math.floor(Math.random() * 50000);

  setTimeout(() => {
    res.json({
      message: "Response from Server 2",
    server: "Server 2",
    timestamp: new Date()
    });
  }, delay);
});

app.listen(3000, () => {
  console.log("Server 2 running on port 3002");
});