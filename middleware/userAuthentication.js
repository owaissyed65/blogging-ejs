const { verifyToken } = require("../services/auth");

function checkIfUserHasToken(cookieName) {
  return (req, res, next) => {
    req.user = null
    const cookieValue = req.cookies[cookieName]
    if(!cookieValue) return next()
    const user = verifyToken(cookieValue)
    req.user = user
    next()
  };
}
module.exports = { checkIfUserHasToken };
