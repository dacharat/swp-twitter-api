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

module.exports = {
  status_filter
};
