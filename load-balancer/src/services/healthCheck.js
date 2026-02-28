const axios = require("axios");

function startHealthCheck(servers) {
  setInterval(async () => {
    for (const server of servers) {
      try {
        await axios.get(server.url);
        server.isHealthy = true;
      } catch (error) {
        server.isHealthy = false;
      }
    }

    console.log("Health Check Update:");
    servers.forEach(s =>
      console.log(`${s.url} → ${s.isHealthy ? "Healthy" : "Unhealthy"}`)
    );

  }, 5000); // every 5 seconds
}

module.exports = startHealthCheck;