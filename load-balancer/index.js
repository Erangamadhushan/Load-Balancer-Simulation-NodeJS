const express = require("express");
const axios = require("axios");

const app = express();

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003"
];

let current = 0;

app.get("/", async (req, res) => {
  const target = servers[current];

  // Move to the next server for the next request
  current = (current + 1) % servers.length; 

  try {
    const response = await axios.get(target);
    res.json({
      loadBalancedTo: target,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Load Balancer running on port 3000");
});