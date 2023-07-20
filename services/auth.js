const jwt = require("jsonwebtoken");
const secret = "$SEC_RET_KEY_LAPTOP_SHAHBAZ_MANHUS$";
const generateUserToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
};
const verifyToken = (token) => {
  const user = jwt.verify(token, secret);
  return user;
};
module.exports = { generateUserToken, verifyToken };
