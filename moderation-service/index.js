const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  console.log("Received event at moderation-service", req.body);
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http:/events-bus-srv:4005/events", {
      type: "CommentModerated",
      data: { ...data, status },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation Service. Listening on port 4003");
});
