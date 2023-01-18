const jwt = require("jsonwebtoken");

const config = require("./config");

const makeJWT = (payload) => {
  const token = jwt.sign(
    {
      ...payload,
      
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    config.jwtSecretKey
  );

  return token;
};

const verifyJWT = ({ token }) => {
  console.log("token ", token);
  return jwt.verify(token, config.jwtSecretKey);
};

module.exports = {
  makeJWT,
  verifyJWT,
};