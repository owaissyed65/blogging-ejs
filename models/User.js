const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { generateUserToken } = require("../services/auth");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return new Error("Error");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(user.password, salt);
  this.password = hashPassword;
  next();
});
userSchema.static("checkAuthentication", async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User Not exist");
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error("Wrong Credentials");
  const token = generateUserToken(user);
  return token;
});
const User = mongoose.model("user", userSchema);
module.exports = User;
