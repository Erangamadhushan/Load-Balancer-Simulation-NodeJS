function leastConnections(servers, metrics) {
  if (!servers || servers.length === 0) {
    throw new Error("No available servers");
  }

  let selectedServer = servers[0];
  let minConnections = metrics[selectedServer].activeConnections;

  for (const server of servers) {
    const connections = metrics[server].activeConnections;

    if (connections < minConnections) {
      minConnections = connections;
      selectedServer = server;
    }
  }

  return selectedServer;
}

module.exports = leastConnections;