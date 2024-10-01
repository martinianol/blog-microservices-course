const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsByPostId[id] || [];
  const status = "pending";
  const newComment = { id: commentId, content, status };

  comments.push(newComment);

  commentsByPostId[id] = comments;

  // SEND EVENT
  await axios.post("http://events-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { ...newComment, postId: id },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http:///events-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: { id, status, content: comment.content, postId },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comments Service. Listening on port 4001");
});
