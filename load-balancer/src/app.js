const express = require("express");
const servers = require("./config/servers");
const { roundRobin, leastConnections } = require("./algorithms");
const forwardRequest = require("./services/requestForwarder");
const startHealthCheck = require("./services/healthCheck");
const metricsService = require("./services/metrics");

startHealthCheck(servers);
metricsService.initializeMetrics(servers);

const app = express();

app.get("/", async (req, res) => {
  try {
    const healthyServers = servers
      .filter((server) => server.isHealthy)
      .map((server) => server.url);

    if (healthyServers.length === 0) {
      return res.status(503).json({ error: "No healthy servers available" });
    }

    const rawMetrics = metricsService.getRawMetrics();

    const selectedServer = leastConnections(healthyServers, rawMetrics);

    metricsService.incrementConnections(selectedServer);

    const result = await forwardRequest(selectedServer);

    metricsService.recordSuccess(selectedServer, result.responseTime);
    metricsService.decrementConnections(selectedServer);

    res.json({
      loadBalancedTo: selectedServer,
      responseTime: result.responseTime,
      backendData: result.data,
    });
  } catch (error) {
    metricsService.recordFailure(selectedServer);
    metricsService.decrementConnections(selectedServer);

    res.status(500).json({ error: error.message });
  }
});

app.get("/metrics", (req, res) => {
  res.json(metricsService.getMetrics());
});

module.exports = app;
