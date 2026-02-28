let currentIndex = 0;

function roundRobin(servers) {
  if (!servers || servers.length === 0) {
    throw new Error("No available servers");
  }

  const server = servers[currentIndex];

  currentIndex = (currentIndex + 1) % servers.length;

  return server;
}

module.exports = roundRobin;