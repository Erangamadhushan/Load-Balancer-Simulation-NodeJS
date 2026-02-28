const { roundRobin } = require("./algorithms");

const servers = ["S1", "S2", "S3"];

for (let i = 0; i < 10; i++) {
  console.log(roundRobin(servers));
}