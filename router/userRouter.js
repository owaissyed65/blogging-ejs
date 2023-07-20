const User = require("../models/User");

const express = require("express").Router;
const router = express();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/user/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName && !email && !password) {
    return res.send("Please Add All values");
  }
  const user = await User.findOne({ email });
  if (user) return res.send("User Exist already");
  const newData = await User.create({
    email,
    password,
    fullName,
  });
  res.redirect("/login");
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.send("Please Add All values");
  }
  try {
    const token = await User.checkAuthentication(email, password);  
    if (!token) return res.send("Wrong Credentials");
    return res.cookie('token',token).redirect("/");
  } catch (error) {
    console.error(error)
    res.render('login',{
      error:'Incorrect Email Or password'
    })
  }
});
router.get('/user/logout',(req,res)=>{
  return res.clearCookie('token').redirect('/login')
})
module.exports = router;
