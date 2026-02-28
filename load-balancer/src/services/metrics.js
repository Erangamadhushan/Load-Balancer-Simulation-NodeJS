const metrics = {};

function initializeMetrics(servers) {
  servers.forEach((server) => {
    metrics[server.url] = {
      totalRequests: 0,
      failedRequests: 0,
      totalResponseTime: 0,
      activeConnections: 0,
    };
  });
}

function recordSuccess(serverUrl, responseTime) {
  const server = metrics[serverUrl];
  server.totalRequests++;
  server.totalResponseTime += responseTime;
}

function recordFailure(serverUrl) {
  const server = metrics[serverUrl];
  server.failedRequests++;
}

function incrementConnections(serverUrl) {
  metrics[serverUrl].activeConnections++;
}

function decrementConnections(serverUrl) {
  metrics[serverUrl].activeConnections--;
}

function getMetrics() {
  const report = {};

  for (const [url, data] of Object.entries(metrics)) {
    report[url] = {
      totalRequests: data.totalRequests,
      failedRequests: data.failedRequests,
      activeConnections: data.activeConnections,
      avgResponseTime:
        data.totalRequests === 0
          ? 0
          : (data.totalResponseTime / data.totalRequests).toFixed(2),
    };
  }

  return report;
}

function getRawMetrics() {
  return metrics;
}

module.exports = {
  initializeMetrics,
  recordSuccess,
  recordFailure,
  incrementConnections,
  decrementConnections,
  getMetrics,
  getRawMetrics,
};
