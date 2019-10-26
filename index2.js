const { nextISSTimesForMyLocation } = require("./iss_promised");
/*
// Step 1: Fetch IP Address
fetchMyIP()
  // Steph 2: Fetch Coordinates by IP Address
  .then(fetchCoordsByIP)
  // Step 3: Fetch Coordinates
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));
*/

// Step 4: Update require to only require our final function and call it
nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch(error => {
    console.log("It didn't work: ", error.message);
  });

// Step 5: Pass printPassTimes as callback (as defined in index.js)
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(
      `Next pass at ${datetime.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles"
      })} for ${duration} seconds!`
    );
  }
};
