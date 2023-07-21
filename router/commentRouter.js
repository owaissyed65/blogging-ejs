const Comment = require("../models/Comment");

const express = require("express").Router;
const router = express();

router.post("/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { comment: userComment } = req.body;
  if (!id && !userComment) return res.send("Not any Comment");
  await Comment.create({
    comment: userComment,
    blogRef: id,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.id}`);
});

module.exports = router;
