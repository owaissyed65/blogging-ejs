const express = require("express");
const path = require("path");
const userRouter = require("./router/userRouter");
const blogRouter = require("./router/blogRouter");
const commentRouter = require("./router/commentRouter");
const connectToMongo = require("./connection/connectToMongo");
const { checkIfUserHasToken } = require("./middleware/userAuthentication");
const cookieParser = require("cookie-parser");
const Blog = require("./models/Blog");
const dotenv = require('dotenv')
const app = express();
dotenv.config({})
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

connectToMongo(process.env.MONGO_URI);


app.use(express.static(path.resolve('./public')))
app.use(cookieParser());
app.use(checkIfUserHasToken("token"));

app.get("/", async(req, res) => {
  const blogs =await Blog.find()
  res.render("home", {
    user: req.user,
    blogs
  });
});
app.use("/", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

app.listen(PORT, () => {
  console.log(`Server is ruuning on http://localhost:${PORT}`);
});
