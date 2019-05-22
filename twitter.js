const Twit = require("twit");
const moment = require("moment");
const db = require("./database");

var T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET_KEY
  // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  // strictSSL: true // optional - requires SSL certificates to be valid.
});

/**
 * Filter twiiter track, count number of tweet with the interesting track in each time
 * 
 * @param {String} track => name of the interesting track
 */
const status_filter = track => {
  try {
    var stream = T.stream("statuses/filter", { track: track });
    stream.on("tweet", async function(tweet) {
      await addFilterCount();
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * Add number of track that tweeted to json database
 */
const addFilterCount = async () => {
  const currentDB = await db.read();
  const currenttime = moment()
    .startOf("minute")
    .toISOString();
  const time = currentDB[currenttime] || 0;
  const output = await db.write(currenttime, time + 1);
  return output;
};

// const sample = () => {
//   var stream = T.stream("statuses/sample");
//   stream.on("tweet", function(tweet) {
//     console.log(tweet);
//   });
// }

const location_trend = localtion_id => {
   T.get("trends/place", { id: localtion_id }, (err, data, response) => {
    console.log(JSON.stringify(data, undefined, 2));
   });
   
} 

module.exports = {
  status_filter,
  location_trend
};
