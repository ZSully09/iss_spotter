const request = require("request-promise-native");

// Step 1: fetch IP address
const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

// module.exports = { fetchMyIP };

//Step 2: fetch coordinates by IP

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

// module.exports = { fetchMyIP, fetchCoordsByIP }

// Step 3: fetch Flyover times
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

// Step 4: fetch next ISS Times for our returned location (instead of exporting all three functions, only export this function which chains these function calls and returns the final result)
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
