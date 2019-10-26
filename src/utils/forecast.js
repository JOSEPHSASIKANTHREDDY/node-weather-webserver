const request = require("request");
const forecast = (lat, long, callback) => {
  // var msg = 0;
  const url =
    "https://api.darksky.net/forecast/4ef4a8df1658a26265138f897d156356/" +
    lat +
    "," +
    long;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach the Service", undefined);
    } else if (body.code) {
      callback(body.error, undefined);
    } else {
      console.log(body.daily.data[0]);

      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        chanceofrain: body.currently.precipProbability,
        temperatureMax: body.daily.data[0].temperatureMax,
        temperatureMin: body.daily.data[0].temperatureMin
      });
    }
  });
};

module.exports = { forecast };
