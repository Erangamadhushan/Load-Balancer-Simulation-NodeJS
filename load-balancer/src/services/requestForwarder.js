const axios = require("axios");

async function forwardRequest(targetServer, path = "/") {
  const start = Date.now();

  try {
    const response = await axios.get(`${targetServer}${path}`);

    const responseTime = Date.now() - start;

    return {
      data: response.data,
      status: response.status,
      responseTime
    };
  } catch (error) {
    throw new Error(`Failed to reach ${targetServer}`);
  }
}

module.exports = forwardRequest;