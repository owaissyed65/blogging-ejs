const multer = require("multer");
const express = require("express").Router;
const router = express();
const path = require("path");
const Blog = require("../models/Blog");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./public/upload"));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

router.get("/addblog", (req, res) => {
  res.render("addblog", {
    user: req.user,
  });
});
router.post("/addblog", upload.single("blogImage"), async (req, res) => {
  const { title, body } = req.body;
  console.log(req.file);
  if (!title && !body) return res.send("Please Upload All fields");
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    blogImage: `upload/${req.file.filename}`,
  });
  res.redirect(`/blog/${blog._id}`);
});
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy")
  console.log(blog)
  res.render('blog',{
    user:req.user,
    blog
  })
  
});

module.exports = router;
