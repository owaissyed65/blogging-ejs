const express = require("express");
const path = require("path");
const userRouter = require("./router/userRouter");
const blogRouter = require("./router/blogRouter");
const connectToMongo = require("./connection/connectToMongo");
const { checkIfUserHasToken } = require("./middleware/userAuthentication");
const cookieParser = require("cookie-parser");
const Blog = require("./models/Blog");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

connectToMongo();


app.use(express.static(path.resolve('./public')))
app.use(cookieParser());
app.use(checkIfUserHasToken("token"));

app.get("/", async(req, res) => {
  const blogs =await Blog.find()
  console.log(blogs)
  res.render("home", {
    user: req.user,
    blogs
  });
});
app.use("/", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is ruuning on http://localhost:${PORT}`);
});
