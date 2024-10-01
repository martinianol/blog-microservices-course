const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Event BUS", event.type);
  events.push(event);

  await axios
    .post("http://posts-clusterip-srv:4000/events", event)
    .catch((err) => console.log(err.message));
  await axios
    .post("http://comments-srv:4001/events", event)
    .catch((err) => console.log(err.message));
  await axios
    .post("http://query-srv:4002/events", event)
    .catch((err) => console.log(err.message));
  await axios
    .post("http://moderation-srv:4003/events", event)
    .catch((err) => console.log(err.message));

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Event Bus. Listening on port 4005");
});
