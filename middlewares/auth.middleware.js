const { verifyJWT } = require("../utils");

const checkForUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).send({
      message: "Unauthorized: user id not found",
    });
  }

  const authSplits = authHeader.split(" ");
  if (authSplits.length != 2) {
    return res.status(403).send({
      message: "Unauthorized: user id is in invalid format",
    });
  }

  const token = authSplits[1];
  try {
    const jwtPayload = verifyJWT({ token });
    const userId = jwtPayload.user;
    res.locals.user = userId;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkForUser,
};
