const express = require("express");
require("dotenv").config();
const db = require("./database");
const { status_filter, location_trend } = require("./twitter");
const cors = require("cors");

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:7777"]
  })
);

app.get("/", (req, res) => {
  res.send("SWP practice API");
});

app.get("/track-filter", async (req, res) => {
  const jsonDb = await db.read();
  res.send(jsonDb);
});

// status_filter("5ปีคสช");
// location_trend(1)
// 23424960 = woeid of thailand
location_trend(23424960);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
