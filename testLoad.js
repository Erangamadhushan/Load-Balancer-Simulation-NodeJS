const axios = require("axios");

for (let i = 0; i < 20; i++) {
  axios.get("http://localhost:3000")
    .then(res => {
      console.log(res.data.loadBalancedTo);
    })
    .catch(err => console.error(err.message));
}